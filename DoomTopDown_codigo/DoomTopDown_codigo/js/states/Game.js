Game = function(game){}

Game.prototype = {
	init:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.levelSpeed = 200;
		//this.game.physics.arcade.gravity.y = 1000;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.shootInterval=0;
		this.direccion_j=0
		this.bullets=this.game.add.group();
	},
	
	
	create:function(){	
		//Crear mapa
		this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');



		//Crear jugador
		this.player = this.game.add.sprite(50,140,'player');
		this.player.anchor.setTo(0.5);
		this.player.angle=270;
		this.game.physics.enable(this.player);

	

		
		
	},	

	update:function(){
		//Tiempo
		this.shootInterval += this.time.elapsed;
		//Movimiento
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		if(this.cursors.right.isDown){
            this.player.body.velocity.x = 300;
			this.player.angle=0;
			this.direccion_j=0;
        }
		if(this.cursors.down.isDown){
            this.player.body.velocity.y = 300;
			this.player.angle=90;
			this.direccion_j=1;
        }
		if(this.cursors.left.isDown){
            this.player.body.velocity.x = -300;
			this.player.angle=180;
			this.direccion_j=2;
        }
        if(this.cursors.up.isDown){
            this.player.body.velocity.y = -300;
			this.player.angle=270;
			this.direccion_j=3;
        }
		//Disparo
		if( (this.input.keyboard.isDown(Phaser.Keyboard.Z))
                    && this.shootInterval >=300){
            this.shootInterval = 0;
            this.createBullet(this.player.posX,this.player.posY);
        }
	},
	createBullet:function(posX,posY){
        let bullet = new Bullet(this.game,posX,posY,this.direccion_j);
        this.bullets.add(bullet);
    },
	shoot:function(){
        let bullet = this.bullets.getFirstDead();
        if(bullet){
            bullet.reset(this._player.x,this._player.y);
            bullet.body.velocity.y = -200;
        }else{
            bullet = this.game.add.sprite(this._player.x,this._player.y,'bullet');
            this.bullets.add(bullet);
            bullet.scale.setTo(2);
            bullet.anchor.setTo(0.5);
            this.physics.arcade.enable(bullet);
            bullet.body.velocity.y = -200;
            bullet.checkWorldBounds = true;
            bullet.outOfBoundsKill  = true;
        }

    }
	
	
}