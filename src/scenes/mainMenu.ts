import Phaser from "phaser";

export default class mainMenu extends Phaser.Scene {
    private button?: Phaser.GameObjects.Text;
    constructor() {
        super({ key: "mainMenu" });
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight);



        this.button = this.add
            .text(500, 450, "Click Here to Start", {
                color: "#0f000",
                fontSize: "32px",
                fixedWidth: 400,
            })
            .setInteractive();
    }

    update() {}
}
