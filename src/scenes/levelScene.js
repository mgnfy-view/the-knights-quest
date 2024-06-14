import { k } from "../utils/kaboomContext";
import { makeMap } from "../utils/utilityFunctions";
import { levels } from "../utils/levelInfo";
import {
    SCALE,
    JUMP_FORCE,
    OBJECTS,
    TAGS,
    PLAYER_SPEED,
    ANIMATIONS,
    KEYS,
    CANVAS_HEIGHT,
    SOUNDS,
    VOLUME,
} from "../utils/constants";

// The level scene is used to create new levels
// The global state should contain a level number (starting from 0), the number of bullets
// and scaffolds available in this level, and the number of coins collected so far
async function levelScene(globalState) {
    // Load the map for the level
    k.loadSprite(levels[globalState.level].name, `./maps/${levels[globalState.level].name}.png`);

    // Create the map for the level using the png image
    const {
        map: level,
        playerSpawn,
        tileSpawns,
        coinSpawns,
        exitSpawn,
    } = await makeMap(levels[globalState.level].name);

    // Add the map to the level
    k.add(level);

    // Add the player to the level
    const player = k.add([
        k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.idleRight }),
        k.pos(playerSpawn[0][0] * SCALE, playerSpawn[0][1] * SCALE),
        k.area(),
        k.body(),
        k.scale(SCALE),
        TAGS.player, // Add the "player" tag
    ]);

    // Add the tiles to the level
    for (const tileSpawn of tileSpawns) {
        k.add([
            k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.tile }),
            k.pos(tileSpawn[0] * SCALE, tileSpawn[1] * SCALE),
            k.area(),
            k.body(),
            k.scale(SCALE),
            TAGS.tile, // Add the "tile" tag
        ]);
    }

    // Now, add the coins to the level
    let coinsCollectedThisLevel = 0;
    for (const coinSpawn of coinSpawns) {
        k.add([
            k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.coin }),
            k.pos(coinSpawn[0] * SCALE, coinSpawn[1] * SCALE),
            k.area({
                shape: new k.Rect(k.vec2(1 * SCALE, 1 * SCALE), 3 * SCALE, 4 * SCALE),
            }),
            k.scale(SCALE),
            TAGS.coin, // Add the "coin" tag
        ]);
    }

    // Add the exit to the level
    k.add([
        k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.exit }),
        k.pos(exitSpawn[0][0] * SCALE, exitSpawn[0][1] * SCALE),
        k.area(),
        k.body({ isStatic: true }),
        k.scale(SCALE),
        TAGS.exit, // Add the "exit" tag
    ]);

    // Register controls

    // If a left or right arrow key is held down, move left or right respectively
    k.onKeyDown((key) => {
        switch (key) {
            case KEYS.right:
                player.move(PLAYER_SPEED, 0);
                break;
            case KEYS.left:
                player.move(-PLAYER_SPEED, 0);
                break;
        }
    });

    // We need to change the player's animation to walking once the left
    // or right arrow key is pressed
    // If "space" is pressed, jump
    // If "x" is pressed, shoot a fire ball
    // The fire ball supply is predetermined for each level
    k.onKeyPress((key) => {
        switch (key) {
            case KEYS.right:
                player.play(ANIMATIONS.walkRight);
                break;
            case KEYS.left:
                player.play(ANIMATIONS.walkLeft);
                break;
            case KEYS.space:
                if (player.isGrounded()) {
                    k.play(SOUNDS.jump, {
                        volume: VOLUME.jump,
                    });
                    player.jump(JUMP_FORCE);
                }
                break;
            case KEYS.x:
                if (globalState.fireBalls) {
                    k.play(SOUNDS.fireBall, {
                        volume: VOLUME.fireBall,
                    });
                    const direction = ["idleRight", "walkRight"].includes(player.curAnim())
                        ? 1
                        : -1;
                    if (direction === -1) {
                        const fireBall = k.add([
                            k.sprite(TAGS.spriteSheet, { anim: "fireBall" }),
                            k.area({
                                shape: new k.Rect(
                                    k.vec2(-2 * SCALE, 2 * SCALE),
                                    3 * SCALE,
                                    1 * SCALE,
                                ),
                            }),
                            k.pos(player.pos.x + 32, player.pos.y + 8),
                            k.anchor("topright"),
                            k.scale(SCALE),
                            k.offscreen({ destroy: true }),
                            {
                                direction,
                            },
                            OBJECTS.fireBall,
                        ]);
                        fireBall.flipX = true;
                    } else
                        k.add([
                            k.sprite(TAGS.spriteSheet, { anim: "fireBall" }),
                            k.area({
                                shape: new k.Rect(
                                    k.vec2(2 * SCALE, 2 * SCALE),
                                    3 * SCALE,
                                    1 * SCALE,
                                ),
                            }),
                            k.pos(player.pos.x + 32, player.pos.y + 8),
                            k.scale(SCALE),
                            k.offscreen({ destroy: true }),
                            {
                                direction,
                            },
                            OBJECTS.fireBall,
                        ]);
                    --globalState.fireBalls;
                }
                break;
        }
    });

    // Once the left or right arrow key is released, we need to display the player idle animation
    k.onKeyRelease((key) => {
        switch (key) {
            case KEYS.right:
                player.play(ANIMATIONS.idleRight);
                break;
            case KEYS.left:
                player.play(ANIMATIONS.idleLeft);
                break;
        }
    });

    // Collision detection

    // To allow tiles to fall in gravity after being touched by the player,
    // we'll turn them to non-static bodies after collision
    player.onCollideEnd(OBJECTS.tile, (tile) => {
        tile.isStatic = false;
    });

    // Grab a coin
    player.onCollide(OBJECTS.coin, (coin) => {
        k.play(SOUNDS.coinCollect, {
            volume: VOLUME.coinCollect,
        });
        k.destroy(coin);
        ++globalState.coinsCollected;
        ++coinsCollectedThisLevel;
    });

    // Destroy a tile if the fire ball collides with it
    k.onCollide(OBJECTS.fireBall, OBJECTS.tile, (fireBall, tile) => {
        k.play(SOUNDS.tileDestroy, {
            volume: VOLUME.tileDestroy,
        });
        k.destroy(fireBall);
        k.destroy(tile);
    });

    // Move to the next level using the exit
    player.onCollide(TAGS.exit, () => {
        if (globalState.level + 1 >= levels.length) k.go("end");
        else {
            ++globalState.level;
            k.scene(levels[globalState.level].name, levelScene);
            k.go(levels[globalState.level].name, {
                level: globalState.level,
                coinsCollected: globalState.coinsCollected,
                fireBalls: levels[globalState.level].fireBalls,
            });
        }
    });

    // Once a fire ball is spawned, keep moving it until it goes offscreen
    k.onUpdate(OBJECTS.fireBall, (fireBall) => {
        fireBall.move(PLAYER_SPEED * fireBall.direction, 0);
    });

    player.onUpdate(() => {
        if (player.pos.y > CANVAS_HEIGHT * SCALE) {
            globalState.fireBalls = levels[globalState.level].fireBalls;
            globalState.coinsCollected -= coinsCollectedThisLevel;
            k.go(levels[globalState.level].name, globalState);
        }
    });

    player.onBeforePhysicsResolve(({ source, target }) => {
        if (source.is(TAGS.player) && target.is(TAGS.tile)) target.isStatic = true;
    });
}

export { levelScene };
