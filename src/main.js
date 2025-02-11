// REDACTED Raceway
// Name: Campbell Hunter
// Date: 2/10/2025
// Hours Spent: 30-40
/*
For the technical side of things, I had a lot of fun working with the speed-up aspect of this game. 
The music, animations, sound affects, and even death sequence all interact with the game timer,
which allowed me to give resposive feedback to the player about the increasing speed and spawn rates.

For the creative aspect, I think both the artwor and sound design worked well in tandem with one another.
I tryed to have a cohesive "look" throughout, which I think I did pretty well.
I also just love the sound elements, aspecially with the music increasing in speed up until the players death,
where it then plumets back down into silence. 
*/
//Citations: Using frameworks provided for previous assignments, and some inspiration and guidance from https://docs.phaser.io/phaser/concepts/


'use strict'

let config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL,
    width: 768,
    height: 512,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
          debug: true
      }
  },
  scene: [ Menu, Play, Credits]
  }

let game = new Phaser.Game(config)
let keyCREDITS, keyRESET, keyMENU
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3