let xIncrease=0;
let yIncrease=0;
let waitTime=0;
let xCurrent=50;
let yCurrent=200;
let totalUpdate=0;
let isMoving=false;
let goingForward=true;
function animateBall(t){
    if(isMoving===false){
       isMoving=true;
       let x=0;
       let y=0;
       if(goingForward===true){
        x=1000;
        y=200;
        goingForward=false;
       }else{
        x=50;
        y=200;
        goingForward=true;
       }
        waitTime=17;
        totalUpdate=t/waitTime;
        yIncrease=(y-yCurrent)/totalUpdate;
        xIncrease=(x-xCurrent)/totalUpdate;
        animating();

    }
    

}
function animating(){
    
    if(totalUpdate>0){
        const myBall=document.getElementById("box");
        myBall.style.top=yCurrent+ "px";
        myBall.style.left=xCurrent+ "px";
        xCurrent+=xIncrease;
        yCurrent+=yIncrease;
        totalUpdate--;
        setTimeout(()=>{
            animating();
        },waitTime);
    }else{
        isMoving=false;
    }
}