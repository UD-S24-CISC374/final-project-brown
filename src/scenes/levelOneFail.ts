import Phaser from "phaser";

export default class levelOnePass extends Phaser.Scene {
    constructor() {
        super({ key: "levelOneFail", active: false });
    }

    preload() {
        this.load.audio("fail", ["assets/audio/sadTrombone.mp3"]);
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);
        // Add a semi-transparent background rectangle to dim the game scene
        const background = this.add.rectangle(
            0,
            0,
            screenWidth,
            screenHeight,
            0x000000,
            0.5
        );
        background.setOrigin(0, 0);

        const popupText = this.add.text(
            screenWidth / 2,
            screenHeight / 2,
            "That wasn't the shortest path.",
            { fontSize: "32px", color: "#fff" }
        );
        popupText.setOrigin(0.5);
        this.add
            .text(
                screenWidth / 2,
                screenHeight / 2 + 30,
                "Remember to use Dijkstra's Algorithm to find the shortest path",
                { fontSize: "32px", color: "#fff" }
            )
            .setOrigin(0.5);

        const failSound = this.sound.add("fail");
        failSound.play();
        // make buttons to change to level two
        this.add.image(1000, 200, "duck").setScale(0.6);
        this.add.image(300, 200, "duck").setScale(0.6);

        const tryAgain = this.add
            .text(500, 500, "Try a different problem", {
                color: "#ffffff",
                fontSize: "32px",
                fixedWidth: 575,
                backgroundColor: "#87ceeb",
            })
            .setPadding(32)
            .setOrigin(0.2);

        tryAgain.setInteractive({ useHandCursor: true });

        console.log("attaching listener to button");
        tryAgain.on("pointerdown", () => {
            console.log("Button clicked!");
            this.scene.start("levelOne");
        });
    }
}
