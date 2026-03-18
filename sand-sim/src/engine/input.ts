import {
  addKeyListeners,
  addWindowListeners,
  addMouseListeners,
} from "./listeners.ts";

type ButtonState = {
  down: boolean;
  pressed: boolean;
  released: boolean;
};

// mouse input

interface MouseState {
  position: [number, number]; // Screen pixels (client coords)
  left: ButtonState;
  right: ButtonState;
  middle: ButtonState;
  wheelDelta: number; // Accumulated scroll since last frame
}

// Keyboad input
type KeyState = ButtonState;

// store mouse input
export const mouse: MouseState = {
  position: [0, 0],
  left: { down: false, pressed: false, released: false },
  right: { down: false, pressed: false, released: false },
  middle: { down: false, pressed: false, released: false },
  wheelDelta: 0,
};

// store keystate
export const keys: Record<string, KeyState> = {};

export function resizeCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;

  const width = Math.floor(canvas.clientWidth * dpr);
  const height = Math.floor(canvas.clientHeight * dpr);

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
}

export function isKeyDown(key: string) {
  return !!keys[key]?.down;
}

export function isKeyPressed(key: string) {
  return !!keys[key]?.pressed;
}

export function isKeyReleased(key: string) {
  return !!keys[key]?.released;
}

export function isMouseDown(button: "left" | "middle" | "right") {
  return mouse[button].down;
}

export function isMousePressed(button: "left" | "middle" | "right") {
  return mouse[button].pressed;
}

export function isMouseReleased(button: "left" | "middle" | "right") {
  return mouse[button].released;
}

export function addListeners(canvas: HTMLCanvasElement) {
  addMouseListeners(canvas);
  addWindowListeners(canvas, () => resizeCanvas(canvas));
  addKeyListeners();
}

export function updateInput() {
  mouse.wheelDelta = 0;

  for (const key in keys) {
    keys[key].pressed = false;
    keys[key].released = false;
  }

  for (const btn of [mouse.left, mouse.middle, mouse.right]) {
    btn.pressed = false;
    btn.released = false;
  }
}
