class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene")
    }
    
    preload() {
        //this.load.path = './assets/'
    }

    create() {
        this.add.rectangle(0, 0, game.config.width, game.config.height, 0xA0B0D7).setOrigin(0, 0)
        let menuConfig = {
            fontFamily: 'Stencil',
            fontSize: '32px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                 top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'Game, Art, and Sound by Campbell Hunter', menuConfig).setOrigin(0.5)
        
        this.add.text(game.config.width/2, game.config.height/2, 'Explosion Graphics by PopCap Games', menuConfig).setOrigin(0.5)
        menuConfig.color = '#D9DFEE'
        this.add.text(game.config.width/2, 35 + game.config.height/2 + borderUISize + borderPadding, 'Press "SPACEBAR" for main menu', menuConfig).setOrigin(0.5)

        //this.add.text(20, 20, "Rocket Patrol Menu")

        //this.scene.start("playScene")

        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE) 
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyCREDITS)) {
            this.scene.start('menuScene')    
        }
    }
}