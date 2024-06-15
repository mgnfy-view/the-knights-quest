import { k } from "./utils/kaboomContext";
import { TAGS, SOUNDS, FONTS } from "./utils/constants";

function loadAssets() {
    // Load the spritesheet for the game
    k.loadSprite(TAGS.spriteSheet, "./spriteSheets/spriteSheet.png", {
        sliceX: 8,
        sliceY: 8,
        anims: {
            idleRight: 0,
            idleLeft: 11,
            walkRight: { from: 0, to: 3, speed: 16, loop: true },
            walkLeft: { from: 8, to: 11, speed: 16, loop: true },
            tile: 48,
            exit: 50,
            coin: 56,
            fireBall: 57,
            scaffold: 16,
            waterTop: 19,
            waterBottom: 27,
        },
    });

    // Load the kitchen sink font
    k.loadFont(FONTS.kitchenSink, "./fonts/kitchenSink.ttf");
    k.loadFont(FONTS.kitchenSinkInverted, "./fonts/kitchenSinkInverted.ttf");

    // Load the audio assets
    k.loadSound(SOUNDS.coinCollect, "./audio/coinCollect.mp3");
    k.loadSound(SOUNDS.jump, "./audio/jump.mp3");
    k.loadSound(SOUNDS.tileDestroy, "./audio/tileDestroy.mp3");
    k.loadSound(SOUNDS.fireBall, "./audio/fireBall.mp3");
    k.loadSound(SOUNDS.backgroundMusic, "./audio/backgroundMusic.mp3");
}

export { loadAssets };
