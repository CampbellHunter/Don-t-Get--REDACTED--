// Code Practice: Scrolling States
// Name:
// Date: 

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 768,
    height: 512,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
          debug: true
      }
  },
  scene: [ Menu, Play ]
  }

let game = new Phaser.Game(config)
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3