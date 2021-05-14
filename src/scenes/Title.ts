import * as Phaser from 'phaser';

export default class Title extends Phaser.Scene {
  private title!: Phaser.GameObjects.Text;
  private play_button!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'Title', active: true });
  }

  create() {
    /**
     * Game title text
     */
    this.title = this.add.text(235, 600 / 2 - 150, 'FROGGY\r\nNINJA', {
      fontFamily: 'font1',
      fontSize: '70',
      color: 'darkgreen',
      align: 'center',
    });

    /**
     * Play button
     */
    this.play_button = this.add.text(320, 600 / 2 + 100, 'PLAY', {
      fontFamily: 'font1',
      fontSize: '50',
      color: '#000000',
      align: 'center',
    });
  }

  update() {
    this.play_button.setInteractive({
      useHandCursor: true,
    });

    /**
     * When mouse enters, font colour will change
     */
    this.play_button.on(
      'pointerover',
      () => {
        this.play_button.setColor('red');
      },
      this,
    );

    /**
     * When mouse leaves, font colour will go back
     */
    this.play_button.on(
      'pointerout',
      () => {
        this.play_button.setColor('black');
      },
      this,
    );

    /**
     * When clicked, title HUD will disappear
     */
    this.play_button.on(
      'pointerup',
      () => {
        this.scene.stop();
        this.scene.launch('Score');
      },
      this,
    );
  }
}
