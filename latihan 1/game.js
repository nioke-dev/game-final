var a = document.getElementById("score_bar");
var b = document.getElementById("background");
var c = document.getElementById("piano");
var d = document.getElementById("rules");
var e = document.getElementById("keys");

var context = c.getContext("2d");
var context_back = b.getContext("2d");
var context_score = a.getContext("2d");

var virus = new Image();
virus.src = "virus.png";
var virus_mati = new Image();
virus_mati.src = "virus_mati.png";

var numOfTiles = 5;
var myScore = 0;
var myTimes = 0;
var myFails = 0;
var eachState = [false, false, false, false, false];
var myTiles = [];

var intervalTmp;
var geneTmp;
// paintWindow();
firstReload();
// paintScoreBar();

function firstReload() {
  context_score.font = "30px Verdana";
  context_score.textAlign = "center";
  context_score.fillStyle = "white";
  context_score.fillText("My Score :" + myScore, 150, 30);

  context_score.font = "30px Verdana";
  context_score.textAlign = "center";
  context_score.fillStyle = "white";
  context_score.fillText("Fails :" + myFails, 150, 100);

  paintWindow();
}

function paintWindow() {
  context_back.fillStyle = 'blue';
  context_back.fillRect(0,0, 300, 600);


  context_back.fillStyle = 'red';
  context_back.globalAlpha = '0.7';
  context_back.fillRect(0,500,300,100);
  

  context_back.beginPath();
  context_back.moveTo(75,0);
  context_back.lineTo(75,600);
  context_back.strokeStyle = 'white';
  context_back.stroke();

  context_back.beginPath();
  context_back.moveTo(150,0);
  context_back.lineTo(150,600);
  context_back.strokeStyle = 'white';
  context_back.stroke();

  context_back.beginPath();
  context_back.moveTo(225,0);
  context_back.lineTo(225,600);
  context_back.strokeStyle = 'white';
  context_back.stroke();

  context_back.beginPath();
  context_back.moveTo(0,500);
  context_back.lineTo(300,500);
  context_back.strokeStyle = 'white';
  context_back.stroke();

}

document.getElementById("btn").addEventListener("click", function () {
  content = document.getElementById("btn_start");
  if (content.innerHTML == "START" || content.innerHTML == "GG") {
    intervalTmp = window.setInterval(Update, 1);
    geneTmp = window.setInterval(geneBlock, 1000);
    content.innerHTML = "PAUSE";
  } else {
    window.clearInterval(intervalTmp);
    window.clearInterval(geneTmp);
    content.innerHTML = "START";
  }
});

function paintScoreBar() {
  context_score.fillStyle = "orange";
  context_score.fillRect(0, 0, 300, 600);
}


// context.drawImage(
//   virus,
//   10,
//   10,
//   80,
//   80,
//   myTiles[i].x,
//   myTiles[i].y,
//   70,
//   120
// );

function Update() {
  //check keyCode whether correct
  // var textwidth = context_score.measureText(myScore.toString()).width;

  // kurang dari 470 dan lebih dari 350
  // 65,83,68,70
  
  // mengatur score bar
  
  context_score.fillStyle = 'white';
  context_score.textAlign = 'center';
  context_score.fontSize = '30px Arial';
  context_score.clearRect(0, 08, 300, 50);
  context_score.fillText('My Score :' + myScore, 150,30);
  
  var i;
  
  for(i = 0; i < numOfTiles; ++i){
    if (eachState[i]) {
      myTiles[i].y += 1;
      context.fillStyle = 'black';
      context.fillRect(myTiles[i].x, myTiles[i].y, 70, 120);
      context.clearRect(myTiles[i].x, myTiles[i].y - 2, 70, 2);
    }
  }

  for(i = 0; i < numOfTiles; ++i){
    if (eachState[i]) {
      if (myTiles[i].y < 470 && myTiles[i].y > 350) {
        // jalankan fungsi switchcase
        switch (myTiles[i].keyCode) {
          case 65:
            if (myTiles[i].x == 0) {
              afterRight(i);
            }
            break;
          case 83:
            if (myTiles[i].x == 75) {
              afterRight(i);
            }
            break;
          case 68:
            if (myTiles[i].x == 150) {
              afterRight(i);
            }
            break;
          case 70:
            if (myTiles[i].x == 225) {
              afterRight(i);
            }
            break;
        }
      }
      if (myTiles[i].y > 470) {
        // jalankan fungsi mati block
      }

    }else{
      // not Alive
      myFails++;
    }
  }
}

function move(index) {
  if (myTiles[index].live) {
    myTiles[index].y += 1;
    context.fillStyle = 'black';
    context.fillRect(myTiles[index].x, myTiles[index].y, 70, 120);
    context.clearRect(myTiles[index].x, myTiles[index].y - 1, 70, 1);
  }
}

function afterRight(index) {
  myScore++;
  context.clearRect(myTiles[index].x, myTiles[index].y, 70, 120);
  myTiles[index].live = false;
  eachState[index] = false;
}



function geneBlock() {
//var numOfTiles = 5;
// var myScore = 0;
// var myTimes = 0;
// var myFails = 0;
// var eachState = [false, false, false, false, false];
// var myTiles = [];

// var intervalTmp;
// var geneTmp;

var myRand = Math.floor(Math.random() * numOfTiles);

var flag = true;

for (var i = 0; i < numOfTiles; ++i) {
  if (!eachState[i]) {
    flag = false;
  }
}

if (flag) {
  return;
}

while (eachState[myRand]) {
  myRand = Math.floor(Math.random() * numOfTiles);
}

myTiles[myRand] = new Block(myRand);

}

// untuk membuat block piano
function Block(index){
  if (!eachState[index]) {
    eachState[index] = true;
  }

  this.index = index;
  this.appearPos = Math.floor(Math.random() * 4);
  
  switch (this.appearPos) {
    case 0:
      this.x = 0;
      this.y = -120;
      break;
    case 1:
      this.x = 75;
      this.y = -120;
      break;
    case 2:
      this.x = 150;
      this.y = -120;
      break;
    case 3:
      this.x = 225;
      this.y = -120;
      break;
  }

  context.fillStyle = 'black';
  context.fillRect(this.x, this.y, 70, 120);
  this.live = true;
  
  window.addEventListener('keydown', function (e) {
    myTiles[index].keyCode = e.keyCode;
  });
  
  window.addEventListener('keyup', function (e) {
    myTiles[index].keyCode = false;
  });

}

