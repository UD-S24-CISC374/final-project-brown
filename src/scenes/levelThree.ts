import Phaser from "phaser";

export default class levelThree extends Phaser.Scene {
    private stone?: Phaser.Physics.Arcade.StaticGroup;
    private duck?: Phaser.Physics.Arcade.Sprite;
    private score: number = 0;
    private scoreText?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "levelThree" });
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight);

        const levelName = this.add.text(25, 25, "Level 3", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        levelName.setStroke("#ffd700", 16);

        this.duck = this.physics.add.sprite(150, 500, "duck").setScale(0.4);
        this.duck.setCollideWorldBounds(true);
        this.add.image(50, 500, "duck").setScale(0.4);
        this.add.image(75, 500, "duck").setScale(0.4);
        this.add.image(950, 250, "duck").setScale(0.4);

        // Add connection lines
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0x000000);

        const linePoints = [
            { x: 500, y: 400 },
            { x: 275, y: 435 },
            { x: 650, y: 600 },
            { x: 740, y: 480 },
            { x: 790, y: 375 },
            { x: 400, y: 525 },
            { x: 500, y: 400 },
            { x: 650, y: 600 },
            { x: 500, y: 400 },
            { x: 790, y: 375 },
            { x: 900, y: 450 },
            { x: 400, y: 525 },
            { x: 900, y: 450 },
            { x: 850, y: 575 },
            { x: 790, y: 375 },
        ];

        graphics.beginPath();
        graphics.moveTo(linePoints[0].x, linePoints[0].y);
        for (let i = 1; i < linePoints.length; i++) {
            graphics.lineTo(linePoints[i].x, linePoints[i].y);
        }
        graphics.strokePath();

        // Add stones and make them interactive
        this.stone = this.physics.add.staticGroup();
        const stonePositions = [
            { x: 500, y: 400 },
            { x: 275, y: 435 },
            { x: 650, y: 600 },
            { x: 740, y: 480 },
            { x: 790, y: 375 },
            { x: 400, y: 525 },
            { x: 900, y: 450 },
            { x: 850, y: 575 },
        ];

        stonePositions.forEach((position) => {
            const stone = this.stone!.create(
                position.x,
                position.y,
                "stone"
            ).setScale(0.5, 0.4);
            stone.setInteractive().on("pointerdown", () => {
                this.score += 1;
                this.moveDuckToStone(stone);
                this.scoreText?.setText("Score: " + this.score);
            });
        });

        this.scoreText = this.add.text(25, 70, "Score: " + this.score, {
            fontFamily: "Arial Black",
            fontSize: "70px",
            color: "#ffffe0",
        });
        this.scoreText.setStroke("#ffd700", 16);
    }

    moveDuckToStone(stone: Phaser.Physics.Arcade.Image) {
        this.duck?.setPosition(stone.x, stone.y);
    }
}
