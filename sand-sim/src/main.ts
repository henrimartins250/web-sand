import { createRenderer } from "./renderer/render.ts";
import { initGpu } from "./renderer/gpu.ts";
import { addListeners, resizeCanvas } from "./engine/listeners.ts";
import { update } from "./engine/update.ts";
import type { Triangle } from "./engine/components.ts";

async function main() {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;

  const gpu = await initGpu();

  addListeners(canvas, () => {
    resizeCanvas(canvas);
  });

  const renderer = createRenderer(gpu, canvas);

  let triangle: Triangle = {
    position: [0, 0],
    color: [1, 0, 0],
  };
  let last = 0;

  function loop(time) {
    let DT = (time - last) / 1000;

    last = time;

    update(DT, triangle);
    const data = getRenderData(triangle);
    renderer.draw(data);

    requestAnimationFrame(loop);
  }

  function getRenderData(triangle) {
    const data = new Float32Array(8);

    data[0] = triangle.position[0];
    data[1] = triangle.position[1];
    // [2] and [3] are padding
    data[4] = triangle.color[0];
    data[5] = triangle.color[1];
    data[6] = triangle.color[2];
    data[7] = 1.0; // Alpha

    return data;
  }

  requestAnimationFrame(loop);
}

main();
