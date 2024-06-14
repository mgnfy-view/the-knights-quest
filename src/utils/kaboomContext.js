import kaboom from "kaboom";
import { CANVAS_COLOR, CANVAS_HEIGHT, CANVAS_WIDTH, SCALE } from "./constants";

const gameCanvas = document.getElementById("game-canvas");

const k = kaboom({
    width: CANVAS_WIDTH * SCALE,
    height: CANVAS_HEIGHT * SCALE,
    canvas: gameCanvas,
    background: CANVAS_COLOR,
    global: false,
});

export { k };
