"use strict";

var cardsArray = [
  {
    name: "shell",
    img: "img/med/mem_1.png",
  },
  {
    name: "star",
    img: "img/med/mem_2.png",
  },
  {
    name: "bobomb",
    img: "img/med/mem_3.png",
  },
  {
    name: "mario",
    img: "img/med/mem_4.png",
  },
  {
    name: "luigi",
    img: "img/med/mem_5.png",
  },
  {
    name: "peach",
    img: "img/med/mem_6.png",
  },
  {
    name: "1up",
    img: "img/med/mem_7.png",
  },
  {
    name: "mushroom",
    img: "img/med/mem_8.png",
  },
  {
    name: "thwomp",
    img: "img/med/mem_9.png",
  },
  {
    name: "bulletbill",
    img: "img/med/mem_10.png",
  },
  {
    name: "coin",
    img: "img/med/mem_11.png",
  },
  {
    name: "goomba",
    img: "img/med/mem_12.png",
  },
];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = "";
var secondGuess = "";
var count = 0;
var previousTarget = null;
var delay = 1200;
var score = 0;
var timeLeft = 120;
var isPaused = false;

var game = document.getElementById("game");
var grid = document.createElement("section");
var scoreboard = document.querySelector(".score");
var time = document.querySelector(".time");
var sb = document.querySelector(".scoreboard");
var start = document.querySelector(".start");
var startBtn = document.querySelector(".start-btn");
var pauseBtn = document.querySelector(".pause-btn");
var playBtn = document.querySelector(".play-btn");
var paused = document.querySelector(".paused");
var btns = document.querySelectorAll(".click");
var icons = document.querySelectorAll(".social a");

// var intro = new Audio("../audio/intro.mp3");
// var gamePlay = new Audio("../audio/gameplay.mp3");
// var pauseMenu = new Audio("../audio/pause.mp3");
// var wrong = new Audio("../audio/wrong.wav");
// var pair = new Audio("../audio/pair.wav");
// var clicks = new Audio("../audio/pair2.mp3");
// var gameOver = new Audio("../audio/gameover.mp3");
// var final = new Audio("../audio/final.wav");
// var completed = new Audio("../audio/complete.mp3");

grid.setAttribute("class", "grid");
game.appendChild(grid);
// intro.play();

gameGrid.forEach(function (item) {
  var name = item.name,
    img = item.img;
  var card = document.createElement("div");
  card.classList.add("card");
  card.dataset.name = name;
  var front = document.createElement("div");
  front.classList.add("front");
  var back = document.createElement("div");
  back.classList.add("back");
  back.style.backgroundImage = "url(".concat(img, ")");
  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  // pair.play();
  var selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.add("match");
  });
};

var resetGuesses = function resetGuesses() {
  firstGuess = "";
  secondGuess = "";
  count = 0;
  previousTarget = null;
  var selected = document.querySelectorAll(".selected");
  selected.forEach(function (card) {
    card.classList.remove("selected");
  });
};

var increaseScore = function increaseScore() {
  score++;
  scoreboard.textContent = "Coppie: ".concat(score);
  setTimeout(match, delay);
};

var timer = function timer() {
  time.textContent = "Tempo: ".concat(timeLeft);
  timeLeft--;

  if (timeLeft < 0) {
    timeLeft = 0;
    // gameOver.play();
    setTimeout(function () {
      return (sb.style.display = "flex");
    }, 500);
    sb.innerHTML = '\n \t<h1> Oh no!</h1>\n<h1>Game Over \uD83D\uDE14</h1>\n    \t<p>Hai abbinato solamente '.concat(
      score,
      ' coppie al livello 2</p>\n\t\t\t<span onclick="location.reload()" class="click">Rigioca</span>\n    '
    );
  }

  // if (timeLeft === 3) {
  //   // gamePlay.pause();
  //   // final.play();
  //   final.volume(200);
  // }

  if (score === 12) {
    setTimeout(function () {
      return (sb.style.display = "flex");
    }, 500);
    // completed.play();
    // gamePlay.pause();
    timeLeft++;
    sb.innerHTML =
      '\n    \t<p>Complimenti hai vinto! <br> Hai completato <br> il livello 2 con '.concat(
        timeLeft,  
        ' punti</p><p>Condividi il tuo punteggio con Oreste\uD83C\uDF1F\uD83C\uDF89</p><span><br></span><span onclick="location.reload()" class="click">Rigioca</span><span><br></span><span onclick="location.href=\'franco.html\';" class="click">Passa al livello 3</span>    '
        );
  }
};

var pauseGame = function pauseGame() {
  // pauseMenu.play();
  // gamePlay.pause();
  isPaused = true;
  paused.style.display = "flex";
};

var playGame = function playGame() {
  // pauseMenu.pause();
  // gamePlay.play();
  isPaused = false;
  paused.style.display = "none";
};

grid.addEventListener("click", function (event) {
  var clicked = event.target;

  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains("match")
  ) {
    return;
  }

  if (count < 2) {
    count++;

    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      clicked.parentNode.classList.add("selected");
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        increaseScore();
      }

      if (firstGuess !== secondGuess) {
        // wrong.play();
      }

      setTimeout(resetGuesses, delay);
    }

    previousTarget = clicked;
  }
});

btns.forEach(function (btn) {
  return btn.addEventListener("click", function () {
    // clicks.play();
  });
});

icons.forEach(function (icon) {
  return icon.addEventListener("click", pauseGame);
});

pauseBtn.addEventListener("click", pauseGame);
playBtn.addEventListener("click", playGame);

startBtn.addEventListener("click", function () {
  setInterval(function () {
    if (!isPaused) {
      timer();
    }
  }, 1000);
  start.style.display = "none";
  // intro.pause();
  // gamePlay.play();
});
