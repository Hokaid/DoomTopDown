//const { Phaser } = require("../../lib/phaser.min")

Bullet = function(game,x,y,direccion_j){
    Phaser.Sprite.call(this,game,x,y,'bala');
    this.game=game;
    this.game.physics.arcade.enable(this);
    switch(direccion_j){
        case 0: {this.body.velocity.x=100;break}
        case 1: {this.body.velocity.y=100;break}
        case 2: {this.body.velocity.x=-100;break}
        case 3: {this.body.velocity.y=-100;break}
    }
    
}

Bullet.prototype = Object.create(Phaser.Sprite.prototype);
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function(){
    if(this.x >= this.game.width){
        this.kill();
    }
}