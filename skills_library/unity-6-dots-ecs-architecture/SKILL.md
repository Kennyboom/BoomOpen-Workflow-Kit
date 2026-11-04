---
name: unity-6-dots-ecs-architecture
description: "Unity 6 C# architecture, Assembly Definitions (.asmdef), ScriptableObject event channels, DOTS/Entities 1.3+ (ISystem, Burst, IJobEntity), object pooling, and 0-GC-allocation Update loops."
domain: gaming
version: "5.5.0"
---

# Unity 6 DOTS / ECS & Zero-Allocation C# Architecture

> **PURPOSE**: Production-grade Unity 6 LTS architecture combining modular Assembly Definitions (`.asmdef`), decoupled `ScriptableObject` event channels for hybrid UI/MonoBehaviour bridges, and high-throughput DOTS (`Unity.Entities` 1.3+, `BurstCompile`, `IJobEntity`) with strict zero-GC-allocation hot loops.

---

## 1. Core Architectural Principles

1. **Modular `.asmdef` Boundaries**:
   - Split every feature domain into `Core`, `Gameplay.ECS`, `Gameplay.Hybrid`, and `UI` Assembly Definitions.
   - Enforce unidirectional dependencies (`UI` → `Gameplay.Hybrid` → `Gameplay.ECS` → `Core`) to keep incremental compile times `< 2s`.
2. **Zero-GC Hot-Loop Mandate**:
   - Never allocate heap memory (`new class`, LINQ `.Where()/.Select()`, string concatenation, boxing, or lambda captures) inside `Update()`, `FixedUpdate()`, `LateUpdate()`, or `ISystem.OnUpdate()`.
   - Pre-allocate `NativeArray<T>`, `NativeList<T>`, or `UnityEngine.Pool.ObjectPool<T>` during initialization.
3. **Data-Oriented Separation (DOTS First for Simulation)**:
   - Keep `IComponentData` and `IBufferElementData` strictly `unmanaged` (`blittable` structs with `float3`, `quaternion`, `Entity` fields).
   - Use `[BurstCompile]` on all `ISystem` structs and `IJobEntity` implementations.
4. **Structural Change Batching**:
   - Never perform structural changes (`EntityManager.CreateEntity`, `AddComponent`, `DestroyEntity`) inside an active query loop; always record into `BeginSimulationEntityCommandBufferSystem.Singleton` or `EndSimulationEntityCommandBufferSystem.Singleton`.

---

## 2. Production Code Patterns

### Pattern A — Unmanaged Components, Baker & Burst `ISystem` + `IJobEntity`

```csharp
using Unity.Burst;
using Unity.Collections;
using Unity.Entities;
using Unity.Mathematics;
using Unity.Transforms;
using UnityEngine;

namespace Game.Gameplay.ECS
{
    public struct ProjectileData : IComponentData
    {
        public float3 Velocity;
        public float RemainingLifetime;
        public int Damage;
    }

    public sealed class ProjectileAuthoring : MonoBehaviour
    {
        public float Speed = 25f;
        public float Lifetime = 4f;
        public int Damage = 10;

        public sealed class Baker : Baker<ProjectileAuthoring>
        {
            public override void Bake(ProjectileAuthoring authoring)
            {
                Entity entity = GetEntity(TransformUsageFlags.Dynamic);
                AddComponent(entity, new ProjectileData
                {
                    Velocity = new float3(0f, 0f, authoring.Speed),
                    RemainingLifetime = authoring.Lifetime,
                    Damage = authoring.Damage
                });
            }
        }
    }

    [BurstCompile]
    [UpdateInGroup(typeof(SimulationSystemGroup))]
    public partial struct ProjectileSimulationSystem : ISystem
    {
        [BurstCompile]
        public void OnCreate(ref SystemState state)
        {
            state.RequireForUpdate<EndSimulationEntityCommandBufferSystem.Singleton>();
            state.RequireForUpdate<ProjectileData>();
        }

        [BurstCompile]
        public void OnUpdate(ref SystemState state)
        {
            var ecbSingleton = SystemAPI.GetSingleton<EndSimulationEntityCommandBufferSystem.Singleton>();
            var ecb = ecbSingleton.CreateCommandBuffer(state.WorldUnmanaged).AsParallelWriter();
            float deltaTime = SystemAPI.Time.DeltaTime;

            var job = new AdvanceProjectileJob
            {
                DeltaTime = deltaTime,
                Ecb = ecb
            };
            state.Dependency = job.ScheduleParallel(state.Dependency);
        }
    }

    [BurstCompile]
    public partial struct AdvanceProjectileJob : IJobEntity
    {
        public float DeltaTime;
        public EntityCommandBuffer.ParallelWriter Ecb;

        [BurstCompile]
        private void Execute(
            Entity entity,
            [ChunkIndexInQuery] int sortKey,
            ref LocalTransform transform,
            ref ProjectileData projectile)
        {
            transform.Position += projectile.Velocity * DeltaTime;
            projectile.RemainingLifetime -= DeltaTime;

            if (projectile.RemainingLifetime <= 0f)
            {
                Ecb.DestroyEntity(sortKey, entity);
            }
        }
    }
}
```

### Pattern B — Zero-Allocation `ObjectPool<T>` & ScriptableObject Event Channel Bridge

```csharp
using System;
using UnityEngine;
using UnityEngine.Pool;

namespace Game.Gameplay.Hybrid
{
    [CreateAssetMenu(menuName = "Events/DamagePopupChannel")]
    public sealed class DamagePopupEventChannel : ScriptableObject
    {
        public event Action<Vector3, int> OnDamageDealt;
        public void Raise(Vector3 worldPos, int amount) => OnDamageDealt?.Invoke(worldPos, amount);
    }

    public sealed class PooledVfxSpawner : MonoBehaviour
    {
        [SerializeField] private ParticleSystem vfxPrefab;
        private IObjectPool<ParticleSystem> pool;

        private void Awake()
        {
            pool = new ObjectPool<ParticleSystem>(
                createFunc: () => Instantiate(vfxPrefab, transform),
                actionOnGet: ps => { ps.gameObject.SetActive(true); ps.Play(); },
                actionOnRelease: ps => { ps.Stop(true, ParticleSystemStopBehavior.StopEmittingAndClear); ps.gameObject.SetActive(false); },
                actionOnDestroy: ps => Destroy(ps.gameObject),
                collectionCheck: false,
                defaultCapacity: 32,
                maxSize: 256
            );
        }

        public ParticleSystem SpawnAt(Vector3 position)
        {
            ParticleSystem instance = pool.Get();
            instance.transform.position = position;
            return instance;
        }

        public void Release(ParticleSystem instance) => pool.Release(instance);
    }
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Calling `GetComponent<T>()` or `Camera.main` in `Update()`**: Cache component references in `Awake()`.
- **❌ Using `SystemBase` with managed lambdas (`Entities.ForEach`)**: Always prefer `ISystem` + `IJobEntity` for full Burst compilation and zero GC overhead.
- **❌ Sync Points (`Complete()`) on the Main Thread Mid-Frame**: Chain `state.Dependency` across systems and let `EntityCommandBufferSystem` playback handle sync points at group boundaries.
- **❌ Allocating `new WaitForSeconds(t)` in Coroutines**: Cache `WaitForSeconds` instances or use Unity 6 `Awaitable` (`await Awaitable.WaitForSecondsAsync(t, destroyCancellationToken)`).

---

## 4. Verification Checklist

- [ ] All DOTS systems implement `ISystem` with `[BurstCompile]` on `OnCreate`, `OnUpdate`, and `IJobEntity`.
- [ ] Unity Profiler confirms `GC.Alloc = 0 B` during steady-state gameplay frames.
- [ ] All structural entity changes use `EntityCommandBuffer.ParallelWriter` with `[ChunkIndexInQuery] int sortKey`.
- [ ] Domain `.asmdef` files have zero circular references and clean `Unity.Mathematics` / `Unity.Collections` usage.
