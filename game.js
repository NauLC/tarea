//create a game phaser class
export class Game extends Phaser.Scene {
    constructor() {
    super({ key: "game" });
    }

    init () {
        this.nivel = 1;
        this.puntaje = 0;
    }

    preload () {
        this.load.image ("ball", "./assests/ball.png");
        this.load.image ("platform", "./assests/platform.png");
        this.load.image ("obst", "./assests/obst.png");
    }

    create () {
        this.physics.world.setBoundsCollision (true, true, true, false);
        this.platform =this.physics.add.sprite (400, 500, "platform").setScale(0.5).setImmovable();
        this.platform.body.allowGravity = false;
        this.platform.setCollideWorldBounds(true);

        this.ball =  this.physics.add.sprite (400, 0, "ball").setScale(0.05);
        this.ball.setBounce(1);
        this.ball.setCollideWorldBounds(true);
        this.ballVelocity = 200;
        this.ball.setVelocity(this.ballVelocity, this.ballVelocity);

        this.obst = this.physics.add.staticGroup ();

        this.platformVelocity = 400

        this.physics.add.collider(
            this.platform,
            this.ball,
            this.bounce,
            null,
            this
        )

        this.physics.add.collider(
            this.obst,
            this.ball
            );

        this.cursors = this.input.keyboard.createCursorKeys();

        this.puntajeText = this.add.text (16, 16, "Puntaje: 0", { fontSize: '20px', fill: '#ffff' });
        this.nivelText = this.add.text(16, 40, "Nivel: 1", { fontSize: '30px', fill: '#ffff' })
    }


    bounce (ball, platform) {
    this.puntaje += 1;
    this.puntajeText.setText ("puntaje: " + this.puntaje);
    if(this.puntaje >=10){
        this.nextLevel();
    }
}


nextLevel() {
    this.nivel++;
    this.nivelText.setText("nivel: " + this.nivel);

    this.ballVelocity = this.ballVelocity * 1.1;

    
    this.platform.setPosition(400, 500);
    this.ball.setPosition(400, 0);
    this.ball.setVelocity(this.ballVelocity, this.ballVelocity);
    this.puntaje = 0;
    this.puntajeText.setText("puntaje: " + this.puntaje);

    let randomObstx = Phaser.Math.Between(20, 790);
    let randomObsty = Phaser.Math.Between(20, 300);
    let randomObstScale = Phaser.Math.Between(1, 3);

    this.platformVelocity += 20;

    this.obst.create(randomObstx, randomObsty, "obst").setScale(0.05).refreshBody();

    
    const randomColor = this.generateRandomColor();

    this.cameras.main.setBackgroundColor(randomColor);


    if (this.nivel >= 20) {
        this.Message();
    }
}
generateRandomColor() {
    const minSaturation = 0.5; // Saturación mínima
    const maxSaturation = 1; // Saturación máxima
    const minBrightness = 0.1; // Brillo mínimo
    const maxBrightness = 0.5; // Brillo máximo
    
    // Generar un color aleatorio en formato HSV
    const randomColor = Phaser.Display.Color.HSVToRGB(
        Math.random(), // Tono (Hue)
        Phaser.Math.FloatBetween(minSaturation, maxSaturation), // Saturación
        Phaser.Math.FloatBetween(minBrightness, maxBrightness) // Brillo
    );

    return randomColor.color;
}

Message() {
    this.add.text(400, 300, "¡Has ganado!", {
        fontSize: '48px',
        fill: '#fff',
        align: 'centro'
    }).setOrigin(0.5);
    this.ball.disableBody(true, true);
    this.platform.disableBody(true, true);
}





update() {
    if (this.cursors.left.isDown) {
        this.platform.setVelocityX(this.platformVelocity);
    } else if (this.cursors.right.isDown) {
        this.platform.setVelocityX(this.platformVelocity);
    } else {
        this.platform.setVelocityX(0);
    }

    if (this.ball.y > 550) {
        this.Message();
    }
}
}







