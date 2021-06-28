Enemigo = function(game,x,y,element,horda){
    Phaser.Sprite.call(this,game,x,y,element.asset);
    this.game = game;
    this.element = element;
    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
    this.reset(x,y,element,horda);
}

Enemigo.prototype = Object.create(Phaser.Sprite.prototype);
Enemigo.prototype.constructor = Enemigo;

Enemigo.prototype.reset = function(x,y,data,horda){
    Phaser.Sprite.prototype.reset.call(this,x,y);
    this.loadTexture(data.asset);
    this.attack = data.attack + horda;
    this.health = data.health + horda;
    this.points = data.points + horda;
    this.velocity = data.velocity;
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