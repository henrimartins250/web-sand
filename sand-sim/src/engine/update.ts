import { isKeyDown } from "./listeners.ts";

export function update(DT, triangle) {
  updateColor(DT, triangle);
  updatePosition(DT, triangle);
}

let t = 0;

function updateColor(DT, triangle) {
  t += DT * 0.005;
  triangle.color[0] = (Math.sin(t) + 1) / 2;
  triangle.color[1] = (Math.sin(t + 2) + 1) / 2;
  triangle.color[2] = (Math.sin(t + 4) + 1) / 2;
}

function updatePosition(DT, triangle) {
  const speed = 0.001; // units per second

  if (isKeyDown("w")) triangle.position[1] += speed * DT;
  if (isKeyDown("s")) triangle.position[1] -= speed * DT;
  if (isKeyDown("a")) triangle.position[0] -= speed * DT;
  if (isKeyDown("d")) triangle.position[0] += speed * DT;
}
