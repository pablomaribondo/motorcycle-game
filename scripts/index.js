import game from "./models/Game.js";
import { keys } from "./utils.js";

onkeydown = event => (keys[event.key] = 1);
onkeyup = event => (keys[event.key] = 0);

game.loop();
