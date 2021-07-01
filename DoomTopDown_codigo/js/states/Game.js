Game = function(game){}

Game.prototype = {
	init:function(user_id){		
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		//this.game.physics.arcade.gravity.y = 1000;
		this.cursors = this.game.input.keyboard.createCursorKeys();
		this.shootInterval=0;
		this.direccion_j=1;		
		this.user_id = user_id;				
	},
		
	create:function(){	 
		//Crear mapa
		this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');

		//Play Musica
        this.music = new Phaser.Sound(this.game,'hot',1,true);
		this.music.play();

		//Crear jugador
		this.player = this.game.add.sprite(this.game.width/2,this.game.height/2,'player');
		this.player.anchor.setTo(0.5);
		this.player.angle=90;
		this.game.physics.enable(this.player);
		this.player.body.collideWorldBounds=true;
		this.moodplayer = "player";
		this.vidas = 200;
		this.puntos = 0;
		//Crear Grupos
		this.enemigos=this.game.add.group();
		this.objetos=this.game.add.group();
		this.bullets=this.game.add.group();
		this.velocidadBala=650;

		this.objetosInterval=0;
		this.typos=['comida','caja'];
		this.Armas=['player','player_machine','player_silencer'];
		this.balas=['bala','bala_machine','bala_silenciadora']

		this.enemigosData = JSON.parse(this.game.cache.getText("enemigosData"));
		this.enemigosInterval=0;
		this.currentEnemigo=0;
		this.enemigosmuertos=0;
		this.enemycount=0;
		this.totalEnemigos=this.enemigosData.length;
		let style = {
			fill : "#fff",
			font : "36px Arial"
		};
		this.horda = 1;
        this.vidaLabel = this.game.add.text(30,30,"Vidas: "+this.vidas,style);
		this.puntosLabel = this.game.add.text(240,30,"Puntos: "+this.puntos,style);
		this.hordasLabel = this.game.add.text(450,30,"Horda: "+this.horda,style);

		//FIREBASE
		this.date = this.funcion_fecha();

	},	

	update:function(){
		if((this.enemigosmuertos >= this.horda*4) && (this.enemycount>0)){
			this.horda++;
			this.hordasLabel.text = "Hordas: "+this.horda;
			this.enemycount=0;
		}
		//Tiempo
		this.shootInterval += this.time.elapsed;
		this.enemigosInterval+=this.time.elapsed;
		this.objetosInterval+=this.time.elapsed;
		//Enemmigos
		if(this.enemigosInterval>=2000 && this.enemycount < this.horda*4){
			this.enemigosInterval=0;
			this.direccion=this.game.rnd.integerInRange(0,3);
			this.generarEnemigos(this.enemigosData[this.currentEnemigo],this.direccion)
			this.currentEnemigo++;
			if(this.totalEnemigos<=this.currentEnemigo){
				this.currentEnemigo=0;
			}
		}
		//Objetos
		if(this.objetosInterval>=10000){
			this.objetosInterval=0;
			this.tipo=this.game.rnd.integerInRange(0,1);
			this.generarObjetos(this.typos[this.tipo])
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
		if( (this.input.keyboard.isDown(Phaser.Keyboard.Z) || 
		    this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || 
			this.input.keyboard.isDown(Phaser.Keyboard.X))
                    && this.shootInterval >=300){
            this.shootInterval = 0;
            this.shoot(this.direccion_j);
        }
		this.enemigos.forEach(function(element){
			if(Math.abs(element.x-this.player.x) > Math.abs(element.y-this.player.y)) {
				if(element.x<this.player.x) { element.body.velocity.x = element.velocity; element.angle=0; }
				else {element.body.velocity.x = -1*element.velocity; element.angle=180;}
				element.body.velocity.y = 0;
			} else {
				if(element.y<this.player.y) { element.body.velocity.y = element.velocity; element.angle=90;}
				else {element.body.velocity.y = -1*element.velocity; element.angle=270;}
				element.body.velocity.x = 0;
			}
		},this);
		//Colision player y objeto
		this.game.physics.arcade.overlap(this.player, this.objetos, null, this.EvaluarPowerUp, this);
		//Colisión enemigos y balas
		this.game.physics.arcade.overlap(this.enemigos, this.bullets, null, this.DamageEnemies, this);
		//Colisión enemigos y jugador
		this.game.physics.arcade.overlap(this.player, this.enemigos, null, this.DamagePlayer, this);
		this.game.physics.arcade.collide(this.enemigos, this.enemigos, null, null, this);
		this.game.physics.arcade.collide(this.enemigos, this.objetos, null, null, this);
		this.game.physics.arcade.collide(this.objetos, this.objetos, null, null, this);

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
        let enemigo = this.enemigos.getFirstDead();
        if(enemigo){
            enemigo.reset(posX,posY,enemigosData,this.horda);            
        } else{
            enemigo = new Enemigo(this.game, posX, posY,enemigosData,this.horda);
        }
        this.enemigos.add(enemigo);
		this.enemycount++;
    },
	generarObjetos:function(tipo){
		//let posX = this.game.rnd.integerInRange(0,this.game.height-70);
		let posX, posY;
		posX = this.game.rnd.integerInRange(0,this.game.width-100);
		posY = this.game.rnd.integerInRange(0,this.game.height-100);
		while(posX<=this.player.x+50 && posX>=this.player.x-50){
			posX = this.game.rnd.integerInRange(0,this.game.width-100);
			posY = this.game.rnd.integerInRange(0,this.game.height-100);
		}
        let objeto = this.objetos.getFirstDead();
        if(objeto){
            objeto.reset(posX,posY,tipo);    
        } else{
            objeto = new Objetos(this.game, posX, posY,tipo);
        }
        this.objetos.add(objeto);
    },
	createBullet:function(posX,posY){
        let bullet = new Bullet(this.game,posX,posY,this.direccion_j);
        this.bullets.add(bullet);
    },
	DamageEnemies:function(enemigo, bala) {
		switch(this.moodplayer){
			case 'player': {this.actualizarPuntos(2,enemigo);enemigo.damage(2);}break;
			case 'player_machine': {this.actualizarPuntos(3,enemigo);enemigo.damage(3);} break;
			case 'player_silencer': {this.actualizarPuntos(1,enemigo);enemigo.damage(1); } break;
		}
		bala.kill();
	},
	actualizarPuntos:function(dano,enemigo){
		if (enemigo.health <= dano) {
			this.puntos = this.puntos + enemigo.points;
			this.puntosLabel.text = "Puntos: "+this.puntos;
			this.enemigosmuertos++;
		}
	},
	DamagePlayer:function(player,enemigo){
		this.vidas-=enemigo.attack;
		let emitter = this.game.add.emitter(this.player.x,this.player.y,50);
        emitter.makeParticles('blood');
        emitter.minParticleSpeed.setTo(-100,-100);
        emitter.maxParticleSpeed.setTo(100,100);    
        emitter.gravity = 300;
        emitter.start(true,200,null,100);
		if (this.vidas <= 0) {
			console.log(this.user_id)
			this.GameOver(player);
		}
		this.vidaLabel.text = "Vidas: "+this.vidas;

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
			case 0: {bullet.body.velocity.x=this.velocidadBala;break;}
			case 1: {bullet.body.velocity.y=this.velocidadBala;break;}
			case 2: {bullet.body.velocity.x=-this.velocidadBala;break;}
			case 3: {bullet.body.velocity.y=-this.velocidadBala;break;}
		}
		bullet.checkWorldBounds = true;
		bullet.outOfBoundsKill  = true;

    },
	EvaluarPowerUp:function(player,objeto){
		console.log("sisoy");
		console.log(objeto.tipo);
		if(objeto.tipo == 'comida'){
			if(this.vidas+20 >= 200){
				this.vidas=200;
			}else{
				this.vidas += 20;
			}
			this.vidaLabel.text = "Vidas: "+this.vidas;
		}else if(objeto.tipo == 'caja'){
			
			let arma = this.game.rnd.integerInRange(0,2);
			while(this.Armas[arma] == this.player.texture.key){
				arma = this.game.rnd.integerInRange(0,2);
			}
		    console.log(this.balas[arma]);
			this.bullets.forEach(function(element){
				element.loadTexture(this.balas[arma]);
				switch(this.moodplayer){
					case 'player':this.velocidadBala=650;break;
					case 'player_machine':this.velocidadBala=400;break;
					case 'player_silencer':this.velocidadBala=800;break;
				}
			},this);
			this.moodplayer=this.Armas[arma];
			this.player.loadTexture(this.Armas[arma]);
		}
		objeto.kill();
	},	

	alfa_numerico:function(){        
		return Math.random().toString(36).slice(2); //crea el ID aleatorio para el usuario
	},

	funcion_fecha:function(){
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //Enero es 0
		var yyyy = today.getFullYear();
		today = dd + '/' + mm + '/' + yyyy;
		return today;
	},

    writeUserData:function (user_id, score, created_at) {
        userIDID = this.alfa_numerico(); //esto va a escribir los datos del usuario en la base de datos		
        firebase.database().ref('user_scores/' + userIDID).set({          
          userID: user_id,
          Score: score,
          Fecha: created_at,
        });
    },

	Ver_Puntaje:function(){
		this.game.state.start("Scores",true,false,this.user_id); //manda al estado "Scores"
	},

	GameOver:function(player){
		this.writeUserData(this.user_id,this.puntos,this.date);
		player.kill();
		this.game.state.start("GameOver",true,false,this.user_id); 
		this.music.stop();
	}

	
}