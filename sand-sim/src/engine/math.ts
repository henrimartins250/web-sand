export type vec2 = [number, number];
export type vec3 = [number, number, number];
export type vec4 = [number, number, number, number];

export interface Transform {
  position vec2;
  rotation number;
  scale vec2;
}

export function vec2Add(a: vec2, b: vec2): vec2 {
  return [a[0] + b[0], a[1] + b[1]];
}
export function vec2Sub(a: vec2, b: vec2): vec2 {
  return [a[0] - b[0], a[1] - b[1]];
}
export function vec2Scale(v: vec2, s: number): vec2 {
  return [v[0] * s, v[1] * s];
}
export function vec2Lerp(a: vec2, b: vec2, t: number): vec2 {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
