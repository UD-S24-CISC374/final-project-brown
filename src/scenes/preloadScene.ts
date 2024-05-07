import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("duck", "assets/duck.png");
        this.load.image("pond", "assets/pond.png");
        this.load.image("stone", "assets/stone.png");
        this.load.image("mute", "assets/img/mutebutton.png");
        this.load.image("unmute", "assets/img/unmutebutton.png");
    }

    create() {
        this.scene.start("mainMenu");
    }
}
