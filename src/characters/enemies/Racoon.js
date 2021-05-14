import Phaser from 'phaser';

class Racoon extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction, hp) {
        super(scene, x, y);

        direction === 'left' ? this.anims.play('racoon_run_left') : this.anims.play('racoon_run_right');

        this.hp = hp;
        this.isDead = false;
    }
}

export default Racoon;
