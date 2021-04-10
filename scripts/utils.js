import game from "./models/Game.js";

const linearInterpolation = (startValue, endValue, interpolationValue) =>
  startValue +
  ((endValue - startValue) * (1 - Math.cos(interpolationValue * Math.PI))) / 2;

export const noise = x => {
  x = (x * 0.01) % 255;
  return linearInterpolation(
    game.permutation[~~x],
    game.permutation[~~x + 1],
    x - ~~x
  );
};

export const keys = {
  ArrowUp: 0,
  ArrowRight: 0,
  ArrowDown: 0,
  ArrowLeft: 0,
};
