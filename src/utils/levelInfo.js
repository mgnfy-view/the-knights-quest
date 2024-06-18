// This is the data about all the levels, referenced by the global game state
// It stores the name of the level (which acts as the name of the scene),
// the number of coins available to grab in the level, and the number of fire balls
// you can use for that level
const levels = [
    { name: "level1", coins: 1, fireBalls: 0 },
    { name: "level2", coins: 1, fireBalls: 1 },
    { name: "level3", coins: 1, fireBalls: 3 },
    { name: "level4", coins: 1, fireBalls: 1 },
    { name: "level5", coins: 4, fireBalls: 5 },
    { name: "level6", coins: 1, fireBalls: 0 },
    { name: "level7", coins: 6, fireBalls: 0 },
    { name: "level8", coins: 2, fireBalls: 2 },
    { name: "level9", coins: 4, fireBalls: 2 },
];

export { levels };
