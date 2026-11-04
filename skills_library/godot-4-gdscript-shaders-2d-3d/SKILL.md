---
name: godot-4-gdscript-shaders-2d-3d
description: "Godot 4.3+ strict static-typed GDScript architecture, node composition, signal bus, custom Resource data, CharacterBody2D/3D state machines, and Godot Shader Language."
domain: gaming
version: "5.5.0"
---

# Godot 4.3+ Strict Static-Typed GDScript, Composition & Shaders

> **PURPOSE**: Production patterns for Godot 4.3+ 2D/3D games enforcing 100% static typing in GDScript (`:=`, `-> void`, `Array[T]`), component composition over deep inheritance, custom `Resource` data-driven design, hierarchical state machines, and GPU-accelerated `.gdshader` effects.

---

## 1. Core Architectural Principles

1. **100% Static Typing Mandate**:
   - Enable `debug/gdscript/warnings/untyped_declaration = Error` in `project.godot`.
   - Every variable, parameter, array (`Array[EnemyData]`), and return type (`-> float`) MUST be explicitly typed so Godot 4's GDScript VM emits optimized typed opcodes (`+40–60%` execution speed).
2. **Composition Over Inheritance**:
   - Build entities (`Player`, `Enemy`, `Interactable`) by composing reusable child component nodes (`HealthComponent`, `HitboxComponent`, `HurtboxComponent`, `VelocityComponent`) rather than deep class hierarchies.
3. **Signal Up, Call Down**:
   - Parent nodes configure and call methods directly on child nodes; child nodes emit typed `signal` events upward without hardcoding parent scene paths (`get_parent().get_parent()`).
4. **Data-Driven `Resource` Assets**:
   - Store weapon stats, ability cooldowns, and enemy archetypes in `class_name` scripts extending `Resource` (`.tres`) so balancing never requires scene edits.

---

## 2. Production Code Patterns

### Pattern A — Data-Driven `Resource` + Composable `HealthComponent`

```gdscript
# res://src/combat/damage_payload.gd
class_name DamagePayload
extends RefCounted

var amount: int
var knockback_vector: Vector3
var is_critical: bool
var instigator: Node3D

func _init(p_amount: int, p_knockback: Vector3 = Vector3.ZERO, p_crit: bool = false, p_instigator: Node3D = null) -> void:
    amount = p_amount
    knockback_vector = p_knockback
    is_critical = p_crit
    instigator = p_instigator
```

```gdscript
# res://src/components/health_component.gd
class_name HealthComponent
extends Node

signal health_changed(current: int, maximum: int)
signal damaged(payload: DamagePayload)
signal died(killer: Node3D)

@export_range(1, 99999) var max_health: int = 100
var current_health: int = 100
var is_invulnerable: bool = false

func _ready() -> void:
    current_health = max_health
    health_changed.emit(current_health, max_health)

func apply_damage(payload: DamagePayload) -> void:
    if is_invulnerable or current_health <= 0:
        return
    current_health = maxi(0, current_health - payload.amount)
    damaged.emit(payload)
    health_changed.emit(current_health, max_health)
    if current_health == 0:
        died.emit(payload.instigator)
```

### Pattern B — Frame-Independent `CharacterBody3D` Movement & Coyote-Time State

```gdscript
# res://src/actors/player_controller_3d.gd
class_name PlayerController3D
extends CharacterBody3D

@export var max_speed: float = 8.5
@export var acceleration: float = 42.0
@export var friction: float = 36.0
@export var jump_velocity: float = 11.2
@export var coyote_duration: float = 0.12

var _coyote_timer: float = 0.0
var _gravity: float = ProjectSettings.get_setting("physics/3d/default_gravity") as float

func _physics_process(delta: float) -> void:
    if is_on_floor():
        _coyote_timer = coyote_duration
    else:
        _coyote_timer = maxf(0.0, _coyote_timer - delta)
        velocity.y -= _gravity * delta

    if Input.is_action_just_pressed("jump") and _coyote_timer > 0.0:
        velocity.y = jump_velocity
        _coyote_timer = 0.0

    var input_dir: Vector2 = Input.get_vector("move_left", "move_right", "move_forward", "move_back")
    var wish_dir: Vector3 = (transform.basis * Vector3(input_dir.x, 0.0, input_dir.y)).normalized()

    if wish_dir != Vector3.ZERO:
        velocity.x = move_toward(velocity.x, wish_dir.x * max_speed, acceleration * delta)
        velocity.z = move_toward(velocity.z, wish_dir.z * max_speed, acceleration * delta)
    else:
        velocity.x = move_toward(velocity.x, 0.0, friction * delta)
        velocity.z = move_toward(velocity.z, 0.0, friction * delta)

    move_and_slide()
```

### Pattern C — Godot 4 Spatial Hit-Flash & Dissolve Shader (`.gdshader`)

```glsl
shader_type spatial;
render_mode blend_mix, depth_draw_opaque, cull_back, diffuse_burley, specular_schlick_ggx;

uniform sampler2D albedo_tex : source_color, filter_linear_mipmap;
uniform sampler2D noise_tex : hint_default_white;
uniform vec4 flash_color : source_color = vec4(1.0, 1.0, 1.0, 1.0);
uniform float flash_weight : hint_range(0.0, 1.0) = 0.0;
uniform float dissolve_threshold : hint_range(0.0, 1.0) = 0.0;
uniform vec4 edge_emission : source_color = vec4(1.0, 0.35, 0.05, 1.0);

void fragment() {
    vec4 base = texture(albedo_tex, UV);
    float noise_val = texture(noise_tex, UV).r;
    if (noise_val < dissolve_threshold) {
        discard;
    }
    float edge = smoothstep(dissolve_threshold, dissolve_threshold + 0.06, noise_val);
    ALBEDO = mix(base.rgb, flash_color.rgb, flash_weight);
    EMISSION = mix(edge_emission.rgb * 3.5, flash_color.rgb * 2.0, edge * flash_weight) * (1.0 - edge + flash_weight);
}
```

---

## 3. Anti-Patterns to Avoid

- **❌ Untyped Dictionaries as Domain Models**: Use typed `class_name` subclasses of `RefCounted` or `Resource`.
- **❌ Hardcoded `get_node("../../UI/HUD")` Paths**: Use `@export var target_node: Node` or an Autoload `EventBus` only for global cross-scene events.
- **❌Duplicating Shader Materials Per Instance for Hit Flashes**: Use `GeometryInstance3D.set_instance_shader_parameter("flash_weight", 1.0)` (`instance uniform`) to preserve GPU draw-call batching.

---

## 4. Verification Checklist

- [ ] Every `.gd` script declares `class_name` (where reusable) and 100% static type annotations on variables, arrays, and return values.
- [ ] Physics movement (`move_and_slide()`) runs strictly inside `_physics_process(delta: float)`.
- [ ] Per-instance visual effects use `instance uniform` shader parameters or `MultiMeshInstance2D/3D` for large crowds.
