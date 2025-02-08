class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    
    preload() {
        this.load.path = './assets/'
        this.load.image('background', 'Backround.png')
        this.load.image('foreground', 'Foreground.png')
        this.load.image('sky', 'sky.png')

        this.load.spritesheet('alien', 'alien-sheet.png', {
            frameWidth: 128,
            frameHeight: 128,
        })
    }

    create() {

        this.anims.create({
            key: 'alien-run',
            frameRate: 32,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 13 }),
        })

        this.anims.create({
            key: 'alien-slide',
            frameRate: 16,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('alien', {
                frames: [14, 15, 16, 17, 16, 17, 16, 17, 16, 18]
            }),
        })

        this.anims.create({
            key: 'alien-jump',
            frameRate: 16,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('alien', {
                frames: [18, 18, 18, 19, 19, 5, 6, 7, 7, 7, 8, 9, 18]
            }),
        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                 top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = '#00FF00'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5)

        //this.add.text(20, 20, "Rocket Patrol Menu")

        //this.scene.start("playScene")

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT) 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
             }
            this.scene.start('playScene')    
        }
    }
}