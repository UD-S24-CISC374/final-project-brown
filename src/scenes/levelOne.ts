import Phaser from "phaser";

export default class levelOne extends Phaser.Scene {
    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight);

        this.add.image(100, 100, "stone");
    }

    update() {}
}
