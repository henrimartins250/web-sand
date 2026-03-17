import { createPipeline } from "./pipeline.ts";
import { setBindGroups } from "./bindGroups.ts";

export function Render(gpu, canvas) {
  const { device } = gpu;
  const context = canvas.getContext("webgpu");
  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device,
    format: format,
  });

  const triangleData = new Float32Array(8);

  const uniformBuffer = device.createBuffer({
    size: triangleData.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const pipeline = createPipeline(device, format);
  const uniformBindGroup = setBindGroups(device, pipeline, uniformBuffer);

  function draw(triangle) {
    const commandEncoder = device.createCommandEncoder();
    const textureView = context.getCurrentTexture().createView();

    triangleData[0] = triangle.position[0];
    triangleData[1] = triangle.position[1];
    // [2] and [3] are padding
    triangleData[4] = triangle.color[0];
    triangleData[5] = triangle.color[1];
    triangleData[6] = triangle.color[2];
    triangleData[7] = 1.0; // Alpha

    device.queue.writeBuffer(uniformBuffer, 0, triangleData);

    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: [0, 0, 0, 0], // Clear to transparent
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, uniformBindGroup);
    passEncoder.draw(3);
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
  }

  return draw;
}
