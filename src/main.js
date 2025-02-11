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
  scene: [ Menu, Play, Credits]
  }

let game = new Phaser.Game(config)
let keyCREDITS, keyRESET, keyMENU
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3