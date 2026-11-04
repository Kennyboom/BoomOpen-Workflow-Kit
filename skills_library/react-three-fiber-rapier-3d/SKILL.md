---
name: react-three-fiber-rapier-3d
description: "React Three Fiber (R3F), @react-three/drei, @react-three/rapier physics, useFrame zero-allocation mutation rules, GLTF instancing, and KTX2/Draco asset optimization."
domain: gaming
version: "5.5.0"
---

# React Three Fiber (R3F), Drei & Rapier 3D Physics Architecture

> **PURPOSE**: Build 60–120 FPS interactive 3D web games and spatial experiences using `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier` WASM physics, and transient Zustand state subscriptions without triggering React re-renders on every frame.

---

## 1. Core Architectural Principles

1. **NEVER Call `setState` Inside `useFrame`**:
   - React component state (`useState`) is strictly for discrete UI/mount lifecycle events.
   - Inside `useFrame((state, delta) => ...)`, mutate Three.js `Object3D` refs (`meshRef.current.position.x += ...`) or Rapier `RigidBody` refs (`bodyRef.current.setLinvel(...)`) directly.
2. **Scratch Vector Reuse (Zero GC in `useFrame`)**:
   - Allocate reusable `const _tempVec = new THREE.Vector3()` and `const _tempQuat = new THREE.Quaternion()` at module scope outside the component; never call `new THREE.Vector3()` inside `useFrame`.
3. **Fixed-Timestep Rapier Physics**:
   - Wrap interactive entities in `<Physics timeStep={1 / 60}>` and use kinematic velocity/impulse APIs (`applyImpulse`, `setNextKinematicTranslation`, `setLinvel`) rather than mutating `mesh.position` directly on physics-controlled bodies.
4. **Draw-Call Budgeting (`< 100 Draw Calls`)**:
   - Use `<Instances>` / `<Instance>` from `@react-three/drei` for repeated geometry, compress meshes with Draco/Meshopt, and encode textures in KTX2 Basis Universal format.

---

## 2. Production Code Patterns

### Pattern A — Zero-Allocation `useFrame` Character Controller with `@react-three/rapier`

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { CapsuleCollider, RigidBody, type RapierRigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _wishVel = new THREE.Vector3();
const _camTarget = new THREE.Vector3();

export type ControlAction = 'forward' | 'backward' | 'left' | 'right' | 'jump';

export function PhysicsPlayerController({ moveSpeed = 7.5 }: { moveSpeed?: number }) {
  const bodyRef = useRef<RapierRigidBody>(null);
  const [, getKeys] = useKeyboardControls<ControlAction>();

  useFrame((state, delta) => {
    const body = bodyRef.current;
    if (!body) return;

    const { forward, backward, left, right, jump } = getKeys();
    const currentVel = body.linvel();

    state.camera.getWorldDirection(_forward);
    _forward.y = 0;
    _forward.normalize();
    _right.crossVectors(_forward, state.camera.up).normalize();

    const moveZ = (forward ? 1 : 0) - (backward ? 1 : 0);
    const moveX = (right ? 1 : 0) - (left ? 1 : 0);

    _wishVel
      .set(0, 0, 0)
      .addScaledVector(_forward, moveZ)
      .addScaledVector(_right, moveX);

    if (_wishVel.lengthSq() > 0) {
      _wishVel.normalize().multiplyScalar(moveSpeed);
    }

    const nextY = jump && Math.abs(currentVel.y) < 0.05 ? 6.5 : currentVel.y;
    body.setLinvel({ x: _wishVel.x, y: nextY, z: _wishVel.z }, true);

    const pos = body.translation();
    _camTarget.set(pos.x, pos.y + 4.5, pos.z + 8.0);
    state.camera.position.lerp(_camTarget, 1 - Math.exp(-10 * delta));
    state.camera.lookAt(pos.x, pos.y + 1.0, pos.z);
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders={false}
      mass={1}
      type="dynamic"
      enabledRotations={[false, false, false]}
      position={[0, 2, 0]}
    >
      <CapsuleCollider args={[0.5, 0.4]} />
      <mesh castShadow>
        <capsuleGeometry args={[0.4, 1.0, 8, 16]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.3} metalness={0.2} />
      </mesh>
    </RigidBody>
  );
}
```

### Pattern B — GPU-Instanced Obstacles with `<InstancedRigidBodies>`

```tsx
import { useMemo } from 'react';
import { InstancedRigidBodies, type InstancedRigidBodyProps } from '@react-three/rapier';

export function InstancedCrateField({ count = 200 }: { count?: number }) {
  const instances = useMemo<InstancedRigidBodyProps[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      key: `crate_${i}`,
      position: [(i % 10) * 2.2 - 10, 4 + Math.floor(i / 10) * 1.5, -Math.floor(i / 20) * 2.2],
      rotation: [0, (i * 0.3) % Math.PI, 0],
    }));
  }, [count]);

  return (
    <InstancedRigidBodies instances={instances} colliders="cuboid" mass={0.8}>
      <instancedMesh args={[undefined, undefined, count]} count={count} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.6} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Calling `useState` Setter Inside `useFrame`**: Triggers 60 React reconciliation passes per second and destroys frame pacing.
- **❌ Using `colliders="trimesh"` on Dynamic RigidBodies**: Trimesh colliders are expensive and prone to tunneling on moving objects; use compound primitives (`cuboid`, `ball`, `capsule`) or `hull`.
- **❌ Creating Un-disposed Geometries/Materials Dynamically**: Let R3F manage declarative JSX resources or call `.dispose()` in `useEffect` cleanup.

---

## 4. Verification Checklist

- [ ] Zero `useState` updates or `new THREE.Vector3()` allocations occur inside `useFrame`.
- [ ] All dynamic `RigidBody` actors use primitive or convex hull colliders (`capsule`, `cuboid`, `ball`, `hull`).
- [ ] Repeated meshes (`> 20` copies) use `<Instances>` or `<InstancedRigidBodies>`.
- [ ] Frame delta is clamped or damped (`1 - Math.exp(-lambda * delta)`) for refresh-rate independence (`60Hz`–`240Hz`).
