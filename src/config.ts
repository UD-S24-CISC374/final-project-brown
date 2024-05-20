import Phaser from "phaser";
import levelOne from "./scenes/levelOne";
import levelOnePass from "./scenes/levelOnePass";
import levelTwo from "./scenes/levelTwo";
import levelTwoPass from "./scenes/levelTwoPass";
import levelThree from "./scenes/levelThree";
import levelThreePass from "./scenes/levelThreePass";
import levelFour from "./scenes/levelFour";
import levelFourPass from "./scenes/levelFourPass";
import levelFive from "./scenes/levelFive";
import endScreen from "./scenes/endScreen";
import mainMenu from "./scenes/mainMenu";
import PreloadScene from "./scenes/preloadScene";
import levelTwoFail from "./scenes/levelTwoFail";
import levelOneFail from "./scenes/levelOneFail";
import levelThreeFail from "./scenes/levelThreeFail";
import levelFourFail from "./scenes/levelFourFail";
import levelFiveFail from "./scenes/levelFiveFail";
import tutorial from "./scenes/tutorial";

const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;

export const CONFIG = {
    title: "My Untitled Phaser 3 Game",
    version: "0.0.1",
    type: Phaser.AUTO,
    backgroundColor: "#ffffff",
    scale: {
        parent: "phaser-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
    },
    scene: [
        PreloadScene,
        mainMenu,
        levelOne,
        levelTwo,
        levelThree,
        levelFour,
        levelFive,
        levelOnePass,
        levelTwoPass,
        levelThreePass,
        levelFourPass,
        endScreen,
        levelOneFail,
        levelTwoFail,
        levelThreeFail,
        levelFourFail,
        levelFiveFail,
        tutorial,
    ],
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
            gravity: { y: 300 },
        },
    },
    input: {
        keyboard: true,
        mouse: true,
        touch: true,
        gamepad: false,
    },
    render: {
        pixelArt: false,
        antialias: true,
    },
};
