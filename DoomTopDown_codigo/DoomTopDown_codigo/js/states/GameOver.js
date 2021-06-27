GameOver = function(game){}

GameOver.prototype = {
    preload:function(){
        this.game.load.image("Start","assets/Menu/Start_button.png");
    },
    create:function(){
        let style = {
			fill : "#fff",
			font : "36px Arial"
		};
        this.sunLabel = this.game.add.text(this.world.centerX-80,this.world.centerY-50,"Game Over",style);
        this.Start_Button = this.game.add.sprite(0,0,'Start');
        this.Start_Button.anchor.setTo(0.5);
        this.Start_Button.scale.setTo(2);
        this.Start_Button.x = ((this.game.width-this.Start_Button.width)/2)+110;
        this.Start_Button.y = ((this.game.height-this.Start_Button.height)/2)+200;
        this.Start_Button.scale.setTo(2);
        this.Start_Button.inputEnabled = true;
        this.Start_Button.visible = true;
        this.Start_Button.events.onInputDown.add(this.click,this);

    },
    click:function(){
        if (this.Start_Button.visible == true)
            this.game.state.start("Game");
    }
}