<?php
 ?>
<!DOCTYPE html>
<html>
<head>
	<title>Juego yei!</title>
</head>
<body>

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.6.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.5.0/firebase-database.js"> //Biblioteca de Realtime Database </script>

<script>
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBfmzrsxZEPpAW6wTTuBwB7LWTFC8r_Cuo",
    authDomain: "tp-desarrollovideojuegos.firebaseapp.com",
    databaseURL: "https://tp-desarrollovideojuegos-default-rtdb.firebaseio.com",
    projectId: "tp-desarrollovideojuegos",
    storageBucket: "tp-desarrollovideojuegos.appspot.com",
    messagingSenderId: "491034983248",
    appId: "1:491034983248:web:39ff8ec78b6fa8d3a7ca55",
    measurementId: "G-GQKWW9ED32"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.database();
  
</script>



<script type="text/javascript" src="lib/phaser.min.js"></script>
<script type="text/javascript" src="js/prefabs/Bullet.js?v=<?php echo time() ?>"></script>
<script type="text/javascript" src="js/prefabs/Objetos.js?v=<?php echo time() ?>"></script>
<script type="text/javascript" src="js/prefabs/Enemigo.js?v=<?php echo time() ?>"></script>
<script type="text/javascript" src="js/states/Preload.js?v=<?php echo time() ?>"></script>
<script type="text/javascript" src="js/states/Game.js?v=<?php echo time() ?>"></script>
<script type="text/javascript" src="js/states/GameOver.js?v=<?php echo time() ?>"></script>
<script type="text/javascript" src="js/states/Menu.js?v=<?php echo time() ?>"></script>
<script type="text/javascript" src="js/main.js?v=<?php echo time() ?>"></script>
</body>
</html>