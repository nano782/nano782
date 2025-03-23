let difficultyLevel = 3;
const MAX_RING = 10;
const RING_COLORS = [
  "blue",
  "red",
  "yellow",
  "cyan",
  "green",
  "purple",
  "aqua",
  "brown",
  "darkblue",
  "darkcyan",
  "coral",
  "burlywood",
  "cadetblue",
  "goldenrod",
  "greenyellow",
  "tan",
  "teal",
  "tomato",
  "hotpink",
  "pink",
  "peru",
];

class Ring {
  constructor(
    id,
    fromLeft,
    fromTop,
    height,
    width,
    color,
    pole,
    left,
    visibility
  ) {
    this.id = id;
    this.left = left;
    this.fromLeft = fromLeft - left;
    this.fromTop = fromTop;
    this.height = height;
    this.width = width;
    this.color = color;
    this.pole = pole;
    this.visible = visibility;
  }
  updatePole(pole, poleFromLeft, poleFromTop) {
    this.pole = pole;
    this.fromLeft = poleFromLeft - this.left;
    this.fromTop = poleFromTop;
  }
}

class Pole {
  constructor(
    id,
    maxRings,
    fromLeft,
    fromTop,
    height,
    width,
    filledTop,
    ringHeight
  ) {
    this.id = id;
    this.maxRings = maxRings;
    this.filled = 0;
    this.rings = [];
    this.fromLeft = fromLeft;
    this.fromTop = fromTop;
    this.height = height;
    this.width = width;
    this.tillLeft = fromLeft + width;
    this.tillTop = fromTop + height;
    this.filledTop = filledTop;
    this.ringHeight = ringHeight;
    for (let i = 0; i < maxRings; i++) {
      this.rings.push(0);
    }
  }

  insertRing(ring) {
    if (this.filled === this.maxRings) return false;
    if (this.filled === 0 || this.rings[this.filled - 1] > ring) {
      this.rings[this.filled] = ring;
      this.filled++;
      this.filledTop -= this.ringHeight;
      return true;
    } else {
      return false;
    }
  }

  getTopRing() {
    if (this.filled === 0) return 0;
    return this.rings[this.filled - 1];
  }

  popRing() {
    if (this.filled === 0) return false;
    this.filled--;
    this.filledTop += this.ringHeight;
    return true;
  }

  getTotalRings() {
    return this.filled;
  }

  getTheRings() {
    let result = [];
    for (let i = 0; i < this.filled; i++) {
      result.push(this.rings[this.filled - i - 1]);
    }
    return result;
  }
}

class TowerOfHanoi {
  constructor(difficultyLevel, maxRings, ringColors) {
    this.maxRings = maxRings;
    this.moveCount = 0;
    this.difficultyLevel = difficultyLevel;
    this.minMove = 2 ** difficultyLevel - 1;
    let pageWidth = window.innerWidth;
    let pageHeight = window.innerHeight;
    this.posX = 0;
    this.posY = 0;
    this.activeListener = false;
    // game-dimensions
    this.gameHeight = Math.floor(pageHeight * 0.5);
    this.gameWidth = Math.floor(pageWidth > 500 ? pageWidth * 0.75 : pageWidth);
    this.fromLeft = Math.floor(pageWidth > 500 ? pageWidth * 0.125 : 0);
    this.fromTop = Math.floor(pageHeight * 0.25);
    this.tillLeft = Math.floor(
      pageWidth > 500 ? pageWidth - this.gameWidth - this.fromLeft : 0
    );
    this.tillBottom = Math.floor(pageHeight - this.gameHeight - this.fromTop);
    // Pole base dimensions
    this.poleBaseLeft = Math.floor(this.gameWidth * 0.05) + this.fromLeft;
    this.poleBaseWidth = Math.floor(this.gameWidth * 0.9);
    this.poleBaseTop = Math.floor(this.gameHeight * 0.8) + this.fromTop;
    this.poleBaseHeight = Math.floor(this.gameHeight * 0.15);
    // pole dimensions
    let poleHeight = Math.floor(this.gameHeight * 0.6);
    let poleWidth = Math.floor(this.gameWidth * 0.025);
    let poleFromTop = Math.floor(this.gameHeight * 0.2) + this.fromTop;
    let pole1FromLeft = Math.floor(this.poleBaseWidth * 0.18) + this.fromLeft;
    let pole2FromLeft = Math.floor(pole1FromLeft + this.poleBaseWidth / 3);
    let pole3FromLeft = Math.floor(pole2FromLeft + this.poleBaseWidth / 3);
    // Ring dimensions
    this.ringHeight = Math.floor((poleHeight * 0.9) / maxRings);
    let smallestRingWidth = Math.floor(poleWidth * 3);
    let ringSizeInc = Math.floor(
      (this.poleBaseWidth * 0.3 - smallestRingWidth) / maxRings
    );
    // create poles
    this.poles = [
      new Pole(
        1,
        difficultyLevel,
        pole1FromLeft,
        poleFromTop,
        poleHeight,
        poleWidth,
        this.poleBaseTop,
        this.ringHeight + 2
      ),
      new Pole(
        2,
        difficultyLevel,
        pole2FromLeft,
        poleFromTop,
        poleHeight,
        poleWidth,
        this.poleBaseTop,
        this.ringHeight + 2
      ),
      new Pole(
        3,
        difficultyLevel,
        pole3FromLeft,
        poleFromTop,
        poleHeight,
        poleWidth,
        this.poleBaseTop,
        this.ringHeight + 2
      ),
    ];
    // create rings
    this.rings = [];
    let curRingFromLeft = poleWidth;
    let curRingFromTop =
      this.poleBaseTop - difficultyLevel * (this.ringHeight + 2);
    let halfOfInc = Math.floor(ringSizeInc / 2);
    for (let i = 0; i < difficultyLevel; i++) {
      let ringWidth = Math.floor(smallestRingWidth + ringSizeInc * i);
      this.rings.push(
        new Ring(
          i + 1,
          pole1FromLeft,
          curRingFromTop,
          this.ringHeight,
          ringWidth,
          ringColors[i],
          0,
          curRingFromLeft,
          true
        )
      );
      curRingFromTop += this.ringHeight + 2;
      curRingFromLeft += halfOfInc;
    }
    // insert the rings in the first pole
    for (let i = 0; i < difficultyLevel; i++) {
      this.poles[0].insertRing(difficultyLevel - i);
    }

    this.drawBoards();
    this.updateUI();
    document.getElementById("min-move").innerHTML="Minimum Moves : " + this.minMove;
  }

  drawBoards() {
    const board = document.getElementById("game-board");
    board.style.height = this.gameHeight + "px";
    board.style.width = this.gameWidth + "px";
    board.style.left = this.fromLeft + "px";
    board.style.top = this.fromTop + "px";

    const poleBase = document.getElementById("pole-base");
    poleBase.style.height = this.poleBaseHeight + "px";
    poleBase.style.width = this.poleBaseWidth + "px";
    poleBase.style.left = this.poleBaseLeft + "px";
    poleBase.style.top = this.poleBaseTop + "px";

    for (let i = 0; i < 3; i++) {
      const pole = document.getElementById("pole" + (i + 1));
      pole.style.height = this.poles[i].height + "px";
      pole.style.width = this.poles[i].width + "px";
      pole.style.left = this.poles[i].fromLeft + "px";
      pole.style.top = this.poles[i].fromTop + "px";
    }
  }

  drawRings() {
    let res = "";
    for (let i = 0; i < this.difficultyLevel; i++) {
      res +=
        '<div class="ring" id="ring' +
        (i + 1) +
        '" style="height:' +
        this.rings[i].height +
        "px; width:" +
        this.rings[i].width +
        "px; left:" +
        this.rings[i].fromLeft +
        "px; top:" +
        this.rings[i].fromTop +
        "px; background-color:" +
        this.rings[i].color +
        ';"></div>';
    }
    return res;
  }

  updateUI() {
    if (this.activeListener) {
      document.removeEventListener("mousemove", this.activeMouseMoveListener);
      document.removeEventListener("mouseup", this.activeMouseUpListener);
      this.activeListener = false;
    }
    const rings = document.getElementById("rings-div");
    rings.innerHTML = this.drawRings();
    for (let i = 0; i < difficultyLevel; i++) {
      const curMouseDownListener = (event) => this.onMouseDown(event, i + 1);
      document
        .getElementById("ring" + (i + 1))
        .addEventListener("mousedown", curMouseDownListener);
    }
    document.getElementById("moves-count").innerHTML="Moves : " + this.moveCount;
    
    if (this.checkWin()) this.displayWinStatus();
  }

  checkWin() {
    return this.poles[2].getTotalRings() === this.difficultyLevel;
  }

  makeMove(fromPole, toPole) {
    let topRingFromPole = this.poles[fromPole].getTopRing();
    if (
      topRingFromPole !== 0 &&
      this.poles[toPole].insertRing(topRingFromPole)
    ) {
      this.poles[fromPole].popRing();
      this.rings[topRingFromPole - 1].updatePole(
        toPole,
        this.poles[toPole].fromLeft,
        this.poles[toPole].filledTop
      );
      this.moveCount++;
      return true;
    }

    return false;
  }

  onMouseDown(event, id) {
    for (let i = 0; i < 3; i++) {
      if (this.poles[i].getTopRing() === id) {
        const ring = document.getElementById("ring" + id);
        this.posX = this.rings[id - 1].fromLeft;
        this.posY = this.rings[id - 1].fromTop;
        ring.style.left = this.posX + "px";
        ring.style.top = this.posY + "px";
        this.activeMouseMoveListener = (event) => this.onMouseMove(event, id);
        this.activeMouseUpListener = (event) => this.onMouseUp(event, id);
        document.addEventListener("mousemove", this.activeMouseMoveListener);
        document.addEventListener("mouseup", this.activeMouseUpListener);
        this.activeListener = true;
        break;
      }
    }
  }

  onMouseUp(event, id) {
    // release mouse move listener
    let ringStartX = this.posX;
    let ringStartY = this.posY;
    let ringEndX = ringStartX + this.rings[id - 1].width;
    let ringEndY = ringStartY + this.rings[id - 1].height;
    for (let i = 0; i < 3; i++) {
      if (this.rings[id - 1].pole !== i) {
        let poleStartX = this.poles[i].fromLeft;
        let poleStartY = this.poles[i].fromTop;
        let poleEndX = poleStartX + this.poles[i].width;
        let poleEndY = poleStartY + this.poles[i].height;
        if (
          this.checkCollision(
            ringStartX,
            ringStartY,
            ringEndX,
            ringEndY,
            poleStartX,
            poleStartY,
            poleEndX,
            poleEndY
          )
        ) {
          if (this.makeMove(this.rings[id - 1].pole, i)) {
            break;
          }
        }
      }
    }
    const ring = document.getElementById("ring" + id);
    this.updateUI();
  }

  onMouseMove(event, id) {
    // move the ring
    const ring = document.getElementById("ring" + id);
    this.posX = event.clientX - Math.floor(this.rings[id - 1].width / 2);
    this.posY = event.clientY - Math.floor(this.ringHeight / 2);
    if (
      this.posX <= this.fromLeft ||
      this.posX >= this.gameWidth + this.fromLeft ||
      this.posY <= this.fromTop ||
      this.posY >= this.gameHeight + this.fromTop
    ) {
      this.updateUI();
    } else {
      ring.style.left = this.posX + "px";
      ring.style.top = this.posY + "px";
    }
  }

  checkCollision(x11, y11, x12, y12, x21, y21, x22, y22) {
    if (x11 > x22 || x21 > x12 || y11 > y22 || y21 > y12) return false;
    return true;
  }

  displayWinStatus() {
    console.log("won match");
    window.alert("Hurray You won the Game!");
  }
}

let myGame = new TowerOfHanoi(difficultyLevel, MAX_RING, RING_COLORS);
function resetButtonClicked(){
    if(myGame.moveCount===0){
        return;
    }
    if(confirm("The game is in progress. Do you really want to reset!")){
        delete myGame;
        myGame=new TowerOfHanoi(difficultyLevel, MAX_RING, RING_COLORS);

    }
}
function updateLevels(level){
   
   
    let canUpdate=true;
    if(myGame.moveCount>0){
        if(confirm("The game is in progress. Do you really want to switch the level!")){
            canUpdate=true;
        }else{
            canUpdate=false;
        }

        
    }
    if(canUpdate){
        
        difficultyLevel=level;
        delete myGame;
        myGame=new TowerOfHanoi(difficultyLevel, MAX_RING, RING_COLORS);
        document.getElementById("difficulty-level-btn").innerText="Difficulty level @" + difficultyLevel;
    }

}
function dropdownButtonClicked(){
    document.getElementById("difficulty").classList.toggle("show");
    console.log("print");
}
window.onclick = function(event) {
    if (!event.target.matches('.drop-btn')) {
      var dropdowns = document.getElementsByClassName("difficulty");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
