import Phaser from "phaser";

/*interface Edge {
    start: string;
    end: string;
    weight: number;
}
*/
export default class levelOne extends Phaser.Scene {
    private score: number = 0;
    private scoreText?: Phaser.GameObjects.Text;
    private isMuted: boolean = false;
    private muteButton!: Phaser.GameObjects.Image;
    private stepStoneSound!: Phaser.Sound.BaseSound;

    constructor() {
        super({ key: "levelOne" });
    }

    preload() {
        this.load.image("mute", "assets/img/mutebutton.png");
        this.load.image("unmute", "assets/img/unmutebutton.png");
        this.load.audio("stepstone", ["assets/audio/stepstone.mp3"]);
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.stepStoneSound = this.sound.add("stepstone");

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight);

        const levelName = this.add.text(25, 25, "Level 1", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        levelName.setStroke("#ffd700", 16);

        this.scoreText = this.add.text(25, 75, "Path Length: 0", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        this.scoreText.setStroke("#ffd700", 16);

        this.muteButton = this.add
            .image(1150, 120, "unmute")
            .setScale(0.15)
            .setInteractive();
        this.muteButton.on("pointerdown", this.toggleMute, this);

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
        const restart = this.add.text(1240, 25, "Restart", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        restart.setStroke("#ffd700", 16);
        restart.setOrigin(1, 0).setInteractive();
        restart.on("pointerdown", () => {
            duck1.setX(150).setY(450).setDepth(1);
            this.score = 0;
            this.scoreText?.setText("Path Length: " + this.score);
        });

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

        let stone1 = this.add
            .image(500, 400, "stone")
            .setScale(0.5, 0.4)
            .setAngle(0)
            .setInteractive()
            .on("pointerdown", () => {
                this.playStepStoneSound();
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
                this.playStepStoneSound();
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
                this.playStepStoneSound();
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
                this.playStepStoneSound();
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
                } else {
                    this.scene.start("levelOneFail");
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

        /* dijkstras

        const vertices: string[] = ["stone1", "stone2", "stone3", "stone4"];
        const edges: Edge[] = [
            { start: "stone2", end: "stone4", weight: values[0] + values[4] },
            { start: "stone2", end: "stone4", weight: values[1] + values[2] },
            {
                start: "stone2",
                end: "stone4",
                weight: values[2] + values[4] + values[3],
            },
            {
                start: "stone2",
                end: "stone4",
                weight: values[0] + values[4] + values[2],
            },
            // Add more edges as needed
        ];

        // Dijkstra's algorithm function
        function dijkstra(
            graph: Record<string, Edge[]>,
            start: string
        ): Record<string, number> {
            const distances: Record<string, number> = {};
            const previous: Record<string, string | null> = {};
            const queue: string[] = [];
            for (let vertex of vertices) {
                distances[vertex] = Infinity;
                previous[vertex] = null;
                queue.push(vertex);
            }
            distances[start] = 0;

            while (queue.length) {
                queue.sort((a, b) => distances[a] - distances[b]);
                const smallest = queue.shift();

                if (!smallest) break;

                for (let neighbor of graph[smallest]) {
                    const alt = distances[smallest] + neighbor.weight;
                    if (alt < distances[neighbor.end]) {
                        distances[neighbor.end] = alt;
                        previous[neighbor.end] = smallest;
                    }
                }
            }
            return distances;
        }
        console.log(dijkstra);

        // Build adjacency list representation of the graph
        const adjacencyList: Record<string, Edge[]> = {};
        vertices.forEach((vertex) => {
            adjacencyList[vertex] = [];
        });
        edges.forEach((edge) => {
            adjacencyList[edge.start].push({
                start: edge.start,
                end: edge.end,
                weight: edge.weight,
            });
            adjacencyList[edge.end].push({
                start: edge.end,
                end: edge.start,
                weight: edge.weight,
            }); // For undirected graph
        });

        // Run Dijkstra's algorithm from a starting vertex
        const startVertex = "stone1"; // Choose your starting vertex
        const shortestDistances = dijkstra(adjacencyList, startVertex);
        console.log(
            "Shortest distances from vertex",
            startVertex + ":",
            shortestDistances
        );*/
    }

    private playStepStoneSound() {
        if (!this.isMuted) {
            this.stepStoneSound.play();
        }
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
