class Alien extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame) // call Sprite parent class
        scene.add.existing(this)           // add Hero to existing scene

        // set custom Hero properties
        this.alienVelocity = 100    // in pixels
        this.jumpCooldown = 300    // in ms
        this.slideCooldown = 300    // in ms

        // initialize state machine managing hero (initial state, possible states, state args[])
        scene.alienFSM = new StateMachine('running', {
            running: new RunState(),
            jumping: new JumpState(),
            sliding: new SlideState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

// hero-specific state classes
class RunState extends State {
    enter(scene, alien) {
        alien.anims.play(`alien-run`)
        alien.anims.stop()
    }

    execute(scene, alien) {
        const { up, down } = scene.keys

        if(Phaser.Input.Keyboard.JustDown(up)) {
            this.stateMachine.transition('jumping')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('sliding')
            return
        }
        alien.anims.play(`alien-run`, true)
    }
    
}

class JumpState extends State {
    enter(scene, hero) {
        hero.anims.play(`alien-jump`)
        hero.once('animationcomplete', () => {
            this.stateMachine.transition('running')
        })
    }
}

class SlideState extends State {
    enter(scene, hero) {
        hero.anims.play('alien-slide').once('animationcomplete', () => {
            this.stateMachine.transition('running')
        })
    }
}