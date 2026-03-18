function fail(message) {
  console.error(message);

  const div = document.createElement("div");
  div.style.color = "red";
  div.style.fontFamily = "monospace";
  div.style.padding = "20px";
  div.textContent = message;

  document.body.appendChild(div);
}

export async function initGpu(canvas: HTMLCanvasElement) {
  if (!navigator.gpu) {
    fail("this browser does not support WebGPU");
    return;
  }

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    fail("this browser supports webgpu but it appears disabled");
    return;
  }

  const device = await adapter.requestDevice();
  device.lost.then((info) => {
    console.error(`WebGPU device was lost: ${info.message}`);

    // 'reason' will be 'destroyed' if we intentionally destroy the device.
    // if (info.reason !== "destroyed") {
    // }
  });

  const format = await navigator.gpu.getPreferredCanvasFormat();

  return { adapter, device, format };
}
