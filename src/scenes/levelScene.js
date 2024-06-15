import { k } from "../utils/kaboomContext";
import { end } from "./end";
import { addScoreSection, makeMap, scaleUp } from "../utils/utilityFunctions";
import { levels } from "../utils/levelInfo";
import {
    SCALE,
    JUMP_FORCE,
    OBJECTS,
    TAGS,
    PLAYER_SPEED,
    ANIMATIONS,
    KEYS,
    SOUNDS,
    VOLUME,
    LEVEL_START_TAG,
    END,
} from "../utils/constants";

// The level scene is used to create new levels
// The global state should contain a level number (starting from 0), the number of bullets
// available in this level, and the number of coins collected so far
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
        scaffoldSpawns,
        waterTopSpawns,
        waterBottomSpawns,
    } = await makeMap(levels[globalState.level].name);

    // Add the map to the level
    k.add(level);

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
    let coinsCollectedThisLevel = 0;
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
            k.opacity(0.7),
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
            k.opacity(0.7),
            TAGS.waterBottom, // Add the "water-bottom" tag
        ]);
    }

    // Display the number of fire balls left, and the coins collected so far
    const { fireBallCount, coinCount } = addScoreSection(globalState);

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

                    const rightFacingAnimation = [ANIMATIONS.idleRight, ANIMATIONS.walkRight];
                    const direction = rightFacingAnimation.includes(player.curAnim()) ? 1 : -1;

                    if (direction === -1) {
                        const fireBall = k.add([
                            k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.fireBall }),
                            k.area({
                                // Noooo! Magic values once again!
                                shape: new k.Rect(k.vec2(-6, 6), 9, 3),
                            }),
                            k.pos(player.pos.x + 32, player.pos.y + 8),
                            k.anchor("topright"),
                            k.scale(SCALE),
                            k.offscreen({ destroy: true }),
                            {
                                direction,
                            },
                            TAGS.fireBall, // Add the "fireBall" tag
                        ]);
                        fireBall.flipX = true;
                    } else
                        k.add([
                            k.sprite(TAGS.spriteSheet, { anim: ANIMATIONS.fireBall }),
                            k.area({
                                // AAaaah!!!
                                shape: new k.Rect(k.vec2(6, 6), 9, 3),
                            }),
                            k.pos(player.pos.x + 32, player.pos.y + 8),
                            k.scale(SCALE),
                            k.offscreen({ destroy: true }),
                            {
                                direction,
                            },
                            TAGS.fireBall, // Add the "fireBall" tag
                        ]);

                    --globalState.fireBalls;
                    fireBallCount.text = `${globalState.fireBalls}`;
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

    // Grab a coin
    player.onCollide(OBJECTS.coin, (coin) => {
        k.play(SOUNDS.coinCollect, {
            volume: VOLUME.coinCollect,
        });
        k.destroy(coin);

        ++globalState.coinsCollected;
        ++coinsCollectedThisLevel;
        coinCount.text = `${globalState.coinsCollected}`;
    });

    // To allow tiles to fall in gravity after being touched by the player,
    // we'll turn them to non-static bodies after collision
    player.onCollideEnd(OBJECTS.tile, (tile) => {
        tile.isStatic = false;
    });

    // Move to the next level using the exit
    player.onCollide(TAGS.exit, () => {
        ++globalState.level;

        if (globalState.level >= levels.length) {
            k.scene(END, end);
            k.go(END, globalState);
        } else {
            // k.scene(LEVEL_START_TAG, levelStart);
            k.go(LEVEL_START_TAG, {
                level: globalState.level,
                coinsCollected: globalState.coinsCollected,
                fireBalls: levels[globalState.level].fireBalls,
            });
        }
    });

    // Jump continuously while in the water elevator
    // This gives a nice wobbly effect while going up

    player.onCollide(TAGS.waterTop, () => {
        player.jump(JUMP_FORCE);
    });

    player.onCollide(TAGS.waterBottom, () => {
        player.jump(JUMP_FORCE);
    });

    // If the player goes offscreen, restart the level
    player.onUpdate(() => {
        if (player.pos.y > k.height() + 100) {
            globalState.fireBalls = levels[globalState.level].fireBalls;
            globalState.coinsCollected -= coinsCollectedThisLevel;

            k.go(levels[globalState.level].name, globalState);
        }
    });

    // Make tiles static before collision
    // This is to avoid displacing the tiles
    player.onBeforePhysicsResolve(({ target }) => {
        if (target.is(TAGS.tile)) target.isStatic = true;
    });

    // Destroy a tile if the fire ball collides with it
    k.onCollide(OBJECTS.fireBall, OBJECTS.tile, (fireBall, tile) => {
        k.play(SOUNDS.tileDestroy, {
            volume: VOLUME.tileDestroy,
        });
        k.destroy(fireBall);
        k.destroy(tile);
    });

    // Destroy a scaffold if it is hit by a fire ball
    k.onCollide(OBJECTS.fireBall, OBJECTS.scaffold, (fireBall, scaffold) => {
        k.play(SOUNDS.tileDestroy, {
            volume: VOLUME.tileDestroy,
        });
        k.destroy(fireBall);
        k.destroy(scaffold);
    });

    // Once a fire ball is spawned, keep moving it until it goes offscreen
    k.onUpdate(OBJECTS.fireBall, (fireBall) => {
        fireBall.move(PLAYER_SPEED * fireBall.direction, 0);
    });
}

export { levelScene };
