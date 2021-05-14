import * as Phaser from 'phaser';

import Game from './scenes/Game';
import GameOver from './scenes/GameOver';
import Score from './scenes/Score';
import Title from './scenes/Title';

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#5DACD8',
  scene: [Game, Title, Score, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 200 },
    },
  },
};

export const game = new Phaser.Game(gameConfig);

// window.addEventListener('resize', () => {
//   game.scale.refresh();
// })
