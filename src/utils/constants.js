// Scaling factor
const SCALE = 3;

// Canvas dimensions
const CANVAS_WIDTH = 256;
const CANVAS_HEIGHT = 256;

// Canvas background color
const CANVAS_COLOR = [99, 155, 255];

// Gravity constant
const GRAVITY = 2100;

// Jump force for the player
const JUMP_FORCE = 480;

// Player's speed
const PLAYER_SPEED = 200;

// Tags for animations
const ANIMATIONS = {
    idleRight: "idleRight",
    idleLeft: "idleLeft",
    walkRight: "walkRight",
    walkLeft: "walkLeft",
    tile: "tile",
    fireBall: "fireBall",
    coin: "coin",
    exit: "exit",
};

// Tags for keyboard keys
const KEYS = {
    left: "left",
    right: "right",
    space: "space",
    x: "x",
};

const SOUNDS = {
    coinCollect: "coin-collect",
    jump: "jump",
    tileDestroy: "tile-destroy",
    fireBall: "fire-ball",
    backgroundMusic: "bg-music",
};

const VOLUME = {
    jump: 0.3,
    coinCollect: 1.5,
    tileDestroy: 1,
    fireBall: 0.6,
    backgroundMusic: 0.8,
};

// Tags for layers
const LAYERS = {
    platform: "platform",
    gameObjects: "game-objects",
    spawns: "spawns",
};

// Tags for game objects
const OBJECTS = {
    player: "player",
    tile: "tile",
    fireBall: "fire-ball",
    coin: "coin",
    exit: "exit",
    scaffold: "scaffold",
    playerSpawn: "player-spawn",
};

// Tags for other objects
const TAGS = {
    spriteSheet: "sprite-sheet",
    ...OBJECTS,
};

export {
    SCALE,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    CANVAS_COLOR,
    GRAVITY,
    JUMP_FORCE,
    PLAYER_SPEED,
    ANIMATIONS,
    KEYS,
    SOUNDS,
    VOLUME,
    LAYERS,
    OBJECTS,
    TAGS,
};
