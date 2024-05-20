import Phaser from "phaser";

export default class Tutorial extends Phaser.Scene {
    private score: number = 0;
    private scoreText?: Phaser.GameObjects.Text;
    private showSuccessPopup!: Phaser.GameObjects.Container;
    private showTryAgainPopup!: Phaser.GameObjects.Container;
    private currentStep: number = 0;
    private steps: Phaser.GameObjects.Text[] = [];

    constructor() {
        super({ key: "tutorial" });
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth = Number(width);
        const screenHeight = Number(height);

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight);

        const tutorialText = this.add.text(screenWidth / 2, 50, "Tutorial", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        tutorialText.setStroke("#ffd700", 16).setOrigin(0.5, 0);

        this.steps = [
            this.add.text(200, 100, "Step 1: Click on the START stone", {
                fontFamily: "Arial",
                fontSize: "24px",
                color: "#ffffe0",
                align: "left",
            }),
            this.add.text(
                515,
                140,
                "Step 2: Look at the END stone and determine which stones would make up the smallest path",
                {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    color: "#ffffe0",
                    align: "left",
                }
            ),
            this.add.text(
                360,
                180,
                "Step 3: Then, click the stones you think create the smallest path",
                {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    color: "#ffffe0",
                    align: "left",
                }
            ),
            this.add.text(
                540,
                220,
                "Step 4: If you notice you mess up before the end, click the RESTART button in the top right corner",
                {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    color: "#ffffe0",
                    align: "left",
                }
            ),
            this.add.text(
                280,
                260,
                "Step 5: If you get the path wrong, the level resets",
                {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    color: "#ffffe0",
                    align: "left",
                }
            ),
            this.add.text(
                370,
                300,
                "Step 6: If you get the path correct, you'll move on to the next level",
                {
                    fontFamily: "Arial",
                    fontSize: "24px",
                    color: "#ffffe0",
                    align: "left",
                }
            ),
        ];

        this.steps.forEach((step) => {
            step.setStroke("#ffd700", 16).setOrigin(0.5, 0).setVisible(false);
        });

        this.showNextStep();

        const restart = this.add.text(1240, 25, "Restart", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        restart.setStroke("#ffd700", 16);
        restart.setOrigin(1, 0).setInteractive();
        restart.on("pointerdown", () => {
            this.score = 0;
            this.scene.start("tutorial");
        });

        const backButton = this.add.text(
            screenWidth - 50,
            screenHeight - 50,
            "Back",
            {
                fontFamily: "Arial Black",
                fontSize: "30px",
                color: "#ffffe0",
            }
        );
        backButton.setStroke("#ffd700", 20).setOrigin(1).setInteractive();
        backButton.on("pointerdown", () => {
            this.sound.stopAll();
            this.scene.start("mainMenu");
        });

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
        let duck2 = this.add.image(1010, 320, "duck");

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
            [values[0] + values[3]],
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
            let shortestPath: number[] = paths[0];
            let shortestLength: number = getPathValue(paths[0]);

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
        //let tries = 0;

        const showSuccessPopup = () => {
            const { width, height } = this.sys.game.config;
            const screenWidth = Number(width);
            const screenHeight = Number(height);

            const bgRect = this.add
                .rectangle(
                    screenWidth / 2,
                    screenHeight / 2,
                    400,
                    200,
                    0x000000
                )
                .setAlpha(0.8);

            const successText = this.add
                .text(screenWidth / 2, screenHeight / 2 - 50, "You did it!", {
                    fontFamily: "Arial Black",
                    fontSize: "40px",
                    color: "#00ff00",
                })
                .setOrigin(0.5);

            const closeButton = this.add
                .text(screenWidth / 2, screenHeight / 2 + 50, "Close", {
                    fontFamily: "Arial",
                    fontSize: "30px",
                    color: "#ffffff",
                    backgroundColor: "#ff0000",
                    padding: { x: 10, y: 5 },
                })
                .setOrigin(0.5)
                .setInteractive();

            closeButton.on("pointerdown", () => {
                bgRect.destroy();
                successText.destroy();
                closeButton.destroy();
                this.showNextStep();
            });
        };

        const showTryAgainPopup = () => {
            const { width, height } = this.sys.game.config;
            const screenWidth = Number(width);
            const screenHeight = Number(height);

            const bgRect = this.add
                .rectangle(
                    screenWidth / 2,
                    screenHeight / 2,
                    400,
                    200,
                    0x000000
                )
                .setAlpha(0.8);
            const tryAgainText = this.add
                .text(screenWidth / 2, screenHeight / 2 - 50, "Try Again!", {
                    fontFamily: "Arial Black",
                    fontSize: "40px",
                    color: "#ff0000",
                })
                .setOrigin(0.5);

            const closeButton = this.add
                .text(screenWidth / 2, screenHeight / 2 + 50, "Close", {
                    fontFamily: "Arial",
                    fontSize: "30px",
                    color: "#ffffff",
                    backgroundColor: "#ff0000",
                    padding: { x: 10, y: 5 },
                })
                .setOrigin(0.5)
                .setInteractive();

            closeButton.on("pointerdown", () => {
                bgRect.destroy();
                tryAgainText.destroy();
                closeButton.destroy();
                this.showNextStep();
            });
        };

        let stone1 = this.add
            .image(500, 400, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .on("pointerdown", () => {
                this.showNextStep();
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
                this.showNextStep();
                this.showNextStep();
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
                this.showNextStep();
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
                    showSuccessPopup();
                } else {
                    showTryAgainPopup();
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
    }

    showNextStep() {
        if (this.currentStep < this.steps.length) {
            this.steps[this.currentStep].setVisible(true);
            this.currentStep++;
        }
    }
}
