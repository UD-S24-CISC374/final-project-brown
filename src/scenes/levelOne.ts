import Phaser from "phaser";

/*interface Edge {
    start: string;
    end: string;
    weight: number;
}
*/
export default class levelOne extends Phaser.Scene {
    //private stone?: Phaser.Physics.Arcade.StaticGroup;
    source: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
    target: Phaser.Math.Vector2;
    //private duck1!: Phaser.GameObjects.Container;
    private score: number = 0;
    private scoreText?: Phaser.GameObjects.Text;
    constructor() {
        super({ key: "levelOne" });
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
                this.scene.start("levelOnePass");
            });

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

        //this.add.image(150, 500, "duck").setScale(0.4);
        //this.add.image(950, 250, "duck").setScale(0.4);

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

        // add stones
        /*this.stone = this.physics.add.staticGroup();
        this.add.text(275, 500, "Start");
        const stone1 = this.stone.create(500, 400, "stone");
        const stone2 = this.stone.create(275, 500, "stone");
        const stone3 = this.stone.create(700, 600, "stone");
        const stone4 = this.stone.create(750, 450, "stone");
        */
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
        let tries = 0;

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
                        this.add.text(200, 200, "try another problem");
                        this.scene.start("levelOne");
                        this.score = 0;
                    }
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

    update() {}
}
