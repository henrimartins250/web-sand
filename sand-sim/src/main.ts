import { Render } from "./renderer/render.ts";
import { initGpu } from "./gpu.ts";
import { addListeners, resizeCanvas } from "./listeners.ts";

async function main(device) {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;

  const gpu = await initGpu();

  addListeners(canvas, () => {
    resizeCanvas(canvas);
  });

  const draw = Render(gpu, canvas);

  function loop() {
    draw();

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

main();
