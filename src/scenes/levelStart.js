import { k } from "../utils/kaboomContext";
import { levelScene } from "./levelScene";
import { levels } from "../utils/levelInfo";
import { FONTS, LEVEL_ENTRY_DELAY } from "../utils/constants";

function levelStart(globalState) {
    // Display the level number
    k.add([
        k.text(`LEVEL ${globalState.level + 1}`, {
            font: FONTS.kitchenSink,
        }),
        k.pos(k.width() / 2, k.height() / 2 - 10),
        k.anchor("center"),
    ]);

    // Go to the level after briefly displaying the level number
    setTimeout(() => {
        k.scene(levels[globalState.level].name, levelScene);
        k.go(levels[globalState.level].name, globalState);
    }, LEVEL_ENTRY_DELAY);
}

export { levelStart };
