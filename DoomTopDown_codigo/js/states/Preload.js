Preload = function(game){}


Preload.prototype = {
	preload:function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		

		//cargar jugador
		this.game.load.image("player","assets/Player/hitman1_gun.png")
		this.game.load.image("player_machine","assets/Player/hitman1_machine.png")
		this.game.load.image("player_silencer","assets/Player/hitman1_silencer.png")
		this.game.load.image("bala","assets/Player/bullet.png")
		this.game.load.image("bala_machine","assets/Mapa/Tiles/tile_318.png")
		this.game.load.image("bala_silenciadora","assets/Mapa/Tiles/tile_187.png")
		//cargar mapa
		this.game.load.image("background","assets/Mapa/Tiles/tile_01.png");
		this.game.load.image("blood","assets/images/blood.png");
		//cargar enemigos
		this.game.load.image("robot","assets/Enemies/Robot/robot1_hold.png")
		this.game.load.image("soldier","assets/Enemies/Soldier/soldier1_hold.png")
		this.game.load.image("zombie","assets/Enemies/Zombie/zoimbie1_hold.png")
		//cargar JSON
		this.game.load.text("enemigosData","assets/Enemies/Enemigos.json");	
		//cargar objetos
		this.game.load.image("comida","assets/Mapa/Tiles/tile_215.png")
		this.game.load.image("caja","assets/Mapa/Tiles/tile_157.png")
		//Pantalla gameOver
		this.game.load.image("Death_screen","assets/images/Death_screen.png")
		this.game.load.image("restart_button","assets/images/restart_button.png")

		//FIREBASE
		this.user_id = this.alfa_numerico();
		
	},
	create:function(){
		this.game.state.start("Menu",true,false,this.user_id);
	},
	alfa_numerico:function(){
		return Math.random().toString(36).slice(2);
	},
}