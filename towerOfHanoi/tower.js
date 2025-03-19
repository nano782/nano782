// let playerScore=0;
// let totalRings=3;
// let ringSize=[0,0,0];
// let gameState="player-move";
// let startedWith="player";


// function insertRing(ringSize){
//     let emptyPole;
//     if(emptyPole===0){
//         document.getElementById("ring1").innerHTML=ringSize;
//         document.getElementById("ring2").innerHTML=ringSize;
//         document.getElementById("ring3").innerHTML=ringSize;
//         return true;
//     }else if(ringSize>0){
//         document.getElementById("ring1").innerHTML=ringSize;
//         document.getElementById("ring2").innerHTML=ringSize;
//         document.getElementById("ring3").innerHTML=ringSize;
//         return true;
//     }else{
//         return false;
//     }
let newX=0, newY=0, startX=0,startY=0;
// const ring2=document.getElementById("ring2");
let ring1=document.getElementById("ring1");
// const ring3=document.getElementById("ring3");
ring1.addEventListener('mousedown', mouseDown);

function mouseDown(e){
    startX=e.clientX;
    startY=e.clientY;
    console.log(startX, startY);
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
    

}
function mouseMove(e){
    newX=startX-e.clientX;
    newY=startY-e.clientY;

    startX=e.clientX;
    startY=e.clientY;
    document.getElementById("moves").innerHTML = e.clientX;

    // ring2.style.top=(ring1.offsetTop - newY) + 'px';
    // ring2.style.left=(ring1.offsetLeft - newX) + 'px';
    ring1.style.top=startY + 'px';
    ring1.style.left=startX + 'px';
    // ring3.style.top=(ring1.offsetTop - newY) + 'px';
    // ring3.style.left=(ring1.offsetLeft - newX) + 'px';

}
function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove);
    
}