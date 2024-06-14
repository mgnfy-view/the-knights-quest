import { k } from "./utils/kaboomContext";
import { levelScene } from "./scenes/levelScene";
import { GRAVITY, SOUNDS, TAGS, VOLUME } from "./utils/constants";
import { levels } from "./utils/levelInfo";

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
    },
});

// Load audio assest
k.loadSound(SOUNDS.coinCollect, "./audio/coinCollect.mp3");
k.loadSound(SOUNDS.jump, "./audio/jump.mp3");
k.loadSound(SOUNDS.tileDestroy, "./audio/tileDestroy.mp3");
k.loadSound(SOUNDS.fireBall, "./audio/fireBall.mp3");

k.loadSound(SOUNDS.backgroundMusic, "./audio/backgroundMusic.mp3");

async function setupGame() {
    // Set the gravity for all the levels
    k.setGravity(GRAVITY);

    k.play(SOUNDS.backgroundMusic, {
        volume: VOLUME.backgroundMusic,
    });
    k.scene(levels[0].name, levelScene);
    k.go(levels[0].name, { level: 0, coinsCollected: 0, fireBalls: levels[0].fireBalls });
}

setupGame();
