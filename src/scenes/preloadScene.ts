import Phaser from "phaser";

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: "PreloadScene" });
    }

    preload() {
        this.load.image("duck ", "assets/duck.png");
        this.load.image("pond", "assets/pond.png");
        this.load.image("stone", "assets/pond.png");
    }

    create() {
        this.scene.start("mainMenu");
    }
}
