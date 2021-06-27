Game = function(game){}

Game.prototype = {
	init:function(){
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//this.game.physics.arcade.gravity.y = 1000;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.shootInterval=0;
		this.direccion_j=1;
		
	},
	
	
	create:function(){	
		//Crear mapa
		this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');

		//Crear jugador
		this.player = this.game.add.sprite(this.game.width/2,this.game.height/2,'player');
		this.player.anchor.setTo(0.5);
		this.player.angle=90;
		this.game.physics.enable(this.player);
		this.player.body.collideWorldBounds=true;
		//Crear Grupos
		this.enemigos=this.game.add.group();

		this.bullets=this.game.add.group();
		this.velocidadBala=0;

		this.enemigosData = JSON.parse(this.game.cache.getText("enemigosData"));
		this.enemigosInterval=0;
		this.currentEnemigo=0;
		this.totalEnemigos=this.enemigosData.length;
		
	},	

	update:function(){
		//Tiempo
		this.shootInterval += this.time.elapsed;
		this.enemigosInterval+=this.time.elapsed;
		//Enemmigos
		if(this.enemigosInterval>=1000){
			this.enemigosInterval=0;
			//console.log(this.enemigosData[this.currentEnemigo])
			this.direccion=this.game.rnd.integerInRange(0,3);
			this.generarEnemigos(this.enemigosData[this.currentEnemigo],this.direccion)
			this.currentEnemigo++;
			
			if(this.totalEnemigos<=this.currentEnemigo){
				this.currentEnemigo=0;
			}
		}
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
            this.shoot(this.direccion_j);
        }
		this.enemigos.forEach(function(element){
			if(this.player.posX<element.posX){
				element.body.velocity.x = -100;
			}else if(this.player.posX>element.posX){
				element.body.velocity.x = 100;
			}
			if(this.player.posY<element.posY){
				element.body.velocity.y = -100;
			}else if(this.player.posY>element.posY){
				element.body.velocity.y = 100;
			}
		},this);

	},
	generarEnemigos:function(enemigosData,direccion){
		//let posX = this.game.rnd.integerInRange(0,this.game.height-70);
		let posX, posY;
		switch(direccion){
			case 0:{posX=-50;
				posY = this.game.rnd.integerInRange(0,this.game.height-100);}break;
			case 1:{posX=this.game.width+50;
				posY = this.game.rnd.integerInRange(0,this.game.height-100);}break;
			case 2:{posX=this.game.rnd.integerInRange(0,this.game.width-50);
				posY = -50;}break;
			case 3:{posX=this.game.rnd.integerInRange(0,this.game.width-100);
				posY = this.game.height+50;}break;
		}
		console.log(posX,posY)
        let enemigo = this.enemigos.getFirstDead();
        if(enemigo){
            enemigo.reset(posX,posY,enemigosData);            
        } else{
            enemigo = new Enemigo(this.game, posX, posY,enemigosData);
			console.log(enemigo)
        }
        this.enemigos.add(enemigo);
    },
	createBullet:function(posX,posY){
        let bullet = new Bullet(this.game,posX,posY,this.direccion_j);
        this.bullets.add(bullet);
    },
	shoot:function(direccion){
        var bullet = this.bullets.getFirstDead();
        if(bullet){
            bullet.reset(this.player.x,this.player.y);
            
        }else{
            bullet = this.game.add.sprite(this.player.x,this.player.y,'bala');
            this.bullets.add(bullet);
            bullet.scale.setTo(1);
            bullet.anchor.setTo(0.5);
            this.game.physics.arcade.enable(bullet);           
        }
		switch(direccion){
			case 0: {bullet.body.velocity.x=650;break;}
			case 1: {bullet.body.velocity.y=650;break;}
			case 2: {bullet.body.velocity.x=-650;break;}
			case 3: {bullet.body.velocity.y=-650;break;}
		}
		bullet.checkWorldBounds = true;
		bullet.outOfBoundsKill  = true;

    }
	
	
}