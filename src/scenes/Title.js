import Phaser from 'phaser'
import game from '../../src/index.js'

class Title extends Phaser.Scene {
    
    constructor() {
        super({key: 'Title', active: true});
    }

    create() {
        /**
         * Game title text
         */
        this.title = this.add.text(40, game.config.height / 2 - 80, 'TEST GAME TITLE', {
            fontFamily: 'font1',
            fontSize: 70,
            color: '#000000',
            align: 'center',
        });

        /**
         * Play button
         */
        this.play_button = this.add.text(320, game.config.height / 2 + 100, 'PLAY', {
            fontFamily: 'font1',
            fontSize: 50,
            color: '#000000',
            align: 'center',
        })
    }

    update() {
        this.play_button.setInteractive({ 
            useHandCursor: true 
        });

        /**
         * When mouse enters, font colour will change
         */
        this.play_button.on('pointerover', () => {
            this.play_button.setColor('red');
        })

        /**
         * When mouse leaves, font colour will go back
         */
        this.play_button.on('pointerout', () => {
            this.play_button.setColor('black');
        })

        /**
         * When clicked, title HUD will disappear
         */
        this.play_button.on('pointerup', () => {
            this.scene.stop();
            this.scene.launch('Score');
        });
    }
}

export default Title;