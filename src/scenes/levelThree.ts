import Phaser from "phaser";
export default class levelThree extends Phaser.Scene {
    private stone?: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super({ key: "levelThree" });
    }

    create() {
        const { width, height } = this.sys.game.config;
        const screenWidth: number = Number(width);
        const screenHeight: number = Number(height);

        this.add;

        this.add
            .image(screenWidth / 2, screenHeight / 2, "pond")
            .setDisplaySize(screenWidth, screenHeight);

        const levelName = this.add.text(25, 25, "Level 3", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        levelName.setStroke("#ffd700", 16);

        this.add.image(150, 500, "duck").setScale(0.4);
        this.add.image(50, 500, "duck").setScale(0.4);
        this.add.image(75, 550, "duck").setScale(0.4);
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
        const stone5 = this.stone.create(500, 400, "stone");
        const stone6 = this.stone.create(500, 400, "stone");
        const stone7 = this.stone.create(500, 400, "stone");
        const stone8 = this.stone.create(500, 400, "stone");

        stone1.setScale(0.5, 0.4);
        stone2.setScale(0.5, 0.4);
        stone3.setScale(0.5, 0.4);
        stone4.setScale(0.5, 0.4);
        stone5.setScale(0.5, 0.4);
        stone6.setScale(0.5, 0.4);
        stone7.setScale(0.5, 0.4);
        stone8.setScale(0.5, 0.4);
    }
}
