import { k } from "./kaboomContext";
import { SCALE, LAYERS, OBJECTS } from "./constants";

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

    return { map, playerSpawn, tileSpawns, coinSpawns, exitSpawn };
}

export { makeMap };
