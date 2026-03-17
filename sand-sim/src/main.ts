import { Render } from "./renderer/render.ts";
import { initGpu } from "./renderer/gpu.ts";
import { addListeners, resizeCanvas } from "./engine/listeners.ts";
import { update } from "./engine/update.ts";
import type { Triangle } from "./engine/world.ts";

async function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;

  const gpu = await initGpu();

  addListeners(canvas, () => {
    resizeCanvas(canvas);
  });

  const draw = Render(gpu, canvas);

  let triangle: Triangle = {
    position: [0, 0],
    color: [1, 0, 0],
  };
  let last = 0;

  function loop(time) {
    let DT = (time - last) / 1000;

    last = time;

    update(DT, triangle);
    draw(triangle);

    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}

main();
