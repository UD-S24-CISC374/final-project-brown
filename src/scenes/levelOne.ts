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
            .setDisplaySize(screenWidth, screenHeight);

        this.add.image(150, 500, "duck").setScale(0.4);

        this.stone = this.physics.add.staticGroup();

        const stone1 = this.stone.create(500, 400, "stone");
        const stone2 = this.stone.create(275, 500, "stone");
        const stone3 = this.stone.create(700, 600, "stone");
        const stone4 = this.stone.create(750, 450, "stone");

        stone1.setScale(0.5, 0.4);
        stone2.setScale(0.5, 0.4);
        stone3.setScale(0.5, 0.4);
        stone4.setScale(0.5, 0.4);
    }

    update() {}
}
