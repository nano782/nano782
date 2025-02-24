let gameState="idle";
let playerScore=0;
let computerScore=0;
let gameGrid=[0,0,0,0,0,0,0,0,0,0];

function gridButtonClicked(buttonNumber){
    if(gameState==="idle" && gameGrid[buttonNumber]===0){
        gameGrid[buttonNumber]=2;

    }
    updateUI();
}
function updateUI(){
   document.getElementById("opponent-score-text").innerHTML=playerScore;
   document.getElementById("computer-score-text").innerHTML=computerScore;
   for(let i=1; i<10; i++){
        let imagePath="./img/noicon.jpeg";
        if(gameGrid[i]===1){
            imagePath="./img/x.gif";
        }else if(gameGrid[i]===2){
            imagePath="./img/o.gif";
        }
        let gridID="grid-" + i;
        document.getElementById(gridID).src=imagePath;
   }
   if(gameState==="idle"){
        document.getElementById("game-status-text").innerHTML="Choose Your Move";


   }
}
