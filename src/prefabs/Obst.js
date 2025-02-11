class Obst extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, speed) {
        super(scene, x, y, texture, frame)
  
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width / 2, this.height / 2.25)
        if (texture == 'roadsignpole') {
            this.body.setSize(this.width / 100, this.height / 100)
        } else if (texture == 'blackhawk') {
            this.body.setSize(this.width / 2, this.height / 1.25)
        } else if (texture == 'roadsign') {
            this.body.setSize(this.width / 1.5, this.height / 2.25)
        }
        this.body.setCollideWorldBounds(true)
        this.moveSpeed = speed
        this.texture = texture
    }

    update() {
        if (this.texture == 'blackhawk') {
            let sine = Math.sin(this.x / 100)
            this.y += sine / 3
        } else if (this.texture == 'jeep') {
            let sine = Math.sin(this.x / 50)
            this.y += sine / 5
        }
        this.x -= this.moveSpeed

        if(this.x <= 0 - this.width) {
            this.destroy()
        }
    }
}