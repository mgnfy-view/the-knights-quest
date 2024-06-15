import { k } from "./utils/kaboomContext";
import { loadAssets } from "./loader";
import { GRAVITY, MENU } from "./utils/constants";
import { menu } from "./scenes/menuScene";

// Load the game assets
loadAssets();

async function setupGame() {
    // Set the gravity for all the levels
    k.setGravity(GRAVITY);

    // Go to the menu scene
    k.scene(MENU, menu);
    k.go(MENU);
}

setupGame();
