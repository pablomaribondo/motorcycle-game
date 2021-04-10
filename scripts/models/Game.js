import { canvas, context } from "../config.js";
import { noise, keys } from "../utils.js";
import player from "./Player.js";

class Game {
  constructor() {
    this.frames = 0;
    this.permutation = [];
    this.playing = true;

    let permutationValue;

    while (this.permutation.length < 255) {
      while (
        this.permutation.includes((permutationValue = ~~(Math.random() * 255)))
      );
      this.permutation.push(permutationValue);
    }
  }

  loop() {
    player.speed -= (player.speed - (keys.ArrowUp - keys.ArrowDown)) * 0.01;
    this.frames += 10 * player.speed;

    context.fillStyle = "#19f";
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = "rgba(0,0,0,0.25)";
    context.beginPath();
    context.moveTo(0, canvas.height);

    for (let index = 0; index < canvas.width; index++) {
      context.lineTo(
        index,
        canvas.height * 0.8 - noise(this.frames + index * 5) * 0.25
      );
    }

    context.lineTo(canvas.width, canvas.height);
    context.fill();

    context.fillStyle = "#444";
    context.beginPath();
    context.moveTo(0, canvas.height);

    for (let index = 0; index < canvas.width; index++) {
      context.lineTo(index, canvas.height - noise(this.frames + index) * 0.25);
    }

    context.lineTo(canvas.width, canvas.height);
    context.fill();

    player.draw();

    if (player.x < 0) {
      this.restart();
    }

    requestAnimationFrame(this.loop.bind(this));
  }

  // TODO: implementar o método restart
  restart() {}
}

export default new Game();
