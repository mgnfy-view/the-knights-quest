import { k } from "./kaboomContext";
import { SCALE, LAYERS, OBJECTS, TAGS, ANIMATIONS, FONTS, UI_SIZE } from "./constants";

async function makeMap(levelName) {
    // Fetch the json data from the public folder
    const mapData = await (await fetch(`./levels/${levelName}.json`)).json();

    // Create a map with the level's corresponding png image
    const map = k.make([k.sprite(levelName), k.pos(0), k.scale(SCALE)]);

    // Create arrays to store data about player, tile, coin and exit spawn locations
    const playerSpawn = [];
    const tileSpawns = [];
    const coinSpawns = [];
    const exitSpawn = [];
    const scaffoldSpawns = [];
    const waterTopSpawns = [];
    const waterBottomSpawns = [];

    // Fetch info from the json level
    for (const layer of mapData.layers) {
        // The first layer is the platform layer
        // It provides the player some surface to move on
        if (layer.name === LAYERS.platform) {
            for (const platform of layer.objects) {
                map.add([
                    k.rect(platform.width, platform.height),
                    k.pos(platform.x, platform.y),
                    k.area(),
                    k.body({ isStatic: true }),
                    k.opacity(0),
                    TAGS.platform,
                ]);
            }
        }

        // The second layer consists of game objects such as the tiles, coins, and the exit
        if (layer.name === LAYERS.gameObjects) {
            for (const gameObject of layer.objects) {
                switch (gameObject.name) {
                    case OBJECTS.tile:
                        tileSpawns.push([gameObject.x, gameObject.y]);
                        break;
                    case OBJECTS.coin:
                        coinSpawns.push([gameObject.x, gameObject.y]);
                        break;
                    case OBJECTS.exit:
                        exitSpawn.push([gameObject.x, gameObject.y]);
                        break;
                    case OBJECTS.scaffold:
                        scaffoldSpawns.push([gameObject.x, gameObject.y]);
                        break;
                    case OBJECTS.waterTop:
                        waterTopSpawns.push([gameObject.x, gameObject.y]);
                        break;
                    case OBJECTS.waterBottom:
                        waterBottomSpawns.push([gameObject.x, gameObject.y]);
                        break;
                }
            }
        }

        // The last layer stores information about the spawn location of the player
        if (layer.name === LAYERS.spawns) {
            for (const spawn of layer.objects) {
                playerSpawn.push([spawn.x, spawn.y]);
            }
        }
    }

    return {
        map,
        playerSpawn,
        tileSpawns,
        coinSpawns,
        exitSpawn,
        scaffoldSpawns,
        waterTopSpawns,
        waterBottomSpawns,
    };
}

function scaleUp(number) {
    return number * SCALE;
}

function addScoreSection(globalState) {
    // We'll use magic values for the scoreboard, since this is a one time thing. So pardon me!

    k.add([
        k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.fireBall }),
        k.pos(20, 20),
        k.scale(SCALE - 1),
    ]);
    const fireBallCount = k.add([
        k.text(`${globalState.fireBalls}`, {
            font: FONTS.kitchenSink,
        }),
        k.pos(60, 26),
        k.scale(UI_SIZE.textScale),
    ]);

    k.add([
        k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.coin }),
        k.pos(140, 20),
        k.scale(SCALE - 1),
    ]);
    const coinCount = k.add([
        k.text(`${globalState.coinsCollected}`, {
            font: FONTS.kitchenSink,
        }),
        k.pos(175, 26),
        k.scale(UI_SIZE.textScale),
    ]);

    return { fireBallCount, coinCount };
}

export { makeMap, scaleUp, addScoreSection };
