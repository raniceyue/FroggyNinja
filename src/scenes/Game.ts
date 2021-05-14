import * as Phaser from 'phaser';
import Racoon from '../characters/enemies/Racoon';

class Game extends Phaser.Scene {
  private clouds!: Phaser.GameObjects.TileSprite;
  private mountains!: Phaser.GameObjects.TileSprite;
  private frog!: Phaser.Physics.Arcade.Sprite;
  private ninja!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({ key: 'Game' });
  }

  preload() {
    /**
     * Environment
     */
    this.load.image('clouds', 'src/assets/clouds.png');
    this.load.image('ground', 'src/assets/platform.png');
    this.load.image('mountains', 'src/assets/mountains.png');

    /**
     * Spritesheets for animations
     */
    this.load.spritesheet('frog', 'src/assets/frog_sheet_16x16.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet('ninja', 'src/assets/NinjaFrog/ninja_frog_double_jump_32x32.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('racoon_run_right', 'src/assets/Racoon/racoon_run_right_32x32.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('racoon_run_left', 'src/assets/Racoon/racoon_run_left_32x32.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet('racoon_explosion', 'src/assets/NinjaFrog/racoon_explosion.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    /**
     * Environment sprites
     */
    this.clouds = this.add.tileSprite(640, 200, 2000, 400, 'clouds');
    this.mountains = this.add.tileSprite(640, 400, 2000, 400, 'mountains').setScale(0.7).setAlpha(0.3);
    const platform = this.physics.add.staticGroup().create(400, 568, 'ground').setScale(2).refreshBody();

    /**
     * Main player sprites
     */
    this.frog = this.physics.add.sprite(400, 400, 'frog');
    this.frog.setCollideWorldBounds(true);

    this.ninja = this.physics.add.sprite(600 / 2 - 16, 600 / 2 - 16, 'ninja').setGravity(0);
    this.ninja.setCollideWorldBounds(true);

    /**
     * Enemies
     */
    // this.racoon = this.physics.add.sprite(game.config.width / 4, game.config.height - 100, 'racoon_run_right');

    const enemies = this.physics.add.group({
      classType: Racoon,
    });

    enemies.get(256, 128, 'right', 10);

    /**
     * Animations
     *
     * Animations that are created in each scene are global
     */
    this.anims.create({
      key: 'frog_anim',
      frames: this.anims.generateFrameNumbers('frog'),
      frameRate: 3,
      repeat: -1,
    });

    this.anims.create({
      key: 'ninja_idle',
      frames: this.anims.generateFrameNumbers('ninja'),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'racoon_run_right',
      frames: this.anims.generateFrameNumbers('racoon_run_right'),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'racoon_run_left',
      frames: this.anims.generateFrameNumbers('racoon_run_left'),
      frameRate: 15,
      repeat: -1,
    });

    this.anims.create({
      key: 'racoon_explosion',
      frames: this.anims.generateFrameNumbers('racoon_explosion'),
      frameRate: 10,
      repeat: 0,
    });

    /**
     * Initialize animations
     */
    this.frog.play('frog_anim');
    this.ninja.play('ninja_idle');

    /**
     * Initialize colliders
     */
    this.physics.add.collider(this.ninja, this.frog);
    this.physics.add.collider(this.ninja, platform);
    this.physics.add.collider(this.frog, platform);
    this.physics.add.collider(enemies, platform);

    this.physics.add.overlap(this.ninja, enemies, (frog, enemy) => {
      console.log('Player has touched racoon');
      enemy.scene.anims.play('racoon_explosion');
      enemy.play('racoon_explosion');
      enemy.body.setAllowGravity(false);
      enemy.setVelocity(0);
      enemy.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
        enemy.destroy();
      });
    });

    /**
     * When the racoon touches the frog, all anims will be
     * paused and game over
     */
    this.physics.add.overlap(this.frog, enemies, (frog, enemy) => {
      this.frog.anims.pause();
      enemy.anims.pause();
      enemy.setVelocity(0);

      this.scene.pause();
      this.scene.stop('Score');
      this.scene.stop('Title');
      this.scene.launch('GameOver');
    });
  }

  update() {
    /**
     * Rolling clouds and mountains animation effect
     */
    this.clouds.tilePositionX += 0.5;
    this.mountains.tilePositionX += 0.2;

    /**
     * Track make character follow cursor
     */
    this.input.on(
      'pointermove',
      function (pointer) {
        this.ninja.x = pointer.x;
        this.ninja.y = pointer.y;
        this.ninja.body.velocity.copy(pointer.velocity);
      },
      this,
    );

    this.ninja.setVelocity(0);
    this.frog.setVelocityX(0);
  }
}

export default Game;
