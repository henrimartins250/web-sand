export function setBindGroups(device, pipeline, buffer) {
  return device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: buffer }],
  });
}
