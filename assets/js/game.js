   // Var List 
   var wordHolder = document.getElementById("word");
   var usedHolder = document.getElementById("usedLetters");
   var hPic = document.getElementById("pic");
   var winPH = document.getElementById("winPH");
   var lossesPH = document.getElementById("lossesPH");
   var mistakes = 0;
   var newGameGUI = document.getElementById("newGame");
   var winnerGUI = document.getElementById("WinnerGUI");
   var wins = 0;
   var losses = 0;
   var gAudio = document.getElementById("gAudio"); 
   var bAudio = document.getElementById("bAudio"); 
   var wAudio = document.getElementById("wAudio"); 
   var lAudio = document.getElementById("lAudio"); 
   var ngAudio = document.getElementById("ngAudio"); 
   var eAduio = document.getElementById("eAudio"); 
   var gameEnded = false;
   var wordBank = [
       "hop", "dart", "race",
       "spy", "agree", "peer","first", "aid" , "fold"
   ];
   var CantUse = [

   ];




   var wordChosen = "placeHolder";
   var lengthOfWord = 100;

   winPH.textContent = wins;
   lossesPH.textContent = losses;

   var changePic = function () {

      


       if (mistakes == 0) {
           hPic.src = "./assets/images/h1.png"
       }
       if (mistakes == 1) {
           hPic.src = "./assets/images/h2.png";
       }
       if (mistakes == 2) {
           hPic.src = "./assets/images/h3.png";
       }
       if (mistakes == 3) {
           hPic.src = "./assets/images/h4.png";
       }
       if (mistakes == 4) {
           hPic.src = "./assets/images/h5.png";
       }
       if (mistakes == 5) {
           hPic.src = "./assets/images/h6.png";
       }
       if (mistakes == 6) {
           hPic.src = "./assets/images/h7.png";
       }
       if (mistakes == 7) {
           hPic.src = "./assets/images/h8.png";
       }
       if (mistakes == 8) {
           hPic.src = "./assets/images/h9.png";
       }
       if (mistakes == 9) {
            gameEnded = true;
           hPic.src = "./assets/images/Full.png";
           losses++;
           winnerGUI.textContent = "! Loser !"
           winnerGUI.classList.remove("hide");
           newGameGUI.classList.remove("hide");
           lAudio.play();
          

       }
   }

   var chooseAWord = function () {
       var randomNum = Math.floor(Math.random() * wordBank.length);
       CantUse = [];
       wordChosen = wordBank[randomNum];
       lengthOfWord = wordChosen.length;
       wordHolder.innerHTML = " ";
       

       for (i = 0; i < wordChosen.length; i++) {

           var newLetter = document.createElement("div");
           newLetter.className = "overlay";
           newLetter.textContent = "_";
           var Subelement = document.createElement("div")
           Subelement.className = " letter " + " hide ";
           Subelement.id = "num" + i;
           Subelement.textContent = wordChosen.charAt(i);
           newLetter.appendChild(Subelement);
           wordHolder.append(newLetter);

       }
       changePic();
   }
   chooseAWord();

   document.onkeyup = function (event) {

       var keyPressed = event.key;
       var wasTheirALetter = false;
       var letterPassed = false;
       var PassOrFail = false;

       if ( (keyPressed == "Enter") && (gameEnded == true)){
        
        newGameYO();
       
       }
       console.log("Key Pressed: " + keyPressed);

       //
       var letterCheck = function () {
           for (i = 0; i < wordChosen.length; i++) {

               var myElement = document.getElementById("num" + i);

               if (keyPressed == myElement.innerHTML) {
                   myElement.classList.remove("hide");

                   wasTheirALetter = true;

                   lengthOfWord--;
                   gAudio.currentTime = 0;
                    gAudio.play();
               }
               


           }
       }

       for (j = 0; j < CantUse.length+1; j++) {
           console.log("Key Pressed : " + keyPressed + " Array Check: " + CantUse[j]);
           console.log("--------------");

           if (keyPressed == CantUse[j]) {
               
              
               PassOrFail = true;
               wasTheirALetter = true;
               j = 100;

               // do Nothing
               
               
           } else {
               
              
           }

           

       }
       console.log(PassOrFail);
       if ( PassOrFail == false){
           letterCheck();
       }  else
       {
           eAduio.play();
           alert("Letter "+ keyPressed + " has been used!");
       }

       CantUse.push(keyPressed);

      
       // console.log(letterPassed);



    
       if (wasTheirALetter == false) {
           if (keyPressed == "Enter"){
            // Do nothing 
           }else{
           var newLetter = document.createElement("div");
           newLetter.textContent = keyPressed ;
           newLetter.className = "col-sm-1";
        //    if (newLetter.tabIndex == "Enter"){
        //     newLetter.className= "col-sm-1" + " hide ";
        //    }

           usedHolder.append(newLetter);
           mistakes += 1;
           letterCheck();
           console.log(CantUse);
           bAudio.currentTime = 0;
           bAudio.play();
        }

       } else {
           
           console.log(CantUse);

       }

       // console.log("mistakes: " + mistakes);
       if (lengthOfWord == 0) {


           // You Won The Game
            gameEnded = true;
            wAudio.play();
           wins++;
           winnerGUI.textContent = "! Winner !"
           winnerGUI.classList.remove("hide");
           newGameGUI.classList.remove("hide");
       


       }


       changePic();

       // console.log(lengthOfWord);
       winPH.textContent = wins;
       lossesPH.textContent = losses;

       //

   }

   var newGameYO = function(){
    ngAudio.play();
    
    wordHolder.innerHTML = " ";
    winnerGUI.classList.add("hide");
    newGameGUI.classList.add("hide");
    usedHolder.innerHTML = "";
    mistakes = 0;
    CantUse = [];
    chooseAWord();
   
   }

   newGameGUI.onmouseup = function () {
       newGameYO();

   };