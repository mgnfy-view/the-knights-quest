import { k } from "../utils/kaboomContext";
import { FONTS, KEYS, MENU, UI_SIZE } from "../utils/constants";

function help() {
    const goBackText = "<- Press 'esc' to go back";
    k.add([
        k.text(goBackText, {
            font: FONTS.kitchenSink,
            align: "left",
        }),
        k.pos(30, 40),
        k.anchor("left"),
        k.scale(UI_SIZE.textScale - 0.2), // Make it even smaller
    ]);

    const helpText = [
        "1. Press the left and right arrow keys\n   to move around",
        "2. Press 'space' to jump",
        "3. Press 'x' to shoot a fireBall",
    ];
    k.add([
        k.text(helpText[0], {
            font: FONTS.kitchenSink,
            align: "left",
        }),
        k.pos(80, 200),
        k.anchor("left"),
        k.scale(UI_SIZE.textScale),
    ]);
    k.add([
        k.text(helpText[1], {
            font: FONTS.kitchenSink,
            align: "left",
        }),
        k.pos(80, 265),
        k.anchor("left"),
        k.scale(UI_SIZE.textScale),
    ]);
    k.add([
        k.text(helpText[2], {
            font: FONTS.kitchenSink,
            align: "left",
        }),
        k.pos(80, 320),
        k.anchor("left"),
        k.scale(UI_SIZE.textScale),
    ]);

    // Go back to the main menu when the escape key is pressed
    k.onKeyPress(KEYS.esc, () => {
        k.go(MENU);
    });
}

export { help };
