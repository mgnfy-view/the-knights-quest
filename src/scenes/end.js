import { k } from "../utils/kaboomContext";
import { levels } from "../utils/levelInfo";
import { END, FONTS, SCALE, UI_SIZE } from "../utils/constants";

function end(globalState) {
    // Load the background image for the ending scene
    k.loadSprite(END, "./maps/end.png");

    // Add the background image
    k.add([k.sprite(END), k.pos(0), k.scale(SCALE)]);

    const closingText = "THE END";
    k.add([
        k.text(closingText, {
            font: FONTS.kitchenSink,
            align: "center",
        }),
        k.pos(k.width() / 2, k.height() / 2 - 150),
        k.anchor("center"),
    ]);

    // The coins matter! The knight is greedy!
    let totalCoinsToCollect = 0;
    for (const level of levels) {
        totalCoinsToCollect += level.coins;
    }
    console.log(totalCoinsToCollect, globalState.coinsCollected);
    const coinsCollectedText =
        globalState.coinsCollected === totalCoinsToCollect
            ? `The knight grabbed ${globalState.coinsCollected} coins and is happy!`
            : `The knight grabbed ${globalState.coinsCollected} coins but isn't happy!`;
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
            align: "center",
        }),
        k.pos(k.width() / 2, k.height() / 2 - 40),
        k.anchor("center"),
        k.scale(UI_SIZE.textScale),
    ]);
}

export { end };
