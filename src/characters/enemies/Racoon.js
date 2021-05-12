import Phaser from 'phaser';

class Racoon extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, direction) {
        super(scene, x, y, 'racoon');

        // Add game object to the scene
        scene.enemies.add(this);

        (direction === 'left') 
            ? this.play('racoon_walk_left')
            : this.play('racoon_walk_right')
        
        scene.physics.world.enableBody(this);
    }

    update() {
        
    }
}

export default Racoon;