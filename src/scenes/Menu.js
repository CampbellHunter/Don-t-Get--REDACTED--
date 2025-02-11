class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }
    
    preload() {
        this.load.path = './assets/'
        this.load.image('background', 'Backround.png')
        this.load.image('foreground', 'Foreground.png')
        this.load.image('sky', 'sky.png')
        this.load.image('photochad', 'photochad.png')
        this.load.image('tvman', 'tvman.png')
        this.load.image('roadsign', 'roadsign.png')
        this.load.image('roadsignpole', 'roadsignpole.png')
        this.load.image('blackhawk', 'blackhawk.png')
        this.load.image('jeep', 'jeep.png')

        this.load.audio('music', 'backtrack.wav')
        this.load.audio('jumper', 'jump.wav')
        this.load.audio('select', 'select.wav')
        this.load.audio('splode', 'splode.wav')
        this.load.audio('hele', 'hele.wav')
        this.load.audio('car', 'car.wav')
        this.load.audio('horn', 'horn.wav')
        this.load.audio('slid', 'slide.wav')

        this.load.spritesheet('alien', 'alien-sheet.png', {
            frameWidth: 128,
            frameHeight: 128,
        })

        this.load.spritesheet('kaboom', 'splosion.png', {
            frameWidth: 64,
            frameHeight: 90,
        })
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xA0B0D7).setOrigin(0, 0)
        if (!this.anims.exists('alien-run')) {
            this.anims.create({
                key: 'alien-run',
                frameRate: 24,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 13 }),
            })

            this.anims.create({
                key: 'alien-runner',
                frameRate: 48,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 13 }),
            })

            this.anims.create({
                key: 'alien-runnerer',
                frameRate: 72,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 13 }),
            })

            this.anims.create({
                key: 'alien-runnererer',
                frameRate: 96,
                repeat: -1,
                frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 13 }),
            })

            this.anims.create({
                key: 'alien-slide',
                frameRate: 16,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('alien', {
                    frames: [14, 15, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 17, 16, 18]
                }),
            })

            this.anims.create({
                key: 'alien-brace',
                frameRate: 16,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('alien', {
                    frames: [18]
                }),
            })

            this.anims.create({
                key: 'alien-jump',
                frameRate: 16,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('alien', {
                    frames: [19, 19, 5, 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 9, 18]
                }),
            })

            this.anims.create({
                key: 'splosion',
                frameRate: 16,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('kaboom', { start: 0, end: 15 }),
            })
        }

        let menuConfig = {
            fontFamily: 'Stencil',
            fontSize: '72px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                 top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, 15 + game.config.height/2 - borderUISize - borderPadding, 'REDACTED RACEWAY', menuConfig).setOrigin(0.5)
        menuConfig.color = '#D9DFEE'
        menuConfig.fontSize = '32px'
        this.add.text(game.config.width/2, 25 + game.config.height/2, 'Press "ENTER" to start', menuConfig).setOrigin(0.5)
        //menuConfig.backgroundColor = '#A0B0D7'
        
        //menuConfig.color = '#D9DFEE'
        this.add.text(game.config.width/2, 20 + game.config.height/2 + borderUISize + borderPadding, 'Press "SPACEBAR" for credits', menuConfig).setOrigin(0.5)

        //this.add.text(20, 20, "Rocket Patrol Menu")

        //this.scene.start("playScene")

        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE) 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            game.settings = {
                gameSpeed: 1   
            }
            this.scene.start('playScene')    
        }
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
            this.scene.start('creditsScene')    
        }
    }
}