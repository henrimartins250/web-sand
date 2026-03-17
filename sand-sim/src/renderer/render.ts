import { createPipeline } from "./pipeline.ts";
import { BufferManager } from "./buffers.ts";

export function createRenderer(
  device: GPUDevice,
  format: GPUTextureFormat,
  canvas: HTMLCanvasElement,
) {
  const context = canvas.getContext("webgpu");
  context.configure({
    device,
    format: format,
  });

  const pipeline = createPipeline(device, format);
  const buffers = new BufferManager(device);

  const uniformBuffer = buffers.createUniform(256);

  const uniformBindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: uniformBuffer }],
  });

  return {
    draw(uniformData) {
      const commandEncoder = device.createCommandEncoder();
      const textureView = context.getCurrentTexture().createView();

      device.queue.writeBuffer(uniformBuffer, 0, uniformData);

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
    },
  };
}
