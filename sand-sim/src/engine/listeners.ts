import { keys, mouse } from "./input.ts";
import type { ButtonState } from "./input.ts";

export function addWindowListeners(
  canvas: HTMLCanvasElement,
  onResize: () => void,
) {
  window.addEventListener("resize", () => {
    onResize();
  });

  window.addEventListener("change", onResize);
}

export function addKeyListeners() {
  window.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!keys[key]) {
      keys[key] = { down: false, pressed: false, released: false };
    }

    if (!keys[key].down) {
      keys[key].pressed = true; // first frame press
    }

    keys[key].down = true;
  });

  window.addEventListener("keyup", (e) => {
    const key = e.key;

    if (!keys[key]) {
      keys[key] = { down: false, pressed: false, released: false };
    }

    keys[key].down = false;
    keys[key].released = true;
  });
}

// add Mouse listeners

export function addMouseListeners(canvas: HTMLCanvasElement) {
  // on mouse move, set position(x, y)
  //
  function getButton(button: number): ButtonState | null {
    if (button === 0) return mouse.left;
    if (button === 1) return mouse.middle;
    if (button === 2) return mouse.right;
    return null;
  }

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();

    mouse.position[0] = e.clientX - rect.left;
    mouse.position[1] = e.clientY - rect.top;
  });

  // on mouse button down, set true
  canvas.addEventListener("mousedown", (e) => {
    const btn = getButton(e.button);
    if (!btn) return;

    if (!btn.down) {
      btn.pressed = true;
    }

    btn.down = true;
  });

  // on mouse button release, set false
  canvas.addEventListener("mouseup", (e) => {
    const btn = getButton(e.button);
    if (!btn) return;

    btn.down = false;
    btn.released = true;
  });
  canvas.addEventListener(
    "wheel",
    (e) => {
      e.preventDefault();
      mouse.wheelDelta += e.deltaY;
    },
    { passive: false },
  );
  // Prevent right-click context menu
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());
}
