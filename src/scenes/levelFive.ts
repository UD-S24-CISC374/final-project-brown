import Phaser from "phaser";

export default class levelFive extends Phaser.Scene {
    private stone?: Phaser.Physics.Arcade.StaticGroup;
    source: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    target: Phaser.Math.Vector2;

    constructor() {
        super({ key: "levelFive" });
    }
    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.add;

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight) // change when levels work
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("endScreen");
            });

        const levelName = this.add.text(25, 25, "Level 5", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        levelName.setStroke("#ffd700", 16);

        this.add.image(150, 500, "duck").setScale(0.4);
        this.add.image(50, 500, "duck").setScale(0.4);
        this.add.image(75, 550, "duck").setScale(0.4);
        this.add.image(100, 550, "duck").setScale(0.4);
        this.add.image(950, 250, "duck").setScale(0.4);

        // connection lines
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0x000000);

        graphics.beginPath();
        graphics.moveTo(500, 400);
        graphics.lineTo(275, 435);
        graphics.lineTo(650, 600);
        graphics.lineTo(740, 480);
        graphics.lineTo(790, 375);
        graphics.lineTo(400, 525);
        graphics.lineTo(500, 400);
        graphics.lineTo(650, 600);
        graphics.lineTo(500, 400);
        graphics.lineTo(790, 375);
        graphics.lineTo(900, 450);
        graphics.lineTo(400, 525);
        graphics.lineTo(900, 450);
        graphics.lineTo(850, 575);
        graphics.lineTo(790, 375);

        graphics.strokePath();
        function generateValues(): number[] {
            const randomList: number[] = [];
            for (let i = 0; i < 15; i++) {
                const randomNumber =
                    Math.floor(Math.random() * (20 - 1 + 1)) + 1;
                randomList.push(randomNumber);
            }
            return randomList;
        }

        const values = generateValues();
        console.log(values);
        this.add.text(387, 420, values[0].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(462, 520, values[1].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(695, 540, values[2].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(765, 427, values[3].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(595, 450, values[4].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(595, 450, values[5].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(450, 462, values[4].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(575, 500, values[6].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(645, 387, values[7].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(845, 412, values[8].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(650, 487, values[9].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(875, 512, values[10].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(820, 475, values[11].toString(), {
            fontSize: "20px",
            color: "000000",
        });
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
