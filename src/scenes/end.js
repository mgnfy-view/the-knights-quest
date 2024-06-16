import { END, FONTS, SCALE, UI_SIZE } from "../utils/constants";
import { k } from "../utils/kaboomContext";

function end(globalState) {
    // Load the background image for the ending scene
    k.loadSprite(END, "./maps/end.png");

    // Add the background image
    k.add([k.sprite(END), k.pos(0), k.scale(SCALE)]);

    const closingText = "THE END";
    k.add([
        k.text(closingText, {
            font: FONTS.kitchenSink,
        }),
        k.pos(k.width() / 2, k.height() / 2 - 150),
        k.anchor("center"),
    ]);

    // The coins matter! The knight is greedy!
    const coinsCollectedText = `The knight grabbed ${globalState.coinsCollected} coins`;
    k.add([
        k.text(coinsCollectedText, {
            font: FONTS.kitchenSink,
            align: "center",
        }),
        k.pos(k.width() / 2, k.height() / 2 - 80),
        k.anchor("center"),
        k.scale(UI_SIZE.textScale),
    ]);

    const thankingText = "Thanks for playing!";
    k.add([
        k.text(thankingText, {
            font: FONTS.kitchenSinkInverted,
        }),
        k.pos(k.width() / 2, k.height() / 2 - 40),
        k.anchor("center"),
        k.scale(UI_SIZE.textScale),
    ]);
}

export { end };
