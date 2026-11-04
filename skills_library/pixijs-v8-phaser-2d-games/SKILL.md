---
name: pixijs-v8-phaser-2d-games
description: "High-FPS 2D web games with PixiJS v8 (WebGL2/WebGPU renderer, ParticleContainer, sprite batching, texture atlases) and Phaser 3 scene/physics/tilemap architecture."
domain: gaming
version: "5.5.0"
---

# PixiJS v8 (WebGPU/WebGL2) & Phaser 3 High-FPS 2D Game Architecture

> **PURPOSE**: Build 120 FPS 2D web and mobile-web games using PixiJS v8's async WebGPU/WebGL2 renderer (`Application.init()`, `ParticleContainer`) and Phaser 3's modular Scene, Arcade/Matter Physics, and Sprite Pool architecture.

---

## 1. Core Architectural Principles

1. **PixiJS v8 Async Initialization & `ParticleContainer`**:
   - In PixiJS v8, always initialize via `const app = new Application(); await app.init({ preference: 'webgpu', ... })`.
   - Use v8 `ParticleContainer` with lightweight `Particle` objects (instead of heavy `Sprite` scene-graph nodes) when rendering `10,000–100,000+` bullets, particles, or swarm units at 120 FPS.
2. **Texture Atlas Packing (Single Draw Call)**:
   - Pack spritesheets into power-of-two Texture Atlases (`.json` + `.png`/`.ktx2`) so thousands of sprites batch into a single GPU draw call without texture unit switching.
3. **Phaser 3 Scene Separation & Group Object Pooling**:
   - Separate `BootScene` (preload atlases/audio), `GameScene` (simulation), and `HudScene` (parallel UI overlay launched via `this.scene.launch('HudScene')`).
   - Use `this.physics.add.group({ classType: Bullet, maxSize: 256, runChildUpdate: true })` with `getFirstDead(false)` and `setActive(false).setVisible(false)` instead of `destroy()`.

---

## 2. Production Code Patterns

### Pattern A — PixiJS v8 Async WebGPU App + High-Throughput `ParticleContainer`

```typescript
import { Application, Assets, Particle, ParticleContainer, Texture } from 'pixi.js';

export interface SwarmParticle {
  particle: Particle;
  vx: number;
  vy: number;
}

export async function mountPixiV8Swarm(hostElement: HTMLElement, count = 10000) {
  const app = new Application();
  await app.init({
    resizeTo: hostElement,
    preference: 'webgpu',
    backgroundColor: 0x090d16,
    antialias: false,
    resolution: Math.min(window.devicePixelRatio, 2),
    autoDensity: true,
  });
  hostElement.appendChild(app.canvas);

  const texture: Texture = await Assets.load('/assets/sprites/spark.png');
  const container = new ParticleContainer({
    dynamicProperties: {
      position: true,
      rotation: true,
      scale: false,
      color: false,
    },
  });
  app.stage.addChild(container);

  const swarm: SwarmParticle[] = new Array(count);
  const width = app.screen.width;
  const height = app.screen.height;

  for (let i = 0; i < count; i++) {
    const p = new Particle({
      texture,
      x: Math.random() * width,
      y: Math.random() * height,
      anchorX: 0.5,
      anchorY: 0.5,
    });
    container.addParticle(p);
    swarm[i] = {
      particle: p,
      vx: (Math.random() - 0.5) * 240,
      vy: (Math.random() - 0.5) * 240,
    };
  }

  app.ticker.add((ticker) => {
    const dt = ticker.deltaTime / 60;
    const w = app.screen.width;
    const h = app.screen.height;

    for (let i = 0; i < count; i++) {
      const item = swarm[i];
      const p = item.particle;
      p.x = (p.x + item.vx * dt + w) % w;
      p.y = (p.y + item.vy * dt + h) % h;
      p.rotation += 2.5 * dt;
    }
  });

  return () => app.destroy(true, { children: true });
}
```

### Pattern B — Phaser 3 Pooled Arcade Physics Projectile System

```typescript
import Phaser from 'phaser';

export class PooledProjectile extends Phaser.Physics.Arcade.Sprite {
  private lifespanMs = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'gameplay_atlas', 'projectile_bolt');
  }

  public fire(x: number, y: number, angleRad: number, speed = 650, ttlMs = 1500): void {
    this.enableBody(true, x, y, true, true);
    this.setRotation(angleRad);
    this.lifespanMs = ttlMs;
    this.scene.physics.velocityFromRotation(angleRad, speed, this.body!.velocity);
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.lifespanMs -= delta;
    if (this.lifespanMs <= 0) {
      this.disableBody(true, true);
    }
  }
}

export class CombatArenaScene extends Phaser.Scene {
  private projectiles!: Phaser.Physics.Arcade.Group;

  constructor() {
    super({ key: 'CombatArenaScene' });
  }

  create(): void {
    this.projectiles = this.physics.add.group({
      classType: PooledProjectile,
      maxSize: 200,
      runChildUpdate: true,
    });

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const bolt = this.projectiles.get(0, 0) as PooledProjectile | null;
      if (bolt) {
        const angle = Phaser.Math.Angle.Between(400, 300, pointer.worldX, pointer.worldY);
        bolt.fire(400, 300, angle);
      }
    });
  }
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Using Legacy PixiJS v7 Synchronous `new Application({ ... })`**: PixiJS v8 requires `await app.init({ ... })`.
- **❌ Calling `sprite.destroy()` for Projectiles/Enemies in Action Games**: Causes GC spikes and texture re-binding; use `disableBody(true, true)` / `enableBody(...)` pooling.
- **❌ Rebuilding `Graphics` Geometries Every Frame**: Cache static shapes as textures or reuse transform properties on existing `GraphicsContext` objects.

---

## 4. Verification Checklist

- [ ] PixiJS v8 apps initialize asynchronously via `await app.init(...)` and clean up via `app.destroy(true, { children: true })`.
- [ ] High-count effects (`> 1,000` sprites) use PixiJS v8 `ParticleContainer` with minimal `dynamicProperties`.
- [ ] Phaser 3 projectiles and enemies use pooled `Phaser.Physics.Arcade.Group` (`maxSize` configured, zero runtime `destroy()` calls).
