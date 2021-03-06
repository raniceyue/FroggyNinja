import * as Phaser from 'phaser';

class GameOver extends Phaser.Scene {
  private title!: Phaser.GameObjects.Text;
  private play_again_button!: Phaser.GameObjects.Text;

  constructor() {
    super({
      key: 'GameOver',
      active: false,
    });
  }

  create() {
    this.title = this.add.text(180, 600 / 2 - 80, 'GAME OVER', {
      fontFamily: 'font1',
      fontSize: '70',
      color: '#000000',
      align: 'center',
    });

    this.play_again_button = this.add.text(265, 600 / 2 + 100, 'PLAY  AGAIN', {
      fontFamily: 'font1',
      fontSize: '40',
      color: '#000000',
      align: 'center',
    });
  }

  update() {
    this.play_again_button.setInteractive({
      useHandCursor: true,
    });

    /**
     * When mouse enters, font colour will change
     */
    this.play_again_button.on(
      'pointerover',
      () => {
        this.play_again_button.setColor('red');
      },
      this,
    );

    /**
     * When mouse leaves, font colour will go back
     */
    this.play_again_button.on(
      'pointerout',
      () => {
        this.play_again_button.setColor('black');
      },
      this,
    );

    /**
     * When clicked, title HUD will disappear
     */
    this.play_again_button.on(
      'pointerdown',
      () => {
        console.log('Play again button has been clicked');
        this.scene.stop();
        this.scene.launch('Game');
        this.scene.launch('Score');
      },
      this,
    );
  }
}

export default GameOver;
