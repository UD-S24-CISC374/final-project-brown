import Phaser from "phaser";
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

        const stone1 = this.stone.create(500, 400, "stone");
        const stone2 = this.stone.create(275, 500, "stone");
        const stone3 = this.stone.create(700, 600, "stone");
        const stone4 = this.stone.create(750, 450, "stone");

        stone1.setScale(0.5, 0.4);
        stone2.setScale(0.5, 0.4);
        stone3.setScale(0.5, 0.4);
        stone4.setScale(0.5, 0.4);

        function generateValues(): number[] {
            const randomList: number[] = [];
            for (let i = 0; i < 10; i++) {
                const randomNumber =
                    Math.floor(Math.random() * (20 - 1 + 1)) + 1;
                randomList.push(randomNumber);
            }
            return randomList;
        }
        const values = generateValues();
        console.log(values);
        this.add.text(387, 450, values[0].toString());
        this.add.text(487, 550, values[1].toString());
        this.add.text(725, 525, values[2].toString());
        this.add.text(625, 435, values[3].toString());
        this.add.text(550, 450, values[4].toString());

        // dijkstras algorithm
        /*const stonePlacement = [
            { x: 500, y: 400 },
            { x: 275, y: 500 }, //source stone
            { x: 700, y: 600 },
            { x: 750, y: 450 }, //target stone
        ];
*/
        const edges = [
            [0, values[1], values[5], values[5]],
            [values[1], 0, values[2], 0],
            [values[5], values[2], 0, values[4]],
            [values[4], 0, values[3], 0],
        ];
        // taken from chat gpt
        // Function to find the index of the stone with the smallest distance
        function findMinDistance(
            distances: number[],
            visited: boolean[]
        ): number {
            let minDistance = Number.POSITIVE_INFINITY;
            let minIndex = -1;
            for (let i = 0; i < distances.length; i++) {
                if (!visited[i] && distances[i] < minDistance) {
                    minDistance = distances[i];
                    minIndex = i;
                }
            }
            return minIndex;
        }

        // Dijkstra's algorithm implementation
        function dijkstra(
            edges: number[][],
            source: number
            //target: numbeR
        ): number[] {
            const n = edges.length;
            const distances: number[] = Array(n).fill(Number.POSITIVE_INFINITY);
            const visited: boolean[] = Array(n).fill(false);

            distances[source] = 0;

            for (let i = 0; i < n - 1; i++) {
                const u = findMinDistance(distances, visited);
                visited[u] = true;

                for (let v = 0; v < n; v++) {
                    if (
                        !visited[v] &&
                        edges[u][v] !== 0 &&
                        distances[u] + edges[u][v] < distances[v]
                    ) {
                        distances[v] = distances[u] + edges[u][v];
                    }
                }
            }

            return distances;
        }

        // Example usage

        const sourceStone = 0; // Index of the source stone in the graph
        const targetStone = 3; // Index of the target stone in the graph

        const distances = dijkstra(edges, sourceStone, targetStone);
        console.log("Shortest distances from source stone:", distances);
        console.log(
            "Shortest distance to target stone:",
            distances[targetStone]
        );
    }

    update() {}
}
