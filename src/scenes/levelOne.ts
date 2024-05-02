import Phaser from "phaser";

interface Edge {
    start: string;
    end: string;
    weight: number;
}
export default class levelOne extends Phaser.Scene {
    private stone?: Phaser.Physics.Arcade.StaticGroup;
    constructor() {
        super({ key: "levelOne" });
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
                this.scene.start("levelOnePass");
            });

        const levelName = this.add.text(25, 25, "Level 1", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        levelName.setStroke("#ffd700", 16);

        this.add.image(150, 500, "duck").setScale(0.4);
        this.add.image(950, 250, "duck").setScale(0.4);

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
        this.stone = this.physics.add.staticGroup();
        this.add.text(275, 500, "Start");
        const stone1 = this.stone.create(500, 400, "stone");
        const stone2 = this.stone.create(275, 500, "stone");
        const stone3 = this.stone.create(700, 600, "stone");
        const stone4 = this.stone.create(750, 450, "stone");
        this.add.text(220, 450, "Start");

        this.add.text(760, 490, "End");

        stone1.setScale(0.5, 0.4);
        stone2.setScale(0.5, 0.4);
        stone3.setScale(0.5, 0.4);
        stone4.setScale(0.5, 0.4);

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

        // dijkstras

        const vertices: string[] = ["stone1", "stone2", "stone3", "stone4"];
        const edges: Edge[] = [
            { start: "stone1", end: "stone2", weight: values[0] },
            { start: "stone1", end: "stone3", weight: values[1] },
            { start: "stone2", end: "stone4", weight: values[2] },
            { start: "stone2", end: "stone3", weight: values[3] },
            { start: "stone3", end: "stone4", weight: values[4] },
            // Add more edges as needed
        ];

        /* function getLocation{
            let x = duck.x;
            let y = duck.y;
        }
        */

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
        );
    }

    update() {}
}
