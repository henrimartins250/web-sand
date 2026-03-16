import fs_red from "./shaders/fs_red.wgsl?raw";
import vs_triangle from "./shaders/vs_triangle.wgsl?raw";

export function createPipeline(device, format) {
  return device.createRenderPipeline({
    layout: "auto",
    vertex: {
      module: device.createShaderModule({
        code: vs_triangle,
      }),
    },
    fragment: {
      module: device.createShaderModule({
        code: fs_red,
      }),
      targets: [
        {
          format: format,
        },
      ],
    },
    primitive: {
      topology: "triangle-list",
    },
  });
}
