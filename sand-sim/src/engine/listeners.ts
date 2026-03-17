export function resizeCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;

  const width = Math.floor(canvas.clientWidth * dpr);
  const height = Math.floor(canvas.clientHeight * dpr);

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

export const keys: Record<string, boolean> = {};

export function addListeners(canvas, onResize: () => void) {
  window.addEventListener("resize", () => {
    onResize();
  });

  window.addEventListener("devicePixelRatiochange", () => {
    onResize();
  });

  resizeCanvas(canvas);

  window.addEventListener("keydown", (e) => {
    keys[e.key] = true;
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key] = false;
  });
}

export function isKeyDown(key: string) {
  return !!keys[key];
}
