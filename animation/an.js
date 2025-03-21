let xIncrease=0;
let yIncrease=0;
let xMax=0;
let yMax=0;
let waitTime=0;
let xCurrent=0;
let yCurrent=0;
function animateBall(x,y,t){
    xCurrent=50;
    yCurrent=200;
    xMax=x;
    yMax=y;
    waitTime=17;
    let totalUpdate=t/waitTime;
    yIncrease=(y-yCurrent)/totalUpdate;
    xIncrease=(x-xCurrent)/totalUpdate;
    animating();

}
function animating(){
    
    if(xCurrent<=xMax && yCurrent<=yMax){
        const myBall=document.getElementById("box");
        myBall.style.top=yCurrent+ "px";
        myBall.style.left=xCurrent+ "px";
        xCurrent+=xIncrease;
        yCurrent+=yIncrease;
        setTimeout(()=>{
            animating();
        },waitTime);
    }
}