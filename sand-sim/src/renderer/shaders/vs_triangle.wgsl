
struct VertexOutput {
  @builtin(position) position : vec4<f32>,
  @location(0) color : vec4<f32>,
};

struct Triangle {
  position : vec2<f32>,
  pad1 : vec2<f32>,
  color : vec4<f32>,
}

@group(0) @binding(0) var<uniform> tri : Triangle;

@vertex
fn main(@builtin(vertex_index) vertex_index: u32) -> VertexOutput {
    var out : VertexOutput;

    var pos = array<vec2<f32>, 3>(
        vec2<f32>(0.0, 0.5),
        vec2<f32>(-0.5, -0.5),
        vec2<f32>(0.5, -0.5)
    );

    out.position = vec4<f32>(pos[vertex_index] + tri.position, 0.0, 1.0);
    out.color = vec4<f32>(tri.color);

    return out;
}
