class Alien extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.jumper = scene.sound.add('jumper')
        this.slider = scene.sound.add('slid')

        this.body.setSize(this.width / 2, this.height / 2)
        this.body.setCollideWorldBounds(true)
        this.setGravityY(1000)

        this.alienVelocity = 1

        scene.alienFSM = new StateMachine('running', {
            running: new RunState(),
            jumping: new JumpState(),
            sliding: new SlideState(),
        }, [scene, this])
    }
}

class RunState extends State {
    enter(scene, alien) {
        if (game.settings.speed >= 2.5) {
            this.alienVelocity = 4
            alien.anims.play(`alien-runnererer`)
        } else if (game.settings.speed >= 2) {
            this.alienVelocity = 3
            alien.anims.play(`alien-runnerer`)
        } else if (game.settings.speed >= 1.5) {
            this.alienVelocity = 2
            alien.anims.play(`alien-runnerer`)
        } else {
            alien.anims.play(`alien-run`)
        }
        alien.anims.stop()
    }

    execute(scene, alien) {
        const { up, down } = scene.keys
        if(Phaser.Input.Keyboard.JustDown(up) && alien.body.velocity.y == 0) {
            this.stateMachine.transition('jumping')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('sliding')
            return
        }
        if (this.alienVelocity == 4) {
            alien.anims.play(`alien-runnererer`, true)
        } else if (this.alienVelocity == 3) {
            alien.anims.play(`alien-runnerer`, true)
        } else if (this.alienVelocity == 2) {
            alien.anims.play(`alien-runner`, true)
        } else {
            alien.anims.play(`alien-run`, true)
        }
    }
    
}

class JumpState extends State {
    enter(scene, alien) {
        alien.jumper.setRate(1.25 * (1 + ((game.settings.speed  - 1) / 10)))
        alien.jumper.play()
        alien.anims.play(`alien-brace`)
        alien.once('animationcomplete', () => {
            alien.setVelocityY(-750)
            alien.anims.play(`alien-jump`)
            alien.once('animationcomplete', () => {
                this.stateMachine.transition('running')
            })
        })
    }
}

class SlideState extends State {
    enter(scene, alien) {
        alien.slider.play()
        alien.body.setSize(alien.width / 2, alien.height / 4)
        alien.anims.play('alien-slide').once('animationcomplete', () => {
            alien.body.setSize(alien.width / 2, alien.height / 2)
            this.stateMachine.transition('running')
        })
    }
}