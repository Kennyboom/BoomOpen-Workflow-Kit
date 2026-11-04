---
name: multiplayer-netcode-colyseus
description: "Authoritative multiplayer server architecture (Colyseus / WebSockets / WebTransport), client-side prediction, server reconciliation, entity interpolation, and anti-cheat tick validation."
domain: gaming
version: "5.5.0"
---

# Authoritative Multiplayer Netcode, Prediction & Colyseus Architecture

> **PURPOSE**: Engineer cheat-resistant, low-latency multiplayer games using an authoritative fixed-tick server (Colyseus `@colyseus/core` / `@colyseus/schema`), client-side input prediction, server state reconciliation, and remote entity snapshot interpolation.

---

## 1. Core Architectural Principles

1. **Server Authority (Never Trust the Client)**:
   - Clients send **input commands** (`seq`, `moveX`, `moveY`, `actions`, `dt`) — never raw world positions or damage numbers.
   - The server validates movement speed bounds, fire-rate cooldowns, and line-of-sight before mutating authoritative state.
2. **Delta-Compressed Schema State (`@colyseus/schema`)**:
   - Keep `@type(...)` schema fields compact and flat (`int16` / `float32`) so binary delta patches stay `< 150 bytes/tick`.
3. **Client-Side Prediction & Server Reconciliation**:
   - The local player applies inputs immediately (`predictMovement(input)`) and pushes each input into a ring buffer (`pendingInputs` keyed by `seq`).
   - When the authoritative server snapshot arrives with `lastProcessedSeq`, discard acknowledged inputs (`seq <= lastProcessedSeq`) and replay remaining unacknowledged inputs from the server's authoritative position.
4. **Remote Entity Snapshot Interpolation**:
   - Render other players `100ms` (2–3 server ticks) in the past by interpolating between buffered server snapshots (`t0` and `t1`) for jitter-free motion.

---

## 2. Production Code Patterns

### Pattern A — Authoritative Colyseus Room with Fixed Simulation Tick & Rate Limiting

```typescript
import { Room, Client } from '@colyseus/core';
import { Schema, MapSchema, type } from '@colyseus/schema';

export interface PlayerInputMessage {
  seq: number;
  dx: number;
  dz: number;
  jump: boolean;
}

export class PlayerState extends Schema {
  @type('float32') x = 0;
  @type('float32') y = 0;
  @type('float32') z = 0;
  @type('uint32') lastProcessedSeq = 0;
}

export class ArenaState extends Schema {
  @type({ map: PlayerState }) players = new MapSchema<PlayerState>();
}

const TICK_RATE_HZ = 30;
const MAX_SPEED = 8.0;
const MAX_INPUT_QUEUE = 16;

export class ArenaRoom extends Room<ArenaState> {
  maxClients = 32;
  private inputQueues = new Map<string, PlayerInputMessage[]>();

  onCreate(): void {
    this.setState(new ArenaState());
    this.setPatchRate(1000 / TICK_RATE_HZ);

    this.onMessage('input', (client: Client, payload: PlayerInputMessage) => {
      if (!payload || typeof payload.seq !== 'number') return;
      const queue = this.inputQueues.get(client.sessionId);
      if (!queue || queue.length >= MAX_INPUT_QUEUE) return;
      queue.push({
        seq: payload.seq >>> 0,
        dx: Math.max(-1, Math.min(1, Number(payload.dx) || 0)),
        dz: Math.max(-1, Math.min(1, Number(payload.dz) || 0)),
        jump: Boolean(payload.jump),
      });
    });

    this.setSimulationInterval((deltaMs) => this.simulate(deltaMs / 1000), 1000 / TICK_RATE_HZ);
  }

  onJoin(client: Client): void {
    this.state.players.set(client.sessionId, new PlayerState());
    this.inputQueues.set(client.sessionId, []);
  }

  onLeave(client: Client): void {
    this.state.players.delete(client.sessionId);
    this.inputQueues.delete(client.sessionId);
  }

  private simulate(dt: number): void {
    for (const [sessionId, player] of this.state.players.entries()) {
      const queue = this.inputQueues.get(sessionId);
      if (!queue || queue.length === 0) continue;

      while (queue.length > 0) {
        const input = queue.shift()!;
        if (input.seq <= player.lastProcessedSeq) continue;

        const len = Math.hypot(input.dx, input.dz);
        const nx = len > 1 ? input.dx / len : input.dx;
        const nz = len > 1 ? input.dz / len : input.dz;

        player.x += nx * MAX_SPEED * dt;
        player.z += nz * MAX_SPEED * dt;
        player.lastProcessedSeq = input.seq;
      }
    }
  }
}
```

### Pattern B — Client-Side Prediction & Server Reconciliation Buffer

```typescript
export interface BufferedInput {
  seq: number;
  dx: number;
  dz: number;
  dt: number;
}

export class ClientPredictionReconciler {
  private seq = 0;
  private pending: BufferedInput[] = [];
  public predictedX = 0;
  public predictedZ = 0;

  constructor(private readonly maxSpeed = 8.0) {}

  public recordAndApplyInput(dx: number, dz: number, dt: number): BufferedInput {
    const input: BufferedInput = { seq: ++this.seq, dx, dz, dt };
    this.pending.push(input);
    this.integrate(input);
    return input;
  }

  public reconcileWithServer(authX: number, authZ: number, lastAckSeq: number): void {
    this.pending = this.pending.filter((inp) => inp.seq > lastAckSeq);
    this.predictedX = authX;
    this.predictedZ = authZ;
    for (const inp of this.pending) {
      this.integrate(inp);
    }
  }

  private integrate(inp: BufferedInput): void {
    const len = Math.hypot(inp.dx, inp.dz);
    const nx = len > 1 ? inp.dx / len : inp.dx;
    const nz = len > 1 ? inp.dz / len : inp.dz;
    this.predictedX += nx * this.maxSpeed * inp.dt;
    this.predictedZ += nz * this.maxSpeed * inp.dt;
  }
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Accepting Client-Reported Coordinates (`client.send("setPos", { x, y, z })`)**: Enables trivial teleport/speed hacks.
- **❌ Unbounded Input Queues on the Server**: Cap per-client queued inputs (`MAX_INPUT_QUEUE = 16`) to prevent speed-bursting packet floods.
- **❌ Shared Integration Math Divergence**: Keep deterministic movement integration identical between client prediction and server simulation.

---

## 4. Verification Checklist

- [ ] Server normalizes directional input vectors (`Math.hypot(dx, dz) <= 1.0`) to prevent diagonal speed exploits.
- [ ] Client reconciles predicted state against `lastProcessedSeq` without visual rubber-banding under `120ms` RTT + `2%` packet loss.
- [ ] Remote entities interpolate smoothly between buffered server snapshots (`renderTimestamp = now - interpolationDelayMs`).
