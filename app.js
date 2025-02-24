let gameSeq = [];
let userSeq = [];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");
let btns = ["box-1", "box-2", "box-3", "box-4"];

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started!");
        started = true;
        levelUp();
    }
})

function levelUp() {
    userSeq = [];
    level++;
    highScore++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    btnFlash(randBtn);
    gameSeq.push(randColor);
    console.log(gameSeq);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function checkAns(idx) {

    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
        
    }
    else {
        h2.innerHTML = (`Game Over! Your Score is <b>${level}.</b> <br> Press any key to start.`);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    console.log(userSeq);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".box");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    userSeq = [];
    gameSeq = [];
    level = 0;
}

// function highScore(){
//     let score = document.createElement("h2");
//     score.innerText = `The highest score is ${level}`;
//     h2.append(score);
// }