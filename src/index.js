import Phaser from 'phaser';
import Game from './scenes/Game.js';
import Title from './scenes/Title.js';
import Score from './scenes/Score.js';
import GameOver from './scenes/GameOver.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "#5DACD8",
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {y: 200}
        }
    },
    scene: [ Game, Title, Score, GameOver],
    score: 0
};

var game = new Phaser.Game(config);

export default game;

