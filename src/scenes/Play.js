class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }
    
    create() {
        this.physics.world.drawDebug = false
        this.music = this.sound.add('music')
        this.music.setLoop(true)
        this.music.setVolume(.25)
        this.music.play()
        this.sky = this.add.tileSprite(0, 0, 768, 512, 'sky').setOrigin(0, 0).setScale(2)
        this.background = this.add.tileSprite(0, 0, 768, 512, 'background').setOrigin(0, 0).setScale(2)
        this.foreground = this.add.tileSprite(0, 0, 768, 512, 'foreground').setOrigin(0, 0).setScale(2)

        this.physics.world.setBounds(-600, 0, 1668, 450)

        this.alien = new Alien(this, 120, 420, 'alien', 0)
        this.alien.depth = 1
        this.keys = this.input.keyboard.createCursorKeys()

        this.groundBoy = new Obst(this, -400, 0, 'tvman', 0, 4).setOrigin(0, 0).setScale(.85)
        this.airBoy = new Obst(this, -400, 0, 'roadsign', 0, 4).setOrigin(0, 0).setScale(.85)
        this.airBoy2 = new Obst(this, -400, 0, 'roadsignpole', 0, 4).setOrigin(0, 0).setScale(.85)
        
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        document.getElementById('info').innerHTML = '"UP": jump | "DOWN": Slide | "D": debug (toggle)'

        this.faded = this.add.rectangle(0, 0, game.config.width, game.config.height, 0xa0b0d7).setOrigin(0, 0)
        this.faded.alpha = 0

        let scoreConfig = {
            fontFamily: 'Stencil',
            fontSize: '60px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 175
        }
        this.timeOff = this.time.now
        this.timeChecked = false
        this.timeRunning = this.add.text(570, 10, '00000', scoreConfig)
        this.doSpawn = true;
        this.timeScale = 1
        this.backer = 1

        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        keyMENU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.gameOver = false
    }

    update() {
        
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.music.pause()
            this.scene.restart()
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyMENU)) {
            this.music.pause()
            this.scene.start("menuScene")
         }

        if(!this.gameOver) {
            if (!this.timeChecked) {
                this.timeOff = this.time.now
                this.timeChecked = true
            }

            
            let timetext = ("00000" + (Math.floor((this.time.now - this.timeOff)/ 10))).slice(-5)
            this.timeRunning.text = timetext

            this.timeScale = 1 + (this.time.now - this.timeOff)/ 100000
            game.settings.speed = this.timeScale
            this.music.setRate(1 + ((this.timeScale - 1) / 10))

            this.physics.add.collider(this.alien, this.groundBoy, () => this.hitMe(this.alien, this.groundBoy), null, this)
            this.physics.add.collider(this.alien, this.airBoy, () => this.hitMe(this.alien, this.airBoy), null, this)

            this.alienFSM.step()
            this.foreground.tilePositionX += (1.5 * this.timeScale)
            this.background.tilePositionX += (0.25 * this.timeScale)
            
            if (this.doSpawn) {
                this.doSpawn = false;
                this.spawnBoy()
            }

            
            
                this.groundBoy.update()
                this.airBoy.update()
                this.airBoy2.update()
        } else {
            if (this.faded.alpha < 1) {
                this.faded.alpha += 0.001
            }
            if (this.timeScale > -10) {
                if (this.backer > 0) {
                    this.backer -= 0.001
                    this.foreground.tilePositionX += (1.5 * (this.backer))
                    this.background.tilePositionX += (0.25 * (this.backer))
                }
                this.timeScale -= 0.01
                this.music.setRate(1 + ((this.timeScale - 1) / 10))
            } else {
                this.music.pause()
            }
        }
    }

    spawnBoy() {
        let spawner = Math.floor(Math.random() * 5000 + 5000) / this.timeScale
        this.clock = this.time.delayedCall(spawner, () => {
            let local = Math.floor(Math.random() * 3)
            if (this.gameOver == false) {
                if (local == 2) {
                    let localer = Math.floor(Math.random() * 2)
                    if (localer == 1) {
                        this.airBoy = new Obst(this, 1000, borderUISize*5, 'roadsign', 0, 3 * this.timeScale).setOrigin(0, 0).setScale(.85)
                        this.airBoy2 = new Obst(this, 995, borderUISize*5 + 185, 'roadsignpole', 0, 3 * this.timeScale).setOrigin(0, 0).setScale(.85)
                        this.airBoy2.depth = 2
                    } else {
                        this.airBoy = new Obst(this, 1000, borderUISize*4, 'blackhawk', 0, 5 * this.timeScale).setOrigin(0, 0).setScale(.85)
                        this.hele = this.sound.add('hele')
                        this.airBoy.depth = 2
                        this.hele.setRate(3 * (1 + ((this.timeScale - 1) / 10)))
                        this.hele.play()
                    }
                }else{
                    let localer = Math.floor(Math.random() * 3)
                    if (localer == 1) {
                        this.groundBoy = new Obst(this, 1000, borderUISize*8.5, 'tvman', 0, 3 * this.timeScale).setOrigin(0, 0).setScale(.85)
                    } else if (localer == 2) {
                        this.groundBoy = new Obst(this, 1000, borderUISize*9.5, 'photochad', 0, 3 * this.timeScale).setOrigin(0, 0).setScale(.90)
                    } else {
                        this.groundBoy = new Obst(this, 1000, borderUISize*6, 'jeep', 0, 4 * this.timeScale).setOrigin(0, 0).setScale(.85)
                        this.honk = this.sound.add('horn')
                        this.groundBoy.depth = 2
                        this.honk.setRate(1.5 * (1 + ((this.timeScale - 1) / 10)))
                        this.car = this.sound.add('car')
                        this.car.setVolume(.25)
                        this.car.setRate(6 * (1 + ((this.timeScale - 1) / 10)))
                        this.car.play()
                        this.honk.play()
                    }
                }
            }
            this.doSpawn = true;
        })
    }

    hitMe(alien, boy) {
        let pow = this.add.sprite(alien.x, alien.y - 200, 'kaboom').setOrigin(0, 0).setScale(4);
        
        game.settings.speed = 0
        alien.destroy()
        if (this.airBoy2) {
            this.airBoy2.destroy()
        }
        boy.destroy()
        this.gameOver = true
        this.backer = this.timeScale
        this.sound.play('splode')
        pow.anims.play('splosion')
        pow.on('animationcomplete', () => {         
            pow.destroy()                
        })

        let menuConfig = {
            fontFamily: 'Stencil',
            fontSize: '64px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                 top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        

        this.add.text(game.config.width/2, -20 + game.config.height/2 - borderUISize - borderPadding, 'You\'ve Been', menuConfig).setOrigin(0.5)
        menuConfig.fontSize = '96px'
        this.add.text(game.config.width/2, 7 + game.config.height/2, 'CLASSIFIED', menuConfig).setOrigin(0.5)
        menuConfig.color = '#D9DFEE'
        menuConfig.fontSize = '32px'
        this.add.text(game.config.width/2, 70 + game.config.height/2, 'Press "SPACEBAR" to restart', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, 110 + game.config.height/2, 'Or "ENTER" to return to menu', menuConfig).setOrigin(0.5)
    }
}