var playerName = document.querySelector("#name");
var gameModeOptions = Array.from(document.querySelectorAll("input[type='radio']"));
var gameMode;
var playerScore = document.querySelector('#player-score');
var pcScore = document.querySelector('#pc-score');
var playerPoints = 0;
var pcPoints = 0;
var gameOnCourse = false;

//---- AUDIO ----//

var buttonPressedSound = document.querySelector("#button-pressed");
var backTrack = document.querySelector("#back-track");
var hoverSound = document.querySelector("#hover-sound");
var lostSound = document.querySelector("#lost");
var winSound = document.querySelector("#win");
var pcPlaySound = document.querySelector("#pc-play-sound");
winSound.volume = 0.7;
var initialModal = document.querySelector("#initial-modal");
var game = document.querySelector("#game");
var finishedModal = document.querySelector("#finished-game-modal");

//---- INITIAL MODAL ----//

playerName.onkeydown = function () { return buttonPressedSound.play(); };
document.querySelector("#enter-button").onclick = function () {
    setGameMode();
    playerName.value = document.querySelector("#player-name").innerHTML;
    if (playerName.value && gameMode != undefined) {
        backTrack.play();
        initialModal.classList.add("animate__fadeOutRight");
        game.classList.add("animate__fadeInUp");
        setTimeout(function () {
            showView(game);
        }, 250);
    }
    else
        alert("Please complete the name and select the game mode.");
};
function showView(view) {
    initialModal.classList.add('hidden');
    game.classList.add('hidden');
    finishedModal.classList.add('hidden');
    view.classList.remove('hidden');
}
function setGameMode() {
    gameModeOptions.forEach(function (gameModeOption) { if (gameModeOption.checked)
        return gameMode = gameModeOption.id; });
}

//---- GAME ----//

function playerButtonsProgram() {
    var playerImgs = Array.from(document.querySelectorAll('.player-img'));
    var pcImgs = Array.from(document.querySelectorAll('.pc-img'));
    var pcChoice;
    var playerChoice;
    playerImgs.forEach(function (playerImg) {
        playerImg.addEventListener("mouseover", function () {
            hoverSound.play();
        });
        playerImg.onclick = function (e) {
            if (!gameOnCourse) {
                gameOnCourse = true;
                playerChoice = e.target.alt;
                setPcChoice();
                setBorder(e.target);
                pcPlayEffect(pcChoice);
                setTimeout(function () {
                    compareResult(pcChoice, playerChoice);
                    gameOnCourse = false;
                }, 2400);
            }
        };
    });
}

function setPcChoice() {
    let num = Math.ceil(Math.random() * 3);
    if (num === 1)
        return pcChoice = "rock";
    else if (num === 2)
        return pcChoice = "papper";
    else if (num === 3)
        return pcChoice = "scissors";
    return pcChoice;
}

function setBorder(img) {
    pcImgs.forEach(function (pcImg) { return pcImg.classList.remove("pcPlay"); });
    playerImgs.forEach(function (playerImg) { return playerImg.classList.remove("pcPlay"); });
    if (img)
        img.classList.add("pcPlay");
}

function compareResult(pcChoice, playerChoice) {
    var messageHeader = document.querySelector("#message-header");
    var message = document.querySelector("#message");
    if (pcChoice == playerChoice)
        showResultMessage("Tie");
    else if ((playerChoice == "rock" && pcChoice == "papper") ||
        (playerChoice == "papper" && pcChoice == "scissors") ||
        (playerChoice == "scissors" && pcChoice == "rock")) {
        showResultMessage("You lose...");
        setTimeout(function () {
            pcPoints++;
            pcScore.innerHTML = pcPoints;
            if (pcPoints == gameMode) {
                messageHeader.innerHTML = "You've definetly lost...";
                message.innerHTML = "Sometimes in life it is better to give up...or not?";
                backTrack.pause();
                lostSound.play();
                setTimeout(function () { return endGame(); }, 800);
            }
        }, 1000);
    }
    else {
        showResultMessage("You win!");
        setTimeout(function () {
            playerPoints++;
            playerScore.innerHTML = playerPoints;
            if (playerPoints == gameMode) {
                messageHeader.innerHTML = "Congratulations!!";
                message.innerHTML = "Was it all about luck, or you are an actual champion?";
                backTrack.pause();
                winSound.play();
                setTimeout(function () { return endGame(); }, 800);
            }
        }, 1000);
    }
}

function showResultMessage(message) {
    var resultMessage = document.querySelector('#result-message');
    resultMessage.innerHTML = message;
    setTimeout(function () { resultMessage.innerHTML = ""; }, 1300);
}
function endGame() {
    showView(finishedModal);
    finishedModal.classList.remove("animate__fadeOutRight");
}
playerButtonsProgram();

//---- Pc Play Effect ----//

var interval;
function pcPlayEffect() {
    var counter = 0;
    pcPlaySound.play();
    startEffect();
    interval = setInterval(function () {
        counter++;
        if (counter >= 3) {
            stopEffect();
            if (pcChoice === "rock") {
                stayOn(0);
            }
            else if (pcChoice === "papper") {
                stayOn(1);
            }
            else if (pcChoice === "scissors") {
                stayOn(2);
            }
        }
        startEffect();
    }, 450);
}
function startEffect() {
    addRemoveBorder(0);
    setTimeout(function () {
        addRemoveBorder(1);
    }, 150);
    setTimeout(function () {
        addRemoveBorder(2);
    }, 300);
}
function stopEffect() {
    clearInterval(interval);
}
function addRemoveBorder(img) {
    pcImgs[img].classList.toggle("pcPlay");
    setTimeout(function () { pcImgs[img].classList.toggle("pcPlay"); }, 150);
}
function stayOn(img) {
    setTimeout(function () { pcImgs[img].classList.add("pcPlay"); }, 470);
}

//---- FINISHED GAME MODAL WINDOW ----//

var playAgainButton = document.querySelector("#play-again-button");
var exitButton = document.querySelector("#exit-button");
playAgainButton.onclick = function () {
    resetScore();
    setBorder();
    backTrack.play();
    finishedModal.classList.add("animate__fadeOutRight");
    setTimeout(function () { endGame(); }, 250);
};
exitButton.onclick = function () {
    resetScore();
    setBorder();
    playerName.value = "";
    finishedModal.classList.add("animate__fadeOutRight");
    gameModeOptions.forEach(function (gameModeOption) { if (gameModeOption.checked)
        return gameModeOption.checked = false; });
    setTimeout(function () {
        initialModal.classList.add("animate__fadeInLeft");
        initialModal.classList.remove("animate__fadeOutRight");
        showView(initialModal);
    }, 250);
};
function resetScore() {
    pcPoints = 0;
    playerPoints = 0;
    pcScore.innerHTML = 0;
    playerScore.innerHTML = 0;
}
