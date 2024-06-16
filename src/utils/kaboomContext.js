import kaboom from "kaboom";
import { CANVAS_COLOR, CANVAS_HEIGHT, CANVAS_WIDTH, SCALE } from "./constants";

// Get the html5 canvas reference
const gameCanvas = document.getElementById("game-canvas");

const k = kaboom({
    width: CANVAS_WIDTH * SCALE,
    height: CANVAS_HEIGHT * SCALE,
    canvas: gameCanvas,
    background: CANVAS_COLOR,
    global: false, // This makes it such that you need to prefix all kaboom.js functions with `k.`
});

export { k };
