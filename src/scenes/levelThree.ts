import Phaser from "phaser";

export default class levelThree extends Phaser.Scene {
    private stone?: Phaser.Physics.Arcade.StaticGroup;
    private score: number = 0;
    private scoreText?: Phaser.GameObjects.Text;
    source: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    target: Phaser.Math.Vector2;

    constructor() {
        super({ key: "levelThree" });
    }

    preload() {
        this.load.spritesheet("duck", "assets/img/duck.png", {
            frameWidth: 32,
            frameHeight: 48,
        });
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight)
            // change when levels work
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("levelThreePass");
            });

        const levelName = this.add.text(25, 25, "Level 3", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        levelName.setStroke("#ffd700", 16);

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

        // Add stones
        this.stone = this.physics.add.staticGroup();

        const stoneCoordinates = [
            { x: 500, y: 400 },
            { x: 275, y: 435 },
            { x: 650, y: 600 },
            { x: 740, y: 480 },
            { x: 790, y: 375 },
            { x: 400, y: 525 },
            { x: 900, y: 450 },
            { x: 850, y: 575 },
        ];

        stoneCoordinates.forEach((coord) => {
            this.stone!.create(coord.x, coord.y, "stone")
                .setScale(0.5, 0.4)
                .refreshBody();
        });

        this.stone!.getChildren().forEach((stone) => {
            const stoneImage = stone as Phaser.GameObjects.Image;
            const button = stoneImage.setInteractive();
            button.on("pointerdown", () => {
                // Stop the duck's movement
                this.source.body.setVelocity(0);
                this.source.body.reset(stoneImage.x, stoneImage.y);
            });
        });
        this.source = this.physics.add.image(100, 300, "duck").setScale(0.4);
        this.target = new Phaser.Math.Vector2();

        this.input.on("pointerdown", (pointer: { x: number; y: number }) => {
            this.target.x = pointer.x;
            this.target.y = pointer.y;

            this.physics.moveToObject(this.source, this.target, 400);
        });

        this.scoreText = this.add.text(25, 70, "Total Length: " + this.score, {
            fontFamily: "Arial Black",
            fontSize: "70px",
            color: "#ffffe0",
        });
        this.scoreText.setStroke("#ffd700", 16);
    }

    update() {
        const tolerance = 4;
        const distance = Phaser.Math.Distance.BetweenPoints(
            this.source,
            this.target
        );

        if (this.source.body.speed > 0) {
            //this.distanceText.setText(`Distance: ${distance}`);

            if (distance < tolerance) {
                this.source.body.reset(this.target.x, this.target.y);
            }
        }
    }
}
