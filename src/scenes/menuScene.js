import { k } from "../utils/kaboomContext";
import { levelStart } from "./levelStart";
import { levels } from "../utils/levelInfo";
import {
    FONTS,
    KEYS,
    SCALE,
    UI_SIZE,
    LEVEL_START_TAG,
    SOUNDS,
    VOLUME,
    HELP,
    MENU,
} from "../utils/constants";
import { help } from "./help";

function menu() {
    // Load the background image for the menu scene
    k.loadSprite(MENU, "./maps/menu.png");

    // Add the background image
    k.add([k.sprite(MENU), k.pos(0), k.scale(SCALE)]);

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
    const actionText = "Press Enter to Start";
    k.add([
        k.text(actionText, {
            font: FONTS.kitchenSinkInverted,
        }),
        k.pos(k.width() / 2, k.height() / 2 - 80),
        k.anchor("center"),
        k.scale(UI_SIZE.textScale),
    ]);

    const helpActionText = "Press 'h'\nto open guide";
    k.add([
        k.text(helpActionText, {
            font: FONTS.kitchenSink,
            align: "left",
        }),
        k.pos(30, k.height() - 40),
        k.anchor("left"),
        k.scale(UI_SIZE.textScale - 0.2),
    ]);

    const creditsText = "Made with love\nby mgnfy-view";
    k.add([
        k.text(creditsText, {
            font: FONTS.kitchenSink,
            align: "right",
        }),
        k.pos(k.width() - 30, k.height() - 40),
        k.anchor("right"),
        k.scale(UI_SIZE.textScale - 0.2),
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

    // Open the guide on pressing "h"
    k.onKeyPress(KEYS.h, () => {
        k.scene(HELP, help);
        k.go(HELP);
    });
}

export { menu };
