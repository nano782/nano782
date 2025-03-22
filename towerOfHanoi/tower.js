let difficultyLevel = 1;

class Ring {
    constructor(size, x, y, height, width, color, pole) {
        this.size = size;
        this.X = x;
        this.Y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.pole = pole;
    }
}


class Pole {
    constructor(maxRings, startX, startY, endX, endY, sensitive_area) {
        this.maxRings = maxRings;
        this.filled = 0;
        this.rings = [];
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.sensitive_area = sensitive_area;
        for (let i = 0; i < maxRings; i++) {
            this.rings.push(0);
        }
    }
    
    insertRing(ring) {
        if (this.filled === this.maxRings) return false;
        if (this.filled === 0 || this.rings[this.filled-1] > ring) {
            this.rings[this.filled]= ring;
            this.filled++;
            return true;
        } else {
            return false;
        }
    }
    
    getTopRing() {
        if (this.filled === 0) return 0;
        return this.rings[filled-1];
    }
    
    popRing() {
        if (this.filled === 0) return false;
        this.filled--;
        return true;
    }
    
    getTotalRings() {
        return this.filled;
    }
    
    getTheRings() {
        let result = [];
        for (let i = 0; i < this.filled; i++) {
            result.push(this.rings[this.filled-i-1]);
        }
        return result;
    }
}



class TowerOfHanoi {
    constructor(difficultyLevel, startX, startY, endX, endY) {
        this.moveCount = 0;
        this.difficultyLevel = difficultyLevel;
        this.minMove = 2**difficultyLevel - 1;
        const ringColors = ["blue", "red", "yellow", "cyan"];
        // create poles
        this.poles = [new Pole(difficultyLevel, 0, 0, 0, 0, 0),
        new Pole(difficultyLevel, 0, 0, 0, 0, 0),
        new Pole(difficultyLevel, 0, 0, 0, 0, 0)];        
        // create rings
        this.rings = [];
        for (let i = 0; i < difficultyLevel; i++) {
            this.rings.push(new Ring(i+1, 0, 0, 30, 50*(i+1), ringColors[i], 1));
        }
        
        // insert the rings in the first pole
        for (let i = 0; i < difficultyLevel; i++) {
            this.poles[0].insertRing(difficultyLevel - i);
        }
        this.drawRings();
    }

    drawBoards() {
        document.getElementById("game-board").innerHTML = 
        '<div class="board-area" id="pole-base"></div>\
            <div class="pole-area pole1" id="pole1"></div>\
            <div class="pole-area pole2" id="pole2"></div>\
            <div class="pole-area pole3"></div>';
    }
    
    drawRings() {
        let res = "";
        for (let i = 0; i < this.difficultyLevel; i++) {
            let res = "<div id='ring"+(i+1)+"' ";
            // remaining styling
            
            res += "<div>";
        }
        return res;
    }
    updateUI(){
        
        
    }
    
    checkWin() {
        return this.poles[2].getTotalRings() === this.difficultyLevel;
    }
    
    onMoveDown(event) {
        // add on mouse move listener
    }
    
    onMouseUp(event) {
        // release mouse move listener
    }
    
    onMouseMove(event) {
        // move the ring
    }
}


let game = new TowerOfHanoi(4, 50, 50, 200, 200);
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
    document.getElementById("moves").innerHTML = e.clientX + ", "+ e.clientY;

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



let myGame = new TowerOfHanoi(difficultyLevel, 0, 0, 500, 500);
myGame.updateUI();