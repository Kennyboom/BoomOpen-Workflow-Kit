---
name: webgpu-wgsl-three-tsl
description: "WebGPU compute & render pipelines, WGSL shaders, storage buffers, and Three.js r170+ Three Shading Language (TSL) node materials & GPU-driven instanced rendering."
domain: gaming
version: "5.5.0"
---

# WebGPU, WGSL Compute Pipelines & Three.js TSL (r170+)

> **PURPOSE**: Build next-generation browser 3D graphics and GPU compute simulations using native WebGPU (`GPUDevice`, `GPUComputePipeline`, WGSL storage buffers) and Three.js `WebGPURenderer` with Three Shading Language (`three/tsl`) node materials.

---

## 1. Core Architectural Principles

1. **WebGPU-First with Automatic WebGL2 Fallback**:
   - Initialize `WebGPURenderer` from `three/webgpu` and await `await renderer.init()` before starting the animation loop; `WebGPURenderer` automatically falls back to WebGL2 when WebGPU is unavailable.
2. **GPU-Driven Simulation via Compute Shaders**:
   - Keep particle, boid, cloth, and fluid state inside GPU `storage` buffers (`instancedArray` in TSL or `GPUBufferUsage.STORAGE | GPUBufferUsage.VERTEX`) so 100,000+ instances update on the GPU with zero CPU-to-GPU array uploads per frame.
3. **Uniform Buffer Alignment (16-Byte `vec4` Rule)**:
   - In raw WGSL `struct` definitions bound to `uniform` or `storage` buffers, align `vec3<f32>` fields with a trailing `f32` scalar (`16 bytes` total) to prevent subtle memory stride corruption across Dawn/Metal/DX12/Vulkan backends.
4. **BindGroup & Pipeline Caching**:
   - Create `GPUBindGroupLayout`, `GPUComputePipeline`, and `GPURenderPipeline` once during initialization; never recreate pipelines or buffers inside the frame loop.

---

## 2. Production Code Patterns

### Pattern A — Three.js `WebGPURenderer` + TSL GPU Compute Particle System

```typescript
import * as THREE from 'three/webgpu';
import {
  Fn,
  If,
  instancedArray,
  instanceIndex,
  uniform,
  vec3,
  vec4,
  float,
  sin,
  time,
} from 'three/tsl';

export async function createGpuParticleSystem(canvas: HTMLCanvasElement, count = 65536) {
  const renderer = new THREE.WebGPURenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  await renderer.init();

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
  camera.position.set(0, 12, 35);

  const positions = instancedArray(count, 'vec3');
  const velocities = instancedArray(count, 'vec3');
  const deltaUniform = uniform(0.016);

  const computeInit = Fn(() => {
    const idx = instanceIndex;
    const seed = float(idx).mul(0.013);
    positions.element(idx).assign(vec3(sin(seed).mul(15.0), float(idx % 256).mul(0.08), sin(seed.mul(2.1)).mul(15.0)));
    velocities.element(idx).assign(vec3(0.0, 1.5, 0.0));
  })().compute(count);

  const computeUpdate = Fn(() => {
    const idx = instanceIndex;
    const pos = positions.element(idx).toVar();
    const vel = velocities.element(idx).toVar();

    vel.y.subAssign(deltaUniform.mul(4.9));
    pos.addAssign(vel.mul(deltaUniform));

    If(pos.y.lessThan(0.0), () => {
      pos.y.assign(0.0);
      vel.y.assign(vel.y.negate().mul(0.75));
    });

    positions.element(idx).assign(pos);
    velocities.element(idx).assign(vel);
  })().compute(count);

  await renderer.computeAsync(computeInit);

  const material = new THREE.SpriteNodeMaterial();
  material.positionNode = positions.toAttribute();
  material.colorNode = vec4(0.1, 0.85, sin(time.add(float(instanceIndex).mul(0.01))).mul(0.5).add(0.5), 1.0);
  material.scaleNode = float(0.18);

  const mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), material, count);
  scene.add(mesh);

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    deltaUniform.value = Math.min(clock.getDelta(), 0.05);
    renderer.compute(computeUpdate);
    renderer.render(scene, camera);
  });

  return { renderer, scene, camera };
}
```

### Pattern B — Raw WGSL Compute Shader with 16-Byte Aligned Structs

```wgsl
struct SimParams {
  delta_time : f32,
  damping    : f32,
  bounds     : f32,
  _pad0      : f32, // 16-byte struct alignment
};

struct Particle {
  position : vec3<f32>,
  mass     : f32, // Packs into 16 bytes alongside vec3<f32>
  velocity : vec3<f32>,
  lifetime : f32,
};

@group(0) @binding(0) var<uniform> params : SimParams;
@group(0) @binding(1) var<storage, read_write> particles : array<Particle>;

@compute @workgroup_size(64)
fn cs_main(@builtin(global_invocation_id) gid : vec3<u32>) {
  let index = gid.x;
  if (index >= arrayLength(&particles)) {
    return;
  }
  var p = particles[index];
  p.velocity = p.velocity * params.damping;
  p.position = p.position + p.velocity * params.delta_time;
  p.lifetime = max(0.0, p.lifetime - params.delta_time);
  particles[index] = p;
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Calling `renderer.render()` Before `await renderer.init()`**: WebGPU adapter/device acquisition is asynchronous.
- **❌ Reading Storage Buffers Back to CPU Every Frame (`mapAsync`)**: Keep simulation data on the GPU and bind the storage buffer directly as a vertex/instance attribute.
- **❌ Unaligned `vec3<f32>` Arrays in WGSL**: Always pair `vec3<f32>` with a scalar `f32` or use `vec4<f32>` so stride is `16 bytes`.

---

## 4. Verification Checklist

- [ ] `await renderer.init()` completes before the first compute or render call.
- [ ] All WGSL uniform and storage buffer structs adhere to 16-byte WGSL memory alignment rules.
- [ ] Compute workgroup dispatch bounds check `if (gid.x >= arrayLength(&buf)) { return; }` is present.
- [ ] Zero `GPUBuffer` or `ShaderMaterial` allocations occur inside the per-frame render loop.
