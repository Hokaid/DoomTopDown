GameOver = function(game){}

GameOver.prototype = {
    create:function(){
        this.backgroundGameOver = this.game.add.sprite(0,0,'Death_screen');
        this.backgroundGameOver.width = this.game.width;
        this.backgroundGameOver.height = this.game.height;
        let style = {
			fill : "#fff",
			font : "60px Arial"
		};
        this.sunLabel = this.game.add.text(this.world.centerX,this.world.centerY-200,"Game Over",style);
        this.sunLabel.anchor.setTo(0.5);
        this.restart_button = this.game.add.sprite(0,0,'restart_button');
        this.restart_button.scale.setTo(1.5);
        this.restart_button.anchor.setTo(0.5);
        this.restart_button.x = this.world.centerX;
        this.restart_button.y = ((this.game.height-this.restart_button.height)/2)+100;
        //this.restart_button.scale.setTo(2);
        this.restart_button.inputEnabled = true;
        this.restart_button.visible = true;
        this.restart_button.events.onInputDown.add(this.click,this);

    },
    click:function(){
        if (this.restart_button.visible == true)
            this.game.state.start("Game");
    }
}