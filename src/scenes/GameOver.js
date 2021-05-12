import Phaser from 'phaser';

class GameOver extends Phaser.Scene {

    constructor() {
        super({
            key: 'GameOver',
            active: false
        })
    }

    create() {
        this.title = this.add.text(40, game.config.height / 2 - 80, 'GAME OVER', {
            fontFamily: 'font1',
            fontSize: 70,
            color: '#000000',
            align: 'center',
        });
    }
}

export default GameOver;