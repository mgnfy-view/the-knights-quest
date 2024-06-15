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

// The time for which the level info screen is displayed before entering the level
const LEVEL_ENTRY_DELAY = 1500; // in milliseconds

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
    scaffold: "scaffold",
    waterTop: "waterTop",
    waterBottom: "waterBottom",
};

// Tags for fonts
const FONTS = {
    kitchenSink: "kitchenSink",
    kitchenSinkInverted: "kitchenSinkInverted",
};

const UI_SIZE = {
    textScale: 0.6,
};

// Tags for keyboard keys
const KEYS = {
    left: "left",
    right: "right",
    space: "space",
    x: "x",
    enter: "enter",
    r: "r",
};

// Tags for sound effects
const SOUNDS = {
    coinCollect: "coin-collect",
    jump: "jump",
    tileDestroy: "tile-destroy",
    fireBall: "fire-ball",
    backgroundMusic: "bg-music",
};

// Different sounds have different volumes
// This is because when I donloaded them, some were very loud
// While others sounded pale
// This would be a better task for Audacity, but...
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
    platform: "platform",
    waterTop: "water-top",
    waterBottom: "water-bottom",
    playerSpawn: "player-spawn",
};

// Tags for other objects
const TAGS = {
    spriteSheet: "sprite-sheet",
    ...OBJECTS,
};

// Special scene tags
const MENU = "menu";
const LEVEL_START_TAG = "levelStart";
const END = "end";

export {
    SCALE,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    CANVAS_COLOR,
    GRAVITY,
    JUMP_FORCE,
    PLAYER_SPEED,
    LEVEL_ENTRY_DELAY,
    ANIMATIONS,
    FONTS,
    UI_SIZE,
    KEYS,
    SOUNDS,
    VOLUME,
    LAYERS,
    OBJECTS,
    TAGS,
    MENU,
    LEVEL_START_TAG,
    END,
};
