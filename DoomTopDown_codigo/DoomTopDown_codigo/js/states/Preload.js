Preload = function(game){}


Preload.prototype = {
	preload:function(){
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.game.load.image("background","assets/PNG/Tiles/tile_01.png");
		this.game.load.image("player","assets/PNG/Hitman 1/hitman1_machine.png")
		this.game.load.image("bala","assets/bullet.png")
	},
	create:function(){
		this.game.state.start("Game");
	}
}