Menu = function(game){}

Menu.prototype = {
    preload:function(){
        this.game.load.image("Background_menu","assets/Menu/Background_menu.png");
        this.game.load.image("Start","assets/Menu/Start_button.png");
        this.game.load.image("Trabajo_Final_texto","assets/Menu/Trabajo_Final_texto.png");
        this.game.load.image("Titulo","assets/Menu/Titulo.png");
    },
    create:function(){
        //Fondo
        this.background = this.game.add.sprite(0,0,'Background_menu');
        this.background.width = this.game.width;
        this.background.height = this.game.height;
        //Trabajo_Final_texto
        this.Trabajo_Final_texto = this.game.add.sprite(0,0,'Trabajo_Final_texto');
        this.Trabajo_Final_texto.x = (this.game.width-this.Trabajo_Final_texto.width)/2;
        this.Trabajo_Final_texto.y = 200;
        //Titulo
        this.Titulo = this.game.add.sprite(0,0,'Titulo');
        this.Titulo.x = (this.game.width-this.Titulo.width)/2;
        this.Titulo.y = 320;
        //Juego
        this.Start_Button = this.game.add.sprite(0,0,'Start');
        this.Start_Button.anchor.setTo(0.5);
        this.Start_Button.scale.setTo(2);
        this.Start_Button.x = ((this.game.width-this.Start_Button.width)/2)+110;
        this.Start_Button.y = ((this.game.height-this.Start_Button.height)/2)+200;
        this.Start_Button.scale.setTo(2);
        this.Start_Button.inputEnabled = true;
        this.Start_Button.visible = true;
        this.Start_Button.events.onInputDown.add(this.click,this);
        //Integrantes
        let style = {
            fill : "#fff",
            font : "36px Arial"
        };
        this.lista_integrantes = this.game.add.text(10,0,"Integrantes: ",style);
        this.integrante1 = this.game.add.text(10,40,"Joaquín Aguirre Peralta",style);
        this.integrante2 = this.game.add.text(10,80,"Franco Vigil Bravo",style);
        this.integrante3 = this.game.add.text(10,120,"Geral Hokaid",style);        

    },
    init:function(user_id){        
        this.user_id = user_id;
    },
    click:function(){
        if (this.Start_Button.visible == true)
            this.game.state.start("Game",true,false,this.user_id);
    }

}
