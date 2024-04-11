import Phaser from "phaser";
export default class levelFour extends Phaser.Scene {
    private stone?: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super({ key: "levelFour" });
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
                this.scene.start("levelFourPass");
            });

        const levelName = this.add.text(25, 25, "Level 4", {
            fontFamily: "Arial Black",
            fontSize: "40px",
            color: "#ffffe0",
        });
        levelName.setStroke("#ffd700", 16);

        this.add.image(150, 500, "duck").setScale(0.4);
        this.add.image(50, 500, "duck").setScale(0.4);
        this.add.image(75, 550, "duck").setScale(0.4);
        this.add.image(100, 550, "duck").setScale(0.4);
        this.add.image(950, 250, "duck").setScale(0.4);

        // connection lines
        const graphics = this.add.graphics();
        graphics.lineStyle(2, 0x000000);

        graphics.beginPath();
        graphics.moveTo(500, 400);
        graphics.lineTo(275, 435);
        graphics.lineTo(650, 600);
        graphics.lineTo(740, 480);
        graphics.lineTo(790, 375);
        graphics.lineTo(400, 525);
        graphics.lineTo(500, 400);
        graphics.lineTo(650, 600);
        graphics.lineTo(500, 400);
        graphics.lineTo(790, 375);
        graphics.lineTo(900, 450);
        graphics.lineTo(400, 525);
        graphics.lineTo(900, 450);
        graphics.lineTo(850, 575);
        graphics.lineTo(790, 375);

        graphics.strokePath();

        // add stones
        this.stone = this.physics.add.staticGroup();

        const stone1 = this.stone.create(500, 400, "stone");
        const stone2 = this.stone.create(275, 435, "stone");
        const stone3 = this.stone.create(650, 600, "stone");
        const stone4 = this.stone.create(740, 480, "stone");
        const stone5 = this.stone.create(790, 375, "stone");
        const stone6 = this.stone.create(400, 525, "stone");
        const stone7 = this.stone.create(900, 450, "stone");
        const stone8 = this.stone.create(850, 575, "stone");

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
