import Phaser from "phaser";

export default class levelThree extends Phaser.Scene {
    //private stone?: Phaser.Physics.Arcade.StaticGroup;
    private score: number = 0;
    private scoreText?: Phaser.GameObjects.Text;
    //source: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    //target: Phaser.Math.Vector2;
    private isMuted: boolean = false;
    private muteButton!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: "levelThree" });
    }

    preload() {
        this.load.image("mute", "assets/img/mutebutton.png");
        this.load.image("unmute", "assets/img/unmutebutton.png");
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

        this.muteButton = this.add
            .image(1220, 50, "unmute")
            .setScale(0.15)
            .setInteractive();
        this.muteButton.on("pointerdown", this.toggleMute, this);

        this.add.image(50, 500, "duck").setScale(0.4);
        this.add.image(100, 400, "duck").setScale(0.4);

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
        // Add numbers
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
        this.add.text(330, 450, values[4].toString(), {
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
                    this.score += values[2];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 650) {
                    this.score += values[5];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 790) {
                    this.score += values[3];
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
                    this.score += values[1];
                    duck1.setX(stone2.x).setY(stone2.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone2.setScale(0.5))
            .on("pointerout", () => stone2.setScale(0.4));
        this.add.text(275, 435, "stone2");

        let stone3 = this.add
            .image(650, 600, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 740) {
                    duck1.setX(stone3.x).setY(stone3.y).setDepth(1);
                    this.score += values[8];
                }
                if (duck1.x == 400) {
                    this.score += values[7];
                    duck1.setX(stone3.x).setY(stone3.y).setDepth(1);
                }
                if (duck1.x == 500) {
                    this.score += values[5];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone3.setScale(0.5))
            .on("pointerout", () => stone3.setScale(0.4));

        this.add.text(650, 600, "stone3");

        let stone4 = this.add
            .image(740, 480, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 790) {
                    duck1.setX(stone4.x).setY(stone4.y).setDepth(1);
                    this.score += values[9];
                }
                if (duck1.x == 900) {
                    this.score += values[10];
                    duck1.setX(stone4.x).setY(stone4.y).setDepth(1);
                }
                if (duck1.x == 400) {
                    this.score += values[6];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 650) {
                    this.score += values[8];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone4.setScale(0.5))
            .on("pointerout", () => stone4.setScale(0.4));
        this.add.text(740, 480, "stone4");

        let stone5 = this.add
            .image(790, 375, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 500) {
                    duck1.setX(stone5.x).setY(stone5.y).setDepth(1);
                    this.score += values[3];
                }
                if (duck1.x == 400) {
                    this.score += values[4];
                    duck1.setX(stone5.x).setY(stone5.y).setDepth(1);
                }
                if (duck1.x == 740) {
                    this.score += values[9];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 900) {
                    this.score += values[12];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 850) {
                    this.score += values[11];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone5.setScale(0.5))
            .on("pointerout", () => stone5.setScale(0.4));
        this.add.text(790, 375, "stone5");

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
        this.add.text(400, 535, "stone6");

        let stone7 = this.add
            .image(900, 450, "stone")
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
            .on("pointerover", () => stone7.setScale(0.5))
            .on("pointerout", () => stone7.setScale(0.4));
        this.add.text(900, 450, "stone7");

        let stone8 = this.add
            .image(850, 575, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 275) {
                    duck1.setX(stone8.x).setY(stone8.y).setDepth(1);
                    this.score += 3;
                }
                if (duck1.x == 700) {
                    this.score += 3;
                    duck1.setX(stone8.x).setY(stone8.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone8.setScale(0.5))
            .on("pointerout", () => stone8.setScale(0.4));
        this.add.text(850, 575, "stone8");

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
                    this.score += 3;
                } else if (duck1.x == 700) {
                    this.score += 2;
                } else {
                    this.score += 1;
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

    update() {}
}
