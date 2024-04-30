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

        // dijkstras algorithm
        /*const stonePaths = [
            [[275, 500], [500, 400], values[1]],
            [[500, 400], [700, 600], values[5]],
            [[700, 600], [750, 450], values[3]],
            [[500, 400], [750, 450], values[4]],
            [[275, 500], [700, 600], values[2]],

            // Add more paths as needed
        ];*/

        // Function to find the index of the stone with the smallest distance
        /*function dijkstra(start: number[]): Record<string, number> {
            const distances: Record<string, number> = {}; // Store distances from start node
            const visited: Record<string, boolean> = {}; // Track visited nodes

            // Initialize distances
            for (const path of stonePaths) {
                const [node1, node2, length] = path;
                distances[`${node1}`] = Infinity;
                distances[`${node2}`] = Infinity;
            }
            distances[`${start[0]},${start[1]}`] = 0; // Distance from start to start is 0

            // Helper function to get the node with the smallest distance
            function getClosestNode(): string | null {
                let minDistance = Infinity;
                let closestNode: string | null = null;
                for (const node in distances) {
                    if (!visited[node] && distances[node] < minDistance) {
                        minDistance = distances[node];
                        closestNode = node;
                    }
                }
                return closestNode;
            }

            // Main loop
           /* while (
                Object.keys(visited).length < Object.keys(distances).length
            ) {
                const currentNode = getClosestNode();
                if (currentNode === null) break; // No more reachable nodes
                visited[currentNode] = true;
                for (const path of stonePaths) {
                    const [node1, node2, length] = path;
                    if (
                        `${node1[0]},${node1[1]}` === currentNode ||
                        `${node2[0]},${node2[1]}` === currentNode
                    ) {
                        const neighbor =
                            `${node1[0]},${node1[1]}` === currentNode
                                ? `${node2[0]},${node2[1]}`
                                : `${node1[0]},${node1[1]}`;
                        const totalDistance = distances[currentNode] + length;
                        if (totalDistance < distances[neighbor]) {
                            distances[neighbor] = totalDistance;
                        }
                    }
                }
            }

            return distances;
        }

        // Usage
        const startNode = [275, 500]; // Choose a starting stone
        const shortestDistances = dijkstra(startNode);
        console.log(shortestDistances);
    */
    }

    update() {}
}
