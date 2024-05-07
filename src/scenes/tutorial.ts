import Phaser from "phaser";

export default class TutorialScene extends Phaser.Scene {
    private score: number = 0;
    private scoreText?: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "tutorial" });
    }

    preload() {
        this.load.image("pond", "assets/pond.png");
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight);

        const tutorialText = this.add.text(
            screenWidth / 2,
            screenHeight / 2,
            "Tutorial",
            { fontSize: "32px", color: "#fff" }
        );
        tutorialText.setOrigin(0.5);

        const closeButton = this.add
            .text(screenWidth / 2, screenHeight - 100, "Close", {
                color: "#ffffff",
                fontSize: "32px",
                fixedWidth: 100,
                backgroundColor: "#87ceeb",
            })
            .setPadding(16)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true });

        closeButton.on("pointerover", () => {
            closeButton.setBackgroundColor("#1e90ff");
        });

        closeButton.on("pointerout", () => {
            closeButton.setBackgroundColor("#87ceeb");
        });

        closeButton.on("pointerdown", () => {
            this.scene.start("mainMenu");
        });

        this.scoreText = this.add.text(25, 75, "Path Length: 0", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        this.scoreText.setStroke("#ffd700", 16);

        // connection lines
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0x000000);

        graphics.beginPath();
        graphics.moveTo(500, 400);
        graphics.lineTo(275, 500);
        graphics.lineTo(700, 600);
        graphics.lineTo(750, 450);
        graphics.lineTo(500, 400);
        graphics.lineTo(700, 600);
        graphics.strokePath();

        this.add.text(220, 450, "Start");
        this.add.text(760, 490, "End");
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
        function generateValues(): number[] {
            const randomList: number[] = [];
            for (let i = 0; i < 10; i++) {
                const randomNumber =
                    Math.floor(Math.random() * (10 - 1 + 1)) + 1;
                randomList.push(randomNumber);
            }
            return randomList;
        }
        const values = generateValues();

        let paths: number[][] = [
            [values[0] + values[4]],
            [values[1] + values[2]],
            [values[2] + values[4] + values[3]],
            [values[0] + values[4] + values[2]],
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

        // Helper function to calculate the value of a path

        let correct = shortestPath(paths);
        //let tries = 0;

        let stone1 = this.add
            .image(500, 400, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .on("pointerdown", () => {
                if (duck1.x == 700) {
                    this.score += values[4];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 750) {
                    this.score += values[3];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                if (duck1.x == 275) {
                    this.score += values[0];
                    duck1.setX(stone1.x).setY(stone1.y).setDepth(1);
                }
                this.scoreText?.setText("Path Length: " + this.score);
            })
            .on("pointerover", () => stone1.setScale(0.5))
            .on("pointerout", () => stone1.setScale(0.4));

        let stone2 = this.add
            .image(275, 500, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 500) {
                    duck1.setX(stone2.x).setY(stone2.y).setDepth(1);
                    this.score += values[0];
                }
                if (duck1.x == 700) {
                    this.score += values[1];
                    duck1.setX(stone2.x).setY(stone2.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone2.setScale(0.5))
            .on("pointerout", () => stone2.setScale(0.4));

        let stone3 = this.add
            .image(700, 600, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 275) {
                    duck1.setX(stone3.x).setY(stone3.y).setDepth(1);
                    this.score += values[1];
                }
                if (duck1.x == 750) {
                    this.score += values[2];
                    duck1.setX(stone3.x).setY(stone3.y).setDepth(1);
                }
                if (duck1.x == 500) {
                    this.score += values[4];
                    duck1.setX(stone3.x).setY(stone3.y).setDepth(1);
                }
            })
            .on("pointerover", () => stone3.setScale(0.5))
            .on("pointerout", () => stone3.setScale(0.4));

        let stone4 = this.add
            .image(750, 450, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .setDepth(0)
            .on("pointerdown", () => {
                if (duck1.x == 500) {
                    duck1.setX(stone4.x).setY(stone4.y).setDepth(1);
                    this.score += values[3];
                }
                if (duck1.x == 700) {
                    this.score += values[2];
                    duck1.setX(stone4.x).setY(stone4.y).setDepth(1);
                }
                if (this.score === correct.value) {
                    this.scene.start("levelOnePass");
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
                    this.score = 0;
                }
            })
            .on("pointerover", () => stone4.setScale(0.5))
            .on("pointerout", () => stone4.setScale(0.4));

        const stones = [stone1, stone2, stone3, stone4];
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

        //this.stone = this.physics.add.staticGroup();

        console.log(values);
        this.add.text(387, 450, values[0].toString(), {
            fontSize: "30px",
            color: "000000",
        });
        this.add.text(487, 550, values[1].toString(), {
            fontSize: "30px",
            color: "000000",
        });
        this.add.text(725, 525, values[2].toString(), {
            fontSize: "30px",
            color: "000000",
        });
        this.add.text(625, 435, values[3].toString(), {
            fontSize: "30px",
            color: "000000",
        });
        this.add.text(550, 450, values[4].toString(), {
            fontSize: "30px",
            color: "000000",
        });

        const startPopup = this.add.text(
            150,
            500,
            "Click on the start stone to begin",
            {
                fontSize: "20px",
                color: "#ffffff",
                backgroundColor: "#000000",
                padding: {
                    x: 10,
                    y: 5,
                },
            }
        );
        startPopup.setOrigin(0.5);
        startPopup.setDepth(1);

        const endPopup = this.add.text(
            950,
            250,
            "Click on the stone with the smallest number to reach the end stone",
            {
                fontSize: "20px",
                color: "#ffffff",
                backgroundColor: "#000000",
                padding: {
                    x: 10,
                    y: 5,
                },
            }
        );
        endPopup.setOrigin(0.5);
        endPopup.setDepth(1);

        this.input.on("pointerdown", () => {
            startPopup.destroy();
            endPopup.destroy();
        });
    }
}
