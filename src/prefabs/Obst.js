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
    }

    update() {
        //let moveDirection = new Phaser.Math.Vector2(0, 0)
        //moveDirection.x = -1
        this.x -= this.moveSpeed

        if(this.x <= 0 - this.width) {
            this.destroy()
        } else {  
            //this.body.setVelocity(-this.moveSpeed * 175, 0)
        }
    }
}