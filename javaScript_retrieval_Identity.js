"use strict";

    // Variables Globales----------------------------------------------
    
    const leCanvas = document.getElementById('monCanvas');
    const ctx = leCanvas.getContext('2d');
    leCanvas.width = 650;
    leCanvas.height= 380;
    var rect = leCanvas.getBoundingClientRect();
    var score=0;
    var imageCV = document.querySelectorAll('.cvAppear');
    var c =0;
    var startGameBtn = document.getElementById('startGameBtn');
    var modelElement = document.getElementById('modelElement');
    var tempsEcoule = 0;
    
    //  Création prototype pour toutes mes chauves-souris-----------
    class Bats {
        constructor(){
            this.width = 44;
            this.height= 45;
            this.frameX=0;
            this.frameY=0;
            this.x = Math.floor(Math.random()*520);
            this.y= Math.floor(Math.random()*250);
            this.dx= 7;
            this.dy= -7;
        }
        draw(){
            dessinerBat(images.bat,this.frameX*this.width,this.frameY*this.height,this.width,this.height,this.x,this.y,this.width*2.5,this.height*2.5);
            if (this.frameX<2){
                this.frameX++;
            }else{
                this.frameX=0;
            }
        
        }
        moveBat () {
            
                       bats[i].x += bats[i].dx;
                       bats[i].y += bats[i].dy;
        }
        detectCollision () {
           
            if ( ((bats[i].y <= 0) || (bats[i].y + (this.height + 45)) >= leCanvas.height)) {
                this.dy = -this.dy;
                //console.log('je tape en haut ou en bas')
            }
    
            if (((bats[i].x + (this.width + 45)) >= leCanvas.width) || (bats[i].x <= 0)) {
                this.dx = -this.dx;
                //console.log('je tape à droite ou à gauche')
            }
         }}

     // Création des chauves souris----------------------------------------------
    var images={};
    images.bat = new Image();
    images.bat.src="./images/bat-SWEN-red.png";
    var bats = [];
    const numberOfBats = 5;
    for (var i=0;i<numberOfBats;i++){
        bats.push(new Bats());
    }
    
    
     // Canvas- prototype pour dessiner----------------------------
    
    var dessinerBat = function (img,sx,sy,sw,sh,dx,dy,dw,dh){
        ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);
    
    };

    // Fonction principale pour faire dessiner/faire intéragir les chauves souris-------------------------
    
    var animerSprite= function(){
        ctx.clearRect(0,0,leCanvas.width,leCanvas.height);
        afficheTemps();
        for(i=0;i<bats.length;i++){
            bats[i].draw();
            bats[i].moveBat();
            bats[i].detectCollision();
            ctx.fillStyle= 'yellowgreen';
            ctx.font = "25px comic";
            ctx.fillText('score: '+ score,10, 20);
            
        } 
        };

    // Appel de la principale fonction au chargement de la page----------------------------------------------

    startGameBtn.addEventListener('click',function(){
        modelElement.style.display ='none';
        var animation = setInterval(animerSprite, 150);
        var idInterval = setInterval(function(){
            tempsEcoule ++;
            // afficheTemps();
            if(tempsEcoule === 900) {
              alert("C'est dommage! Tu me sauveras une prochaine fois");
              clearInterval(animation);
              clearInterval(idInterval);
              document.location.reload();
              modelElement.style.display ='flex';
              tempsEcoule=0;

    }},60);});
        
     // Fonction permettant de repérer l'intersection entre coordonnées souris et coordonnées chauves-souris pour click et mort des chauve-sours------------------------------------------------------------------------------------------------------------
     
     function isIntersect(point, bat) {
        return ((point.x>=bat.x) && (bat.x +90 > point.x) && (bat.y <=point.y) && (bat.y +90>= point.y));
      }
      
      leCanvas.addEventListener('click', (e) => {
        const pos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        bats.forEach(bat => {
          if (isIntersect(pos, bat)) {
            score++;
            imageCV[c].style.display = 'block';
            imageCV[c].style.alignItems = 'center';
            bats.splice(bat,1);
            setTimeout(function(){
            imageCV[c].style.display = 'none';
            c++;},3700);
         if(bats.length ===0){
                  setTimeout(function(){
                      alert('Bravo! Grâce à toi, je me rappelle de qui je suis.' + "🥳"+ " " + "Tu peux maintenant accéder à mon CV complet en cliquant sur CV complet à gauche de la fenêtre");
                      
                      document.location.reload();
                    },4000);}
        }});});

    // Fonction permettant de garder le même size même si on redimmensionne -------------------------------------------------------
    window.addEventListener('resize',function() {
        leCanvas.height=380;
        leCanvas.width=650;
    });
// Fonction affiche le temps restant ------------------------------------------------------------------------------------------------------------------------
    
var afficheTemps = function (){
    ctx.fillStyle= 'yellowgreen';
    ctx.font = "25px comic";
    ctx.fillText('temps' +" "+'restant:'+ (15 - (Math.floor(tempsEcoule/60))) +"s",400, 20)};
    