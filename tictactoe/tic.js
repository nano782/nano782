let gameState="player-turn";// player-turn, computer-turn, game-draw, player-win,computer-win
let playerScore=0;
let computerScore=0;
let gameGrid=[0,0,0,0,0,0,0,0,0,0];
let startedWith= "player";
const WIN_POSITION=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

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

function checkWinByPlayer(playerMove) {
    for (let i = 0; i < 8; i++) {
        if(gameGrid[WIN_POSITION[i][0]]===playerMove && gameGrid[WIN_POSITION[i][1]]===playerMove && gameGrid[WIN_POSITION[i][2]]===playerMove ){
            return playerMove;
        }
    }
    return 0;
}

function checkWin(){
    let playerMove= startedWith === "player" ? 1 : 2;
    let computerMove= startedWith === "computer" ? 1 : 2;
    if (checkWinByPlayer(playerMove) === playerMove) {
        gameState="player-win";
        playerScore+=1;
        waitFunction();
    } else if (checkWinByPlayer(computerMove) === computerMove) {
        computerScore+=1;
        gameState="computer-win";
        waitFunction();
    } else {
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

function makeComputerMove() {
    let computerMove = startedWith === "computer" ? 1:2;
    let playerMove = startedWith === "player" ? 1: 2;
    for (let i = 1; i < 10; i++) {
        if (gameGrid[i] === 0) {
            gameGrid[i] = computerMove;
            if (checkWinByPlayer(computerMove) === computerMove) {
                return ;
            }
            gameGrid[i] = 0;
        }
    }
    let availablePosition = [];
    for (let i = 1; i < 10; i++) {
        if (gameGrid[i] === 0) {
            availablePosition.push(i);
            gameGrid[i] = playerMove;
            if (checkWinByPlayer(playerMove) === playerMove) {
                gameGrid[i] = computerMove;
                return;
            }
            gameGrid[i] = 0;
        }
    }
    // check if there is win position
    let randomPosition = Math.floor(Math.random() * 10000000) %availablePosition.length;
    gameGrid[availablePosition[randomPosition]] = computerMove;
}


function computerTurn(){
    setTimeout(() => {
        makeComputerMove();
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
