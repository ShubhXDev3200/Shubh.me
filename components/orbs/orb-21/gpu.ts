import { d, std, tgpu } from "typegpu";

/*
 * Shader by XorDev (https://x.com/XorDev), ported for Orbkit with the author's
 * permission. Non-commercial use only, with attribution to XorDev; keep this
 * notice with the file. shadercn's runtime (renderer.ts) is MIT-licensed.
 */

const STEPS = 56;
const LIGHT_STEPS = 4;
const DENSITY_OCT = 4;

export const orb21Params = d.struct({
  anim: d.f32,
  c_light: d.vec3f,
  c_shadow: d.vec3f,
  inputVol: d.f32,
  outputVol: d.f32,
  p_absorb: d.f32,
  p_alphaGain: d.f32,
  p_ambient: d.f32,
  p_aniso: d.f32,
  p_camDist: d.f32,
  p_churn: d.f32,
  p_density: d.f32,
  p_edgeSoft: d.f32,
  p_exposure: d.f32,
  p_focal: d.f32,
  p_lightSpin: d.f32,
  p_power: d.f32,
  p_radius: d.f32,
  p_scale: d.f32,
  p_shadowAbsorb: d.f32,
  p_shadowLift: d.f32,
  p_speed: d.f32,
  p_threshold: d.f32,
  res: d.vec2f,
  time: d.f32,
});

const layout = tgpu
  .bindGroupLayout({
    params: { uniform: orb21Params },
  })
  .$idx(0);

const density = tgpu.fn(
  [d.vec3f, d.f32, d.f32],
  d.f32
)((p, animTime, nimbusDensity) => {
  "use gpu";
  const u = layout.$.params;
  const shell = 1 - std.length(p) / u.p_radius;
  if (shell <= 0) {
    return d.f32();
  }

  let q = p.mul(u.p_scale);
  let f = d.f32(1);
  for (const _k of std.range(DENSITY_OCT)) {
    q = q.add(
      std
        .cos(
          d
            .vec3f(q.y, q.z, q.x)
            .mul(f)
            .add(animTime * u.p_churn)
        )
        .div(f)
    );
    f *= 1.8;
  }

  const n = ((std.sin(q.x) + std.sin(q.y) + std.sin(q.z)) / 3) * 0.5 + 0.5;
  const clump = std.smoothstep(u.p_threshold, 1, n);
  return clump * std.pow(shell, u.p_edgeSoft) * nimbusDensity;
});

const phaseHG = tgpu.fn(
  [d.f32, d.f32],
  d.f32
)((c, g) => {
  "use gpu";
  const g2 = g * g;
  return (1 - g2) / std.pow(std.max(1 + g2 - 2 * g * c, 0.0001), 1.5);
});

const nimbusRender = tgpu.fn(
  [d.vec2f, d.f32, d.f32],
  d.vec4f
)((fragCoord, nimbusPower, nimbusDensity) => {
  "use gpu";
  const u = layout.$.params;
  const animTime = u.p_speed;

  const uv = fragCoord.mul(2).sub(u.res).div(std.min(u.res.x, u.res.y));
  const ro = d.vec3f(0, 0, -u.p_camDist);
  const rd = std.normalize(d.vec3f(uv, u.p_focal));

  const L = std.normalize(
    d.vec3f(
      std.cos(animTime * u.p_lightSpin) * 0.7,
      0.45,
      std.sin(animTime * u.p_lightSpin) * 0.35 + 0.65
    )
  );

  const phase = phaseHG(std.dot(rd, L), u.p_aniso);

  const toCentre = u.p_camDist;
  const tStart = std.max(toCentre - u.p_radius, 0);
  const span = 2 * u.p_radius;
  const dt = span / d.f32(STEPS);

  let T = d.f32(1);
  let scattered = d.vec3f();

  for (const i of std.range(STEPS)) {
    const t = tStart + (d.f32(i) + 0.5) * dt;
    const p = ro.add(rd.mul(t));

    const dn = density(p, animTime, nimbusDensity);
    if (dn > 0.001) {
      let shadow = d.f32(1);
      const lstep = u.p_radius / d.f32(LIGHT_STEPS);
      for (const k of std.range(LIGHT_STEPS)) {
        const fk = d.f32(k) + 1;
        const lp = p.add(L.mul((fk - 0.5) * lstep));
        shadow *= std.exp(
          -density(lp, animTime, nimbusDensity) * lstep * u.p_shadowAbsorb
        );
      }

      const lit = std.mix(u.c_shadow.mul(u.p_shadowLift), u.c_light, shadow);
      scattered = scattered.add(lit.mul(T * dn * dt * phase * nimbusPower));

      T *= std.exp(-dn * dt * u.p_absorb);
      if (T < 0.01) {
        break;
      }
    }
  }

  const body = 1 - T;
  scattered = scattered.add(u.c_shadow.mul(body * u.p_ambient));

  return d.vec4f(scattered, body);
});

const orb21Fragment = tgpu
  .fragmentFn({
    in: { uv: d.vec2f },
    out: d.vec4f,
  })((input) => {
    "use gpu";
    const u = layout.$.params;
    const fragCoord = input.uv.mul(u.res);

    const nimbusPower = u.p_power * (0.7 + 0.9 * u.outputVol);
    const nimbusDensity = u.p_density * (1 + 0.35 * u.inputVol);

    const acc = nimbusRender(fragCoord, nimbusPower, nimbusDensity);

    const col = std.tanh(acc.xyz.mul(u.p_exposure));
    const a = std.clamp(acc.w * u.p_alphaGain, 0, 1);

    return d.vec4f(col, a);
  })
  .$name("orb21Fragment");

export const orb21Shader = tgpu.resolve([orb21Fragment]);