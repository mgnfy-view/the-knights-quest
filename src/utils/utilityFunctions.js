import { k } from "./kaboomContext";
import {
    SCALE,
    LAYERS,
    OBJECTS,
    TAGS,
    ANIMATIONS,
    FONTS,
    UI_SIZE,
    WATER_OPACITY,
} from "./constants";

// Creates the map for a level and returns the map along with the spawn points for various
// game objects
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

// Scales the number passed in by the game's scaling factor
function scaleUp(number) {
    return number * SCALE;
}

// Adds the score section (which displays the fire ball and coin count) to the level
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

// Adds all the game objects (player, exit, coins, tiles, scaffolds, water elevators) to
// the leve;
function addGameObjects({
    playerSpawn,
    tileSpawns,
    coinSpawns,
    exitSpawn,
    scaffoldSpawns,
    waterTopSpawns,
    waterBottomSpawns,
}) {
    // Add the player to the level
    const player = k.add([
        k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.idleRight }),
        k.pos(scaleUp(playerSpawn[0][0]), scaleUp(playerSpawn[0][1])),
        k.area({
            // I used magic numbers here, I know it's a bad practice
            // But since it's used nowhere else, I think we can get away with that
            shape: new k.Rect(k.vec2(3, 1), 12, 15),
        }),
        k.body(),
        k.scale(SCALE),
        TAGS.player, // Add the "player" tag
    ]);

    // Add the tiles to the level
    for (const tileSpawn of tileSpawns) {
        k.add([
            k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.tile }),
            k.pos(scaleUp(tileSpawn[0]), scaleUp(tileSpawn[1])),
            k.area(),
            k.body(),
            k.scale(SCALE),
            TAGS.tile, // Add the "tile" tag
        ]);
    }

    // Now, add the coins to the level
    for (const coinSpawn of coinSpawns) {
        k.add([
            k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.coin }),
            k.pos(scaleUp(coinSpawn[0]), scaleUp(coinSpawn[1])),
            k.area({
                // Magic numbers once again, haha
                // We'll use magic numbers with k.Rect() only
                shape: new k.Rect(k.vec2(3, 3), 9, 12),
            }),
            k.scale(SCALE),
            TAGS.coin, // Add the "coin" tag
        ]);
    }

    // Add the exit to the level
    k.add([
        k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.exit }),
        k.pos(scaleUp(exitSpawn[0][0]), scaleUp(exitSpawn[0][1])),
        k.area(),
        k.body({ isStatic: true }),
        k.scale(SCALE),
        TAGS.exit, // Add the "exit" tag
    ]);

    // Add the scaffolds to the level
    for (const scaffoldSpawn of scaffoldSpawns) {
        k.add([
            k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.scaffold }),
            k.pos(scaleUp(scaffoldSpawn[0]), scaleUp(scaffoldSpawn[1])),
            k.area(),
            k.body({ isStatic: true }),
            k.scale(SCALE),
            TAGS.scaffold, // Add the "scaffold" tag
        ]);
    }

    // Add the water tops to the level
    for (const waterTopSpawn of waterTopSpawns) {
        k.add([
            k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.waterTop }),
            k.pos(scaleUp(waterTopSpawn[0]), scaleUp(waterTopSpawn[1])),
            k.area(),
            k.scale(SCALE),
            k.opacity(WATER_OPACITY),
            TAGS.waterTop, // Add the "water-top" tag
        ]);
    }

    // Add the water bottoms to the level
    for (const waterBottomSpawn of waterBottomSpawns) {
        k.add([
            k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.waterBottom }),
            k.pos(scaleUp(waterBottomSpawn[0]), scaleUp(waterBottomSpawn[1])),
            k.area(),
            k.scale(SCALE),
            k.opacity(WATER_OPACITY),
            TAGS.waterBottom, // Add the "water-bottom" tag
        ]);
    }

    return { player };
}

export { makeMap, scaleUp, addScoreSection, addGameObjects };
