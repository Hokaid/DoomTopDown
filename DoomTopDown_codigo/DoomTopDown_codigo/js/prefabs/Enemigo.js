Enemigo = function(game,x,y,element){
    Phaser.Sprite.call(this,game,x,y,element.asset);
    this.game = game;
    this.element = element;
    this.anchor.setTo(0.5);
    this.velocity = element.velocity;
    this.points = element.points;
    console.log(element.points);
    console.log(element.asset);
    this.game.physics.arcade.enable(this);
    this.reset(x,y,element);
}

Enemigo.prototype = Object.create(Phaser.Sprite.prototype);
Enemigo.prototype.constructor = Enemigo;

Enemigo.prototype.reset = function(x,y,data){
    Phaser.Sprite.prototype.reset.call(this,x,y);
    this.loadTexture(data.asset);
    this.attack = data.attack;
    this.health = data.health;
    this.defaultVelocity = data.velocity;
},

Enemigo.prototype.damage = function(amount){
    Phaser.Sprite.prototype.damage.call(this,amount);
    let emitter = this.game.add.emitter(this.x,this.y,50);
    emitter.makeParticles('blood');
    emitter.minParticleSpeed.setTo(-100,-100);
    emitter.maxParticleSpeed.setTo(100,100);    
    emitter.gravity = 300;
    emitter.start(true,200,null,100);
    if(this.health<=0){
        this.kill();
    }
}

Enemigo.prototype.getPoints = function() {
    return this.element.points;
}