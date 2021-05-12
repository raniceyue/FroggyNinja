import Phaser from 'phaser';
import game from '../index.js';

class Game extends Phaser.Scene
{    
    constructor ()
    {
        super({key: 'Game'});
    }

    preload ()
    {
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
            frameHeight: 16
        })

        this.load.spritesheet('ninja', 'src/assets/NinjaFrog/ninja_frog_double_jump_32x32.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('racoon', 'src/assets/Racoon/racoon_run_right_32x32.png', {
            frameWidth: 32,
            frameHeight: 32
        })

        this.load.spritesheet('racoon_explosion', 'src/assets/NinjaFrog/racoon_explosion.png', {
            frameWidth: 32,
            frameHeight: 32
        })
    }
      
    create ()
    {
        /**
         * Environment sprites
         */
        this.clouds = this.add.tileSprite(640, 200, 1280, 400, 'clouds');
        this.mountains = this.add.tileSprite(640, 400, 1800, 400, 'mountains').setScale(0.7).setAlpha(0.3);
        this.platform = this.physics.add.staticGroup();
        this.platform.create(400, 568, 'ground').setScale(2).refreshBody();

        /**
         * Main player sprites
         */
        this.frog = this.physics.add.sprite(400, 400, 'frog');
        
        this.ninja = this.physics.add.sprite(game.config.width / 2 - 16, game.config.height / 2 - 16, 'ninja');
        this.ninja.body.setAllowGravity(false);
        this.ninja.setCollideWorldBounds(true);

        /**
         * Enemies
         */
        this.racoon = this.physics.add.sprite(game.config.width / 4, game.config.height - 100, 'racoon');
        

        /**
         * Animations
         */
        this.anims.create({
            key: 'frog_anim',
            frames: this.anims.generateFrameNumbers('frog'),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'ninja_idle',
            frames: this.anims.generateFrameNumbers('ninja'),
            frameRate: 20,
            repeat: -1
        })

        this.anims.create({
            key: 'racoon_run_right',
            frames: this.anims.generateFrameNumbers('racoon'),
            frameRate: 15,
            repeat: -1
        })

        this.anims.create({
            key: 'racoon_explosion',
            frames: this.anims.generateFrameNumbers('racoon_explosion'),
            frameRate: 10,
            repeat: 0
        })

        /**
         * Initialize animations
         */
        this.frog.play('frog_anim');
        this.ninja.play('ninja_idle');
        this.racoon.play('racoon_run_right');

        this.racoon.setVelocity(50);

        /**
         * Initialize colliders
         */
        this.physics.add.collider(this.ninja, this.frog);
        this.physics.add.collider(this.ninja, this.platform);
        this.physics.add.collider(this.frog, this.platform);
        this.physics.add.collider(this.racoon, this.platform);

        this.physics.add.overlap(this.ninja, this.racoon, () => {
            console.log('Player has touched racoon');
            this.racoon.play('racoon_explosion');
            this.racoon.body.setAllowGravity(false);
            this.racoon.setVelocity(0);
            this.racoon.once(Phaser.Animations.Events.ANIMATION_COMPLETE, () => {
                this.racoon.destroy();
            });
        });

        /**
         * When the racoon touches the frog, all anims will be 
         * paused and game over
         */
        this.physics.add.overlap(this.frog, this.racoon, () => {
            this.frog.anims.pause();
            this.racoon.anims.pause();
            this.racoon.setVelocity(0);

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
         this.input.on('pointermove', function (pointer) {
            this.ninja.x = pointer.x;
            this.ninja.y = pointer.y;
        }, this);
    }
}

export default Game;