import Phaser from "phaser";

export default class endScreen extends Phaser.Scene {
    constructor() {
        super({ key: "endScreen" });
    }
    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.add;

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight); // change when levels work
        const title = this.add.text(375, 350, "YOU WIN!", {
            fontFamily: "Arial Black",
            fontSize: "70px",
            color: "#ffffe0",
        });
        title.setStroke("#ffd700", 16);
        this.add.image(600, 100, "duck").setScale(0.5);
        this.add.image(700, 100, "duck").setScale(0.5);
        this.add.image(725, 200, "duck").setScale(0.5);
        this.add.image(525, 200, "duck").setScale(0.5);
        this.add.image(625, 200, "duck").setScale(0.5);
        this.add.image(825, 200, "duck").setScale(0.5);
    }
    update() {}
}
