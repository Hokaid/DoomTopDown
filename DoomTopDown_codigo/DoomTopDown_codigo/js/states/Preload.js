Preload = function(game){}


Preload.prototype = {
	preload:function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

		//cargar jugador
		this.game.load.image("player","assets/Player/hitman1_gun.png")
		this.game.load.image("bala","assets/Player/bullet.png")
		//cargar mapa
		this.game.load.image("background","assets/Mapa/Tiles/tile_01.png");
		this.game.load.image("blood","assets/images/blood.png");
		//cargar enemigos
		this.game.load.image("robot","assets/Enemies/Robot/robot1_hold.png")
		this.game.load.image("soldier","assets/Enemies/Soldier/soldier1_hold.png")
		this.game.load.image("zombie","assets/Enemies/Zombie/zoimbie1_hold.png")
		//cargar JSON
		this.game.load.text("enemigosData","assets/Enemies/Enemigos.json");	
		
	},
	create:function(){
		this.game.state.start("Game");
	}
}