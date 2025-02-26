let gameState="player-turn";// player-turn, computer-turn, game-draw, player-win,computer-win
let playerScore=0;
let computerScore=0;
let gameGrid=[0,0,0,0,0,0,0,0,0,0];
let startedWith= "player";

function gridButtonClicked(buttonNumber){
    if(gameState==="player-turn" && gameGrid[buttonNumber]===0){
        if(startedWith==="player"){
            gameGrid[buttonNumber]=1;
        }else{
            gameGrid[buttonNumber]=2;
        }
        checkWin();

    }
    updateUI();
}



function updateUI(){
   document.getElementById("opponent-score-text").innerHTML=playerScore;
   document.getElementById("computer-score-text").innerHTML=computerScore;
   for(let i=1; i<10; i++){
        let imagePath="./img/noicon.jpeg";
        if(gameGrid[i]===1){
            imagePath="./img/Xx.png";
        }else if(gameGrid[i]===2){
            imagePath="./img/Oo.png";
        }
        let gridID="grid-" + i;
        document.getElementById(gridID).src=imagePath;
   }
   if(gameState==="player-turn"){
        document.getElementById("game-status-text").innerHTML="Choose Your Move!";
        document.getElementById("searching-icon").style.display="none";
        


   }else if(gameState==="computer-turn"){
        document.getElementById("game-status-text").innerHTML="Computer is thinking!";
        document.getElementById("searching-icon").style.display="block";
        
   }else {
        if(gameState==="game-draw"){
            document.getElementById("game-status-text").innerHTML="Match is Draw!";

        }else if(gameState==="player-win"){
            document.getElementById("game-status-text").innerHTML="Hurray! You Won :)";
        }else{
            document.getElementById("game-status-text").innerHTML="Oh! You lost the game :(";
        }
    
    document.getElementById("searching-icon").style.display="none";
    
   }
}



function checkWin(){
    if(gameGrid[1]===gameGrid[2] && gameGrid[2]===gameGrid[3] && gameGrid[1]!==0){
        if(startedWith==="player" && gameGrid[1]===1){
            gameState="player-win";
            playerScore+=1;
        }else if(startedWith==="computer" && gameGrid[1]===2){
            gameState="player-win";
            playerScore+=1;
        }else{
            gameState="computer-win";
            computerScore+=1;
        }

        waitFunction();
    }else if(gameGrid[4]===gameGrid[5] && gameGrid[5]===gameGrid[6] && gameGrid[4]!==0){
        if(startedWith==="player" && gameGrid[4]===1){
            gameState="player-win";
            playerScore+=1;
        }else if(startedWith==="computer" && gameGrid[4]===2){
            gameState="player-win";
            playerScore+=1;
        }else{
            gameState="computer-win";
            computerScore+=1;
        }

        waitFunction();
    }else if(gameGrid[7]===gameGrid[8] && gameGrid[8]===gameGrid[9] && gameGrid[7]!==0){
        if(startedWith==="player" && gameGrid[7]===1){
            gameState="player-win";
            playerScore+=1;
        }else if(startedWith==="computer" && gameGrid[7]===2){
            gameState="player-win";
            playerScore+=1;
        }else{
            gameState="computer-win";
            computerScore+=1;
        }

        waitFunction();
    }else if(gameGrid[1]===gameGrid[4] && gameGrid[4]===gameGrid[7] && gameGrid[1]!==0){
        if(startedWith==="player" && gameGrid[1]===1){
            gameState="player-win";
            playerScore+=1;
        }else if(startedWith==="computer" && gameGrid[1]===2){
            gameState="player-win";
            playerScore+=1;
        }else{
            gameState="computer-win";
            computerScore+=1;
        }

        waitFunction();
    }else if(gameGrid[2]===gameGrid[5] && gameGrid[5]===gameGrid[8] && gameGrid[2]!==0){
        if(startedWith==="player" && gameGrid[2]===1){
            gameState="player-win";
            playerScore+=1;
        }else if(startedWith==="computer" && gameGrid[2]===2){
            gameState="player-win";
            playerScore+=1;
        }else{
            gameState="computer-win";
            computerScore+=1;
        }

        waitFunction();
    }else if(gameGrid[3]===gameGrid[6] && gameGrid[6]===gameGrid[9] && gameGrid[3]!==0){
        if(startedWith==="player" && gameGrid[3]===1){
            gameState="player-win";
            playerScore+=1;
        }else if(startedWith==="computer" && gameGrid[3]===2){
            gameState="player-win";
            playerScore+=1;
        }else{
            gameState="computer-win";
            computerScore+=1;
        }

        waitFunction();
    }else if(gameGrid[1]===gameGrid[5] && gameGrid[5]===gameGrid[9] && gameGrid[1]!==0){
        if(startedWith==="player" && gameGrid[1]===1){
            gameState="player-win";
            playerScore+=1;
        }else if(startedWith==="computer" && gameGrid[1]===2){
            gameState="player-win";
            playerScore+=1;
        }else{
            gameState="computer-win";
            computerScore+=1;
        }

        waitFunction();
    }else if(gameGrid[3]===gameGrid[5] && gameGrid[5]===gameGrid[7] && gameGrid[5]!==0){
        if(startedWith==="player" && gameGrid[3]===1){
            gameState="player-win";
            playerScore+=1;
        }else if(startedWith==="computer" && gameGrid[3]===2){
            gameState="player-win";
            playerScore+=1;
        }else{
            gameState="computer-win";
            computerScore+=1;
        }

        waitFunction();
    }else {
        let empytyBox=false;
        for(let i=1; i<10; i++ ){
            if(gameGrid[i]===0){
                empytyBox=true;
            }
        }
        if(empytyBox){
            if(gameState==="player-turn"){
                gameState="computer-turn";
                computerTurn();
            }else{
                gameState="player-turn";
            }
        }else{
            gameState="game-draw";
            waitFunction();
        }

    }
}



function computerTurn(){
    setTimeout(() => {
        let availablePosition=[];
        for(let i=1; i<10; i++){
            if(gameGrid[i]===0){
                availablePosition.push(i);
            }
        }
        let val=Math.floor(Math.random() * 10000000) %availablePosition.length;
        if(startedWith==="player"){
            gameGrid[availablePosition[val]]=2;
        }else{
            gameGrid[availablePosition[val]]=1;
        }
        checkWin();
        updateUI();
    }, 2000);
    
}


function waitFunction(){
    setTimeout(() => {
        for(let i=1; i<10; i++){
            gameGrid[i]=0;
        }
        if(startedWith==="player"){
            gameState="computer-turn";
            startedWith="computer";
            computerTurn();
        }else{
            gameState="player-turn";
            startedWith="player";
        }
        updateUI();
    }, 4000);
}
