import Phaser from "phaser";

export default class mainMenu extends Phaser.Scene {
    //private button?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "mainMenu" });
    }

    preload() {
        this.load.spritesheet("duck", "assets/duck.png", {
            frameWidth: 37,
            frameHeight: 45,
        });

        this.load.audio("theme", ["assets/audio/theme.mp3"]);
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        const music = this.sound.add("theme");
        music.play();

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight);

        //duck jumping animation
        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNumbers("duck"),
            frameRate: 20,
        });

        const sprite = this.add.sprite(450, 200, "duck");

        this.tweens.add({
            targets: sprite,
            x: 750,
            duration: 8800,
            ease: "Linear",
        });

        //this.add.image(600, 200, "duck");

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

        const tutorialButton = this.add
            .text(screenWidth / 2, screenHeight / 2 + 270, "How to Play", {
                color: "#ffffff",
                fontSize: "32px",
                fixedWidth: 240,
                backgroundColor: "#87ceeb",
            })
            .setPadding(16)
            .setOrigin(0.5);

        tutorialButton.setInteractive({ useHandCursor: true });

        tutorialButton.on("pointerover", () => {
            tutorialButton.setBackgroundColor("#1e90ff");
        });

        tutorialButton.on("pointerout", () => {
            tutorialButton.setBackgroundColor("#87ceeb");
        });

        tutorialButton.on("pointerdown", () => {
            this.createTutorialPopup();
        });
    }

    createTutorialPopup() {
        const screenWidth = this.scale.width;
        const screenHeight = this.scale.height;

        const bgRect = this.add.rectangle(
            screenWidth / 2,
            screenHeight / 2,
            700,
            500,
            0x000000
        );
        bgRect.setOrigin(0.5);
        bgRect.setAlpha(0.8);

        // Add the tutorial text
        const tutorialText = this.add.text(
            screenWidth / 2,
            screenHeight / 2,
            "1. Select the stone that says START \n 2. Click on the stones (nodes) to select the shortest \n path for the duck to cross the pond. \n 3. If the submitted path is correct, the duck will be reunited \n with a member of its family. \n 4. If you cannot find the shortest path, you'll \n be prompted to try again. \n ",
            {
                fontFamily: "Arial",
                fontSize: "24px",
                color: "#ffffff",
                align: "center",
            }
        );
        tutorialText.setOrigin(0.5);

        // Close button
        const closeButton = this.add.text(
            screenWidth / 2,
            screenHeight / 2 + 120,
            "Close",
            {
                color: "#ffffff",
                fontSize: "24px",
                backgroundColor: "#87ceeb",
                padding: { x: 16, y: 8 },
            }
        );
        closeButton.setOrigin(0.5);
        closeButton.setInteractive({ useHandCursor: true });

        closeButton.on("pointerdown", () => {
            // Remove the popup elements
            bgRect.destroy();
            tutorialText.destroy();
            closeButton.destroy();
        });
    }

    update() {}
}
