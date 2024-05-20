import Phaser from "phaser";

export default class endScreen extends Phaser.Scene {
    private ducks: Phaser.GameObjects.Image[] = [];
    constructor() {
        super({ key: "endScreen" });
    }

    preload() {
        this.load.audio("end", ["assets/audio/winning.mp3"]);
    }
    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth = Number(width);
        const screenHeight = Number(height);

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight);

        const celebrationMusic = this.sound.add("end", {
            loop: true,
            volume: 0.5,
        });
        celebrationMusic.play();

        this.add
            .text(screenWidth / 2, 50, "Congratulations! You Won!", {
                fontFamily: "Arial Black",
                fontSize: "40px",
                color: "#ffffe0",
            })
            .setOrigin(0.5, 0)
            .setStroke("#ffd700", 16);

        for (let i = 0; i < 5; i++) {
            const duck = this.add
                .image(
                    Phaser.Math.Between(100, screenWidth - 100),
                    Phaser.Math.Between(100, screenHeight - 100),
                    "duck"
                )
                .setScale(0.6);
            this.ducks.push(duck);
            this.tweens.add({
                targets: duck,
                y: { value: "-=100", duration: 500, ease: "Power2" },
                yoyo: true,
                repeat: -1,
                delay: i * 100,
            });
        }

        const backButton = this.add
            .text(screenWidth - 50, screenHeight - 50, "Back to Menu", {
                fontFamily: "Arial Black",
                fontSize: "30px",
                color: "#ffffe0",
            })
            .setOrigin(1)
            .setStroke("#ffd700", 16)
            .setInteractive();

        backButton.on("pointerdown", () => {
            celebrationMusic.stop();
            this.scene.start("mainMenu");
        });
    }
    update() {}
}
