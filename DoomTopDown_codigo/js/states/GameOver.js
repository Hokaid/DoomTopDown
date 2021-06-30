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
        this.sunLabel = this.game.add.text(this.world.centerX+900,this.world.centerY-200,"Game Over",style);
        this.sunLabel.anchor.setTo(0.5);
        //boton restart
        this.restart_button = this.game.add.sprite(0,0,'restart_button');
        this.restart_button.scale.setTo(1.5);
        //this.restart_button.anchor.setTo(0.5);
        this.restart_button.x = 20;
        this.restart_button.y = this.game.height-100;
        this.restart_button.inputEnabled = true;
        this.restart_button.visible = true;
        this.restart_button.events.onInputDown.add(this.click,this);

        //imagen game over
        this.gameoverpng = this.game.add.sprite(0,0,'gameoverpng');
        this.gameoverpng.anchor.setTo(0.5);
        this.gameoverpng.x = this.world.centerX+150;
        this.gameoverpng.y = this.game.height-50; 

        //FIREBASE
        this.scores = this.game.add.text(this.game.world.centerX,this.game.world.centerY-310,'Puntajes');
        this.scores.fill = "#FFFFFF";
        //imprimimos los 
        this.userid = this.game.add.text(this.game.world.centerX-300,this.game.world.centerY-250,'User ID')
        this.userid.fill = "#FFFFFF";
        this.scores_final = this.game.add.text(this.game.world.centerX,this.game.world.centerY-250,'Scores')
        this.scores_final.fill = "#FFFFFF";
        this.fechas_f = this.game.add.text(this.game.world.centerX+300,this.game.world.centerY-250,'Fechas')
        this.fechas_f.fill = "#FFFFFF";

        const query = firebase.database().ref('user_scores').limitToLast(10); //muestra hasta un máximo de 10 users

        query.once('value', function (snapshot) {  
            //guardamos los datos en arreglo llamado "imprimir" y luego lo imprimimos 
            imprimir = snapshot.val();   
            cont = 0;
            for(var i in imprimir){
                cont += 50; 
                this.userid = this.game.add.text(this.game.world.centerX-300,(this.game.world.centerY-250)+cont,imprimir[i].userID);
                this.userid.fill = "#FFFFFF";
                this.scores_final = this.game.add.text(this.game.world.centerX,(this.game.world.centerY-250)+cont,imprimir[i].Score);
                this.scores_final.fill = "#FFFFFF";
                this.fechas_f = this.game.add.text(this.game.world.centerX+300,(this.game.world.centerY-250)+cont,imprimir[i].Fecha);
                this.fechas_f.fill = "#FFFFFF";       
            }
        },this);

    },
    init:function(user_id){           
        this.user_id = user_id;
    },
    click:function(){
        if (this.restart_button.visible == true)
            this.game.state.start("Game",true,false,this.user_id);
    }
}