import Phaser from "phaser";

export default class endScreen extends Phaser.Scene {
    constructor() {
        super({ key: "endScreen" });
    }
    create() {
        this.add.text(250, 250, "YOU WIN!");
    }
    update() {}
}
