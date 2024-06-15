import { k } from "../utils/kaboomContext";
import { levelStart } from "./levelStart";
import { levels } from "../utils/levelInfo";
import {
    END,
    FONTS,
    KEYS,
    SCALE,
    UI_SIZE,
    LEVEL_START_TAG,
    SOUNDS,
    VOLUME,
} from "../utils/constants";

function menu() {
    // Load the background image for the menu scene
    k.loadSprite(END, "./maps/menu.png");

    // Add the background image
    k.add([k.sprite(END), k.pos(0), k.scale(SCALE)]);

    // Display the game's name
    const name = "THE KNIGHT'S QUEST";
    k.add([
        k.text(name, {
            font: FONTS.kitchenSink,
        }),
        k.pos(k.width() / 2, k.height() / 2 - 150),
        k.anchor("center"),
    ]);

    // Press enter to start
    const action = "Press Enter";
    k.add([
        k.text(action, {
            font: FONTS.kitchenSinkInverted,
        }),
        k.pos(k.width() / 2, k.height() / 2 - 80),
        k.anchor("center"),
        k.scale(UI_SIZE.textScale),
    ]);

    // Go to the level start scene
    k.onKeyPress(KEYS.enter, () => {
        // Start playing the background music
        k.play(SOUNDS.backgroundMusic, {
            loop: true,
            volume: VOLUME.backgroundMusic,
        });
        k.scene(LEVEL_START_TAG, levelStart);
        k.go(LEVEL_START_TAG, {
            level: 0,
            coinsCollected: 0,
            fireBalls: levels[0].fireBalls,
        });
    });
}

export { menu };
