import Phaser from "phaser";
export default class levelFive extends Phaser.Scene {
    //private stone?: Phaser.Physics.Arcade.StaticGroup;
    //source: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    //target: Phaser.Math.Vector2;
    private score: number = 0;
    private scoreText?: Phaser.GameObjects.Text;
    private isMuted: boolean = false;
    private muteButton!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "levelFive" });
    }

    preload() {
        this.load.image("mute", "assets/img/mutebutton.png");
        this.load.image("unmute", "assets/img/unmutebutton.png");
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
                this.scene.start("levelFivePass");
            });

        const levelName = this.add.text(25, 25, "Level 5", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        levelName.setStroke("#ffd700", 16);

        const restart = this.add.text(1240, 25, "Restart", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        restart.setStroke("#ffd700", 16);
        restart.setOrigin(1, 0).setInteractive();
        restart.on("pointerdown", () => {
            this.score = 0;
            this.scene.start("levelFive");
        });

        this.muteButton = this.add
            .image(1150, 120, "unmute")
            .setScale(0.15)
            .setInteractive();
        this.muteButton.on("pointerdown", this.toggleMute, this);

        //this.add.image(150, 500, "duck").setScale(0.4);
        this.add.image(50, 500, "duck").setScale(0.4);
        this.add.image(80, 550, "duck").setScale(0.4);
        this.add.image(150, 550, "duck").setScale(0.4);
        this.add.image(950, 250, "duck").setScale(0.4);

        // connection lines
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0x000000);

        graphics.beginPath();
        graphics.moveTo(500, 400);
        graphics.lineTo(275, 435);
        graphics.lineTo(400, 525);
        graphics.lineTo(650, 600);
        graphics.lineTo(740, 480);
        graphics.lineTo(790, 375);
        graphics.lineTo(900, 450);
        graphics.lineTo(850, 575);
        graphics.lineTo(740, 480);
        graphics.lineTo(400, 525);
        graphics.lineTo(500, 400);
        graphics.lineTo(650, 600);
        graphics.lineTo(740, 480);
        graphics.lineTo(500, 400);
        graphics.lineTo(790, 375);

        graphics.strokePath();
        function generateValues(): number[] {
            const randomList: number[] = [];
            for (let i = 0; i < 15; i++) {
                const randomNumber =
                    Math.floor(Math.random() * (10 - 1 + 1)) + 1;
                randomList.push(randomNumber);
            }
            return randomList;
        }

        const values = generateValues();
        let paths: number[][] = [
            [values[0] + values[8] + values[9]],
            [values[0] + values[7] + values[2] + values[12] + values[11]],
            [values[0] + values[7] + values[2] + values[3] + values[9]],
            [values[0] + values[6] + values[10] + values[12] + values[11]],
            [
                values[0] +
                    values[6] +
                    values[1] +
                    values[2] +
                    values[3] +
                    values[9],
            ],
            [values[0] + values[4] + values[3] + values[9]],
            [values[0] + values[4] + values[12] + values[11]],
            [values[5] + values[1] + values[2] + values[3] + values[9]],
            [values[5] + values[1] + values[2] + values[12] + values[11]],
            [values[5] + values[6] + values[4] + values[3] + values[9]],
            [values[5] + values[6] + values[4] + values[12] + values[11]],
            [values[5] + values[10] + values[3] + values[9]],
            [values[5] + values[10] + values[12] + values[11]],
            [values[5] + values[6] + values[8] + values[9]],
        ];
        function getPathValue(path: number[]): number {
            let value: number = 0;
            for (let v of path) {
                value += v;
            }
            return value;
        }

        function shortestPath(paths: number[][]): {
            path: number[];
            value: number;
        } {
            let shortestPath: number[] = paths[0]; // Assume the first path is the shortest initially
            let shortestLength: number = getPathValue(paths[0]); // Get the value of the first path

            for (let path of paths) {
                let value: number = getPathValue(path);
                if (value < shortestLength) {
                    shortestPath = path;
                    shortestLength = value;
                }
            }

            return { path: shortestPath, value: shortestLength };
        }

        let correct = shortestPath(paths);

        console.log(values);
        this.add.text(387, 420, values[0].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(480, 535, values[1].toString(), {
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
        this.add.text(600, 428, values[4].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(335, 463, values[5].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(450, 462, values[6].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(576, 479, values[7].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(645, 387, values[8].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(845, 400, values[9].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(650, 487, values[10].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(875, 512, values[11].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        this.add.text(805, 512, values[12].toString(), {
            fontSize: "20px",
            color: "000000",
        });
        // add stones
        let duck1 = this.add.image(150, 500, "duck");
        let duck2 = this.add.image(950, 250, "duck");
        duck2
            .setScale(0.4)
            .setInteractive()
            .on("pointerdown", () => {
                if (duck1.x == 275) {
                    this.score += 0;
                    duck1
                        .setX(duck2.x + 10)
                        .setY(duck2.y + 10)
                        .setDepth(1);
                }
                if (duck1.x == 750) {
                    this.score += 0;
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
                if (duck1.x == 275) {
                    this.score = values[0];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 400) {
                    this.score += values[6];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 650) {
                    this.score += values[7];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 790) {
                    this.score += values[8];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 740) {
                    this.score += values[4];
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
                if (duck1.x == 500) {
                    duck1.setX(stone2.x).setY(stone2.y).setDepth(1);
                    this.score += values[0];
                }
                if (duck1.x == 400) {
                    this.score += values[5];
                    duck1.setX(stone2.x).setY(stone2.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone2.setScale(0.5))
            .on("pointerout", () => stone2.setScale(0.4));

        this.add.text(220, 450, "Start");

        let stone3 = this.add
            .image(650, 600, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 500) {
                    duck1.setX(stone3.x).setY(stone3.y).setDepth(1);
                    this.score += values[7];
                }
                if (duck1.x == 400) {
                    this.score += values[1];
                    duck1.setX(stone3.x).setY(stone3.y).setDepth(1);
                }
                if (duck1.x == 740) {
                    this.score += values[2];
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
                if (duck1.x == 500) {
                    duck1.setX(stone4.x).setY(stone4.y).setDepth(1);
                    this.score += values[4];
                }
                if (duck1.x == 650) {
                    this.score += values[2];
                    duck1.setX(stone4.x).setY(stone4.y).setDepth(1);
                }
                if (duck1.x == 790) {
                    this.score += values[3];
                    duck1.setX(stone4.x).setY(stone4.y).setDepth(1);
                }
                if (duck1.x == 850) {
                    this.score += values[12];
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
                if (duck1.x == 500) {
                    duck1.setX(stone5.x).setY(stone5.y).setDepth(1);
                    this.score += values[8];
                }
                if (duck1.x == 740) {
                    this.score += values[3];
                    duck1.setX(stone5.x).setY(stone5.y).setDepth(1);
                }
                if (duck1.x == 900) {
                    this.score += values[9];
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
                    this.score += values[5];
                }
                if (duck1.x == 500) {
                    this.score += values[6];
                    duck1.setX(stone6.x).setY(stone6.y).setDepth(1);
                }
                if (duck1.x == 740) {
                    this.score += values[10];
                    duck1.setX(stone6.x).setY(stone6.y).setDepth(1);
                }
                if (duck1.x == 650) {
                    this.score += values[1];
                    duck1.setX(stone6.x).setY(stone6.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone6.setScale(0.5))
            .on("pointerout", () => stone6.setScale(0.4));

        let stone7 = this.add
            .image(900, 450, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 790) {
                    duck1.setX(stone7.x).setY(stone7.y).setDepth(1);
                    this.score += values[9];
                }
                if (duck1.x == 850) {
                    this.score += values[11];
                    duck1.setX(stone7.x).setY(stone7.y).setDepth(1);
                }
                if (this.score === correct.value) {
                    this.scene.start("endScreen");
                } /*else if (tries < 3) {
                            this.score = 0;
                            this.add.text(225, 350, "Not Quite, Try Again", {
                                fontFamily: "Arial Black",
                                fontSize: "70px",
                                color: "#ffffe0",
                            });
                            tries++;
                        } 
                        */ else {
                    this.scene.start("levelFiveFail");
                    this.score = 0;
                }
            })
            .on("pointerover", () => stone7.setScale(0.5))
            .on("pointerout", () => stone7.setScale(0.4));

        this.add.text(900, 400, "END");

        let stone8 = this.add
            .image(850, 575, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 740) {
                    duck1.setX(stone8.x).setY(stone8.y).setDepth(1);
                    this.score += values[12];
                }
                if (duck1.x == 900) {
                    this.score += values[11];
                    duck1.setX(stone8.x).setY(stone8.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone8.setScale(0.5))
            .on("pointerout", () => stone8.setScale(0.4));

        const stones = [
            stone1,
            stone2,
            stone3,
            stone4,
            stone5,
            stone6,
            stone7,
            stone8,
        ];
        stones.forEach((stone) => {
            stone.setInteractive().on("pointerdown", () => {
                duck1.setPosition(stone.x, stone.y).setDepth(1);
                if (duck1.x == 275 || duck1.x == 750) {
                    this.score += 0;
                } else if (duck1.x == 700) {
                    this.score += 0;
                } else {
                    this.score += 0;
                }
                this.scoreText?.setText("Path Length: " + this.score);
            });
        });
        this.scoreText = this.add.text(25, 70, "Path Length: " + this.score, {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        this.scoreText.setStroke("#ffd700", 16);
    }

    toggleMute() {
        this.isMuted = !this.isMuted;

        if (this.isMuted) {
            this.sound.mute = true;
            this.muteButton.setTexture("mute");
        } else {
            this.sound.mute = false;
            this.muteButton.setTexture("unmute");
        }
    }
}
