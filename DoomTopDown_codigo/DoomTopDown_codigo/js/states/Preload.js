Preload = function(game){}


Preload.prototype = {
	preload:function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;

		//cargar jugador
		this.game.load.image("player","assets/Player/hitman1_machine.png")
		this.game.load.image("bala","assets/Player/bullet.png")
		//cargar mapa
		this.game.load.image("background","assets/Mapa/Tiles/tile_01.png");
		
	
		
	},
	create:function(){
		this.game.state.start("Game");
	}
}