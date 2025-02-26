let playerScore=0;
let computerScore=0;
let computerAction="loading";
let playerAction="loading";
let gameState="idle";
let winStatus="Choose Your Move!";
function computerTurn(){
    let val=Math.floor(Math.random() * 10000000) %3;
    
    if(val===0){
        return "rock";
    }
    if(val===1){
        return "paper";
    }
    return "scissor";
}
    
function calculateWin(computerMove, playerMove){
    gameState="play";
    computerAction=computerMove;
    playerAction=playerMove;
    if(computerMove!==playerMove){
        if(computerMove==="rock"){
            if(playerMove==="paper"){
                playerScore=playerScore+1;
                winStatus="Hurray! You won the match";
            }
            else if(playerMove==="scissor"){
                computerScore=computerScore+1;
                winStatus="Oh! You lost the match";
            }
        }else if(computerMove==="paper"){
            if(playerMove==="scissor"){
                playerScore=playerScore+1;
                winStatus="Hurray! You won the match";
            }
            else if(playerMove==="rock"){
                computerScore=computerScore+1;
                winStatus="Oh! You lost the match";
            }
        }else if(computerMove==="scissor"){
            if(playerMove==="paper"){
                computerScore=computerScore+1;
                winStatus="Oh! You lost the match";
            }
            else if(playerMove==="rock"){
                playerScore=playerScore+1;
                winStatus="Hurray! You won the match";
            }
        }
    }else{
        winStatus="It's a Draw!"
    }
    updateUI();
    setTimeout(() => {
        gameState="idle";
        playerAction="loading";
        computerAction="loading";
        winStatus="Choose Your Move!";
        updateUI();
    }, 3000);
    
    
}
function updateUI(){
    document.getElementById("player-score-text").innerHTML=playerScore;
    document.getElementById("computer-score-text").innerHTML=computerScore;
    document.getElementById("status-text").innerHTML=winStatus;

    if(playerAction==="rock"){
        document.getElementById("player-result").src="./img/rock.png";

    }else if(playerAction==="paper"){
        document.getElementById("player-result").src="./img/paper.png";
    }else if(playerAction==="scissor"){
        document.getElementById("player-result").src="./img/scissor.png";
    }else{
        document.getElementById("player-result").src="./img/loading.gif";
    }
    if(computerAction==="rock"){
        document.getElementById("computer-result").src="./img/rock.png";

    }else if(computerAction==="paper"){
        console.log("paper");
        document.getElementById("computer-result").src="./img/paper.png";
    }else if(computerAction==="scissor"){
        document.getElementById("computer-result").src="./img/scissor.png";
    }else{
        document.getElementById("computer-result").src="./img/loading.gif";
    }



}


function buttonSelected(buttonName){
    if(gameState==="idle"){
        if(buttonName==="rock" || buttonName==="paper" || buttonName==="scissor"){
            calculateWin(computerTurn(), buttonName);
            
        }
    }
    
    
    
}