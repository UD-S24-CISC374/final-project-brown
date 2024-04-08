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

        this.add;

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight);

        this.add.image(600, 200, "duck");

        const title = this.add.text(225, 350, "CROSS THE POND", {
            fontFamily: "Arial Black",
            fontSize: "70px",
            color: "#ffffe0",
        });
        title.setStroke("#ffd700", 16);

        const button = this.add
            .text(500, 500, "Click Here to Start", {
                color: "#ffffff",
                fontSize: "32px",
                fixedWidth: 425,
                backgroundColor: "#87ceeb",
            })
            .setPadding(32)
            .setOrigin(0.2);

        button.setInteractive({ useHandCursor: true });

        button.on("pointerover", () => {
            button.setBackgroundColor("#1e90ff");
        });

        button.on("pointerout", () => {
            button.setBackgroundColor("#87ceeb");
        });

        console.log("attaching listener to button");
        button.on("pointerdown", () => {
            console.log("Button clicked!");
            this.scene.start("levelOne");
        });
    }

    update() {}
}
