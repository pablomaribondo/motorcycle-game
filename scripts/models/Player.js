import { canvas, context } from "../config.js";
import { noise, keys } from "../utils.js";
import game from "./Game.js";

class Player {
  constructor() {
    this.x = canvas.width / 2;
    this.y = 0;
    this.speed = 0;
    this.ySpeed = 0;
    this.rotationSpeed = 0;
    this.rotation = 0;

    this.image = new Image();
    this.image.src =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAXCAYAAAD+4+QTAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAcGFpbnQubmV0IDQuMC4xOdTWsmQAAALfSURBVEhLrVVLaBRBEN2NoqirB1Hw4MGD+ImHYNQQdme2IdMz09s9CfgZD56CQREPgmJAEFn1JniSIIIaPHjRg168CYoEQYwa/AYvXvwgRhEFxQ9ZfdXTO3F3Zpc1yYNH73ZVvaqu/kymGdrDcB6Nlls6ZHE5brtquNvzlmrjbMHmwT6IX4b4n5hc3YMpG3nMEMzrXQ3RqzUJIlaKjtho3KYP25UDWMHP+gSWq0a7hFgyKy2D4Gh9AiK1zrjMDIwFy9D3L7GwK9+AD6Pf6gXGY/m+vsXGfXqwuTwVJ+DyIiXFdLbgqq1I/gDzFV0EV2MFT3VEUf8JiDyPkshfYD9jLGdMGkzKFbC/jIpQdywhlhtT60BLbkRJ4nZ9xni8u3vHAuOSKXK5EwU8NvbTZrp1MBbm0KajCJ6oScbVXZj1/Sg6wRbbkQp+r7TNKwU03wxZ9HY3XTwE77IcKWw/6LSc0hokOog9ehYncuV+/L9Ge4IEk0j8w8zfpziscJvdE3SWy+U2oz0FIcR8xkubbU8eqQpqkpArP9bMNaBOxOUQHRa0coRaauRr4bruIuzJ7zSRRoToU4wVOiRGhpCtvnupQAvO1Qs1Y546gBaiuNebgmChkWmINuYF62xPddlu4GH5B1DdMIRQZXoC+Ewgjva0A/8rSHQFK7uE8bztlLaTTSsTir6y4aTPviZXnyxP7SUbEg3E8wnKm+RD7xk68C5h5+o67tncTMHv3YDlfks4gFQZ3eyEjcvvWMV7CA+ZQs4mfKrk8jD2oO57kWTULi6/IuEHCN7G6NPNpzaFYThH25Jxmij0CT0jU21KI849juP6Rt8QeixT46pEYfSMPEo1aspJ6rfRa4Qs/N6mxxPlCK3kRNIQ85YRagoIDabEatIrgLeK5VJXQyesR7QbnebAMwL/M4j757jTl1UOGo/4UTwJxzGM4zg1F5jvrzLmlpH3/bWI3QPxfibEymg2k/kLGmgFj+yZMV8AAAAASUVORK5CYII";
  }

  draw() {
    const point1 = canvas.height - noise(game.frames + this.x) * 0.25;
    const point2 = canvas.height - noise(game.frames + 5 + this.x) * 0.25;

    let grounded = false;
    if (point1 - 15 > this.y) {
      this.ySpeed += 0.1;
    } else {
      this.ySpeed -= this.y - (point1 - 15);
      this.y = point1 - 15;
      grounded = true;
    }

    if (
      !game.playing ||
      (grounded && Math.abs(this.rotation) > Math.PI * 0.5)
    ) {
      game.playing = false;
      this.rotationSpeed = 5;
      keys.ArrowUp = 1;
      this.x -= this.speed * 5;
    }

    const angle = Math.atan2(point2 - 15 - this.y, 5);
    this.y += this.ySpeed;

    if (grounded && game.playing) {
      this.rotation -= (this.rotation - angle) * 0.5;
      this.rotationSpeed -= angle - this.rotation;
    }

    this.rotationSpeed += (keys.ArrowLeft - keys.ArrowRight) * 0.05;
    this.rotation -= this.rotationSpeed * 0.1;

    if (this.rotation > Math.PI) this.rotation = -Math.PI;
    if (this.rotation < -Math.PI) this.rotation = Math.PI;

    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.rotation);
    context.drawImage(this.image, -15, -15, 30, 30);
    context.restore();
  }

  reset() {
    this.x = canvas.width / 2;
    this.y = 0;
    this.speed = 0;
    this.ySpeed = 0;
    this.rotationSpeed = 0;
    this.rotation = 0;
  }
}

export default new Player();
