import Phaser from 'phaser';

class Score extends Phaser.Scene {
    constructor() {
        super({
            key: 'Score',
            active: false 
            // Active set to false initially as score only 
            // appears once game has started
        })
    }

    create() {
        this.score = this.add.text(10, 10, 'SCORE: ', {
            fontFamily: 'font1',
            color: 'black'
        })

        /**
         * Listen for 'updateScore' event
         
        ourGame.events.on('updateScore', (data) => {
            this.score += data[0].toString();  // Grab score from event
        });*/
    }
}

export default Score;