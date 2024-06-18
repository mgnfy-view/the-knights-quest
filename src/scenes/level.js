import { k } from "../utils/kaboomContext";
import { end } from "./end";
import { addGameObjects, addScoreSection, makeMap } from "../utils/utilityFunctions";
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
async function level(globalState) {
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

    // Add the game objects to the level
    const { player } = addGameObjects({
        playerSpawn,
        tileSpawns,
        coinSpawns,
        exitSpawn,
        scaffoldSpawns,
        waterTopSpawns,
        waterBottomSpawns,
    });

    // Keep a track of the coins the knight grabbed in this level
    let coinsCollectedThisLevel = 0;

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

    k.onUpdate(() => {
        if (k.isKeyDown(KEYS.shift) && k.isKeyDown(KEYS.r)) {
            globalState.fireBalls = levels[globalState.level].fireBalls;
            globalState.coinsCollected -= coinsCollectedThisLevel;

            k.go(levels[globalState.level].name, globalState);
        }
    });

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

export { level };
