export class BufferManager {
  constructor(private device: GPUDevice) {}

  createUniform(size: number): GPUBuffer {
    return this.device.createBuffer({
      size,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
  }

  // For sand grid - vertex buffers, storage buffers
  createStorage(size: number): GPUBuffer {
    return this.device.createBuffer({
      size,
      usage:
        GPUBufferUsage.STORAGE |
        GPUBufferUsage.COPY_DST |
        GPUBufferUsage.VERTEX,
    });
  }
}
