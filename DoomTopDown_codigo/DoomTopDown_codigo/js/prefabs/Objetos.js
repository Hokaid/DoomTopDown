Objetos = function(game,x,y,tipo){
    Phaser.Sprite.call(this,game,x,y,tipo);
    this.game=game;
    this.tipo=tipo;
    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;

    
}

Objetos.prototype = Object.create(Phaser.Sprite.prototype);
Objetos.prototype.constructor = Objetos;

Objetos.prototype.reset = function(x,y,data){
    Phaser.Sprite.prototype.reset.call(this,x,y);
    this.loadTexture(data);
}