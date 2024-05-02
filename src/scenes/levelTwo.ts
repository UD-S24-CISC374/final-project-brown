import Phaser from "phaser";
export default class levelTwo extends Phaser.Scene {
    private stone?: Phaser.Physics.Arcade.StaticGroup;
    //source: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    //target: Phaser.Math.Vector2;
    private score: number = 0;
    private scoreText?: Phaser.GameObjects.Text;
    constructor() {
        super({ key: "levelTwo" });
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.add;

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight)
            // change when levels work
            .setInteractive()
            .on("pointerdown", () => {
                this.scene.start("levelTwoPass");
            });

        const levelName = this.add.text(25, 25, "Level 2", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        levelName.setStroke("#ffd700", 16);

        this.add.image(150, 500, "duck").setScale(0.4);
        this.add.image(50, 500, "duck").setScale(0.4);
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

        graphics.strokePath();

        // add stones
        //this.stone = this.physics.add.staticGroup();
        let duck1 = this.add.image(150, 500, "duck");
        let duck2 = this.add.image(950, 250, "duck");
        duck2
            .setScale(0.4)
            .setInteractive()
            .on("pointerdown", () => {
                if (duck1.x == 275) {
                    this.score += 1;
                    duck1
                        .setX(duck2.x + 10)
                        .setY(duck2.y + 10)
                        .setDepth(1);
                }
                if (duck1.x == 750) {
                    this.score += 2;
                    duck1
                        .setX(duck2.x + 10)
                        .setY(duck2.y + 10)
                        .setDepth(1);
                }
                this.scoreText?.setText("Path Length" + this.score);
                //if (this.score > 3) {

                //}
            });
        duck1.setScale(0.4);

        let stone1 = this.add
            .image(500, 400, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .on("pointerdown", () => {
                if (duck1.x == 700) {
                    this.score = +2;
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 750) {
                    this.score += 3;
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                this.scoreText?.setText("Path Length: " + this.score);
            })
            .on("pointerover", () => stone1.setScale(0.5))
            .on("pointerout", () => stone1.setScale(0.4));

        let stone2 = this.add
            .image(275, 435, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 700) {
                    duck1.setX(stone2.x).setY(stone2.y).setDepth(1);
                    this.score += 3;
                }
                if (duck1.x == 750) {
                    this.score += 3;
                    duck1.setX(stone2.x).setY(stone2.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone2.setScale(0.5))
            .on("pointerout", () => stone2.setScale(0.4));

        let stone3 = this.add
            .image(650, 600, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 275) {
                    duck1.setX(stone3.x).setY(stone3.y).setDepth(1);
                    this.score += 3;
                }
                if (duck1.x == 750) {
                    this.score += 3;
                    duck1.setX(stone3.x).setY(stone3.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone3.setScale(0.5))
            .on("pointerout", () => stone3.setScale(0.4));

        let stone4 = this.add
            .image(740, 480, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 275) {
                    duck1.setX(stone4.x).setY(stone4.y).setDepth(1);
                    this.score += 3;
                }
                if (duck1.x == 700) {
                    this.score += 3;
                    duck1.setX(stone4.x).setY(stone4.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone4.setScale(0.5))
            .on("pointerout", () => stone4.setScale(0.4));

        let stone5 = this.add
            .image(790, 375, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 275) {
                    duck1.setX(stone5.x).setY(stone5.y).setDepth(1);
                    this.score += 3;
                }
                if (duck1.x == 700) {
                    this.score += 3;
                    duck1.setX(stone5.x).setY(stone5.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone5.setScale(0.5))
            .on("pointerout", () => stone5.setScale(0.4));

        let stone6 = this.add
            .image(400, 525, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 275) {
                    duck1.setX(stone6.x).setY(stone6.y).setDepth(1);
                    this.score += 3;
                }
                if (duck1.x == 700) {
                    this.score += 3;
                    duck1.setX(stone6.x).setY(stone6.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone6.setScale(0.5))
            .on("pointerout", () => stone6.setScale(0.4));

        const stones = [stone1, stone2, stone3, stone4, stone5, stone6];
        stones.forEach((stone) => {
            stone.setInteractive().on("pointerdown", () => {
                duck1.setPosition(stone.x, stone.y).setDepth(1);
                if (duck1.x == 275 || duck1.x == 750) {
                    this.score += 3;
                } else if (duck1.x == 700) {
                    this.score += 2;
                } else {
                    this.score += 1;
                }
                this.scoreText?.setText("Path Length: " + this.score);
            });
        });

        /*const stoneCoordinates = [
            { x: 500, y: 400 },
            { x: 275, y: 435 },
            { x: 650, y: 600 },
            { x: 740, y: 480 },
            { x: 790, y: 375 },
            { x: 400, y: 525 },
        ]; */

        function generateValues(): number[] {
            const randomList: number[] = [];
            for (let i = 0; i < 20; i++) {
                const randomNumber =
                    Math.floor(Math.random() * (10 - 1 + 1)) + 1;
                randomList.push(randomNumber);
            }
            return randomList;
        }
        const values = generateValues();

        console.log(values);
        this.add.text(387, 417, values[0].toString());
        this.add.text(350, 470, values[1].toString());
        this.add.text(529, 540, values[2].toString());
        this.add.text(765, 427, values[3].toString());
        this.add.text(595, 450, values[4].toString());
        this.add.text(450, 462, values[5].toString());
        this.add.text(575, 500, values[6].toString());
        this.add.text(695, 540, values[7].toString());
        this.add.text(635, 385, values[8].toString());
    }

    update() {
        // const tolerance = 4;
        // const distance = Phaser.Math.Distance.BetweenPoints(
        //     this.source,
        //     this.target
        // );
        // if (this.source.body.speed > 0) {
        //     //this.distanceText.setText(`Distance: ${distance}`);
        //     if (distance < tolerance) {
        //         this.source.body.reset(this.target.x, this.target.y);
        //     }
        // }
    }
}
