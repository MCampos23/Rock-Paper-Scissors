function setGameMode(){gameModeOptions.forEach(n=>{if(n.checked)return gameMode=n.id})}function playerButtonsProgram(){playerImgs.forEach(n=>{n.addEventListener("mouseover",function(){hoverSound.play()}),n.onclick=n=>{gameOnCourse||(gameOnCourse=!0,pcPlaySound.play(),setStyles(n.target),setPcChoice(),playerChoice=n.target.alt,pcPlayEffect(),setTimeout(()=>{compareResult(),gameOnCourse=!1},2400))}})}function setStyles(n){pcImgs.forEach(n=>n.classList.remove("pcPlay"));playerImgs.forEach(n=>n.classList.remove("pcPlay"));n&&n.classList.add("pcPlay")}function setPcChoice(){let n=Math.ceil(Math.random()*3);n===1?pcChoice="rock":n===2?pcChoice="papper":n===3&&(pcChoice="scissors")}function compareResult(){pcChoice==playerChoice?showResultMessage("Tie"):playerChoice=="rock"&&pcChoice=="papper"||playerChoice=="papper"&&pcChoice=="scissors"||playerChoice=="scissors"&&pcChoice=="rock"?(showResultMessage("You lose..."),setTimeout(()=>{pcPoints++,pcScore.innerHTML=pcPoints,pcPoints==gameMode&&(messageHeader.innerHTML="You've definetly lost...",message.innerHTML="Sometimes in life it is better to give up...or not?",backTrack.pause(),lostSound.play(),setTimeout(()=>endGame(),800))},1e3)):(showResultMessage("You win!"),setTimeout(()=>{playerPoints++,playerScore.innerHTML=playerPoints,playerPoints==gameMode&&(messageHeader.innerHTML="Congratulations!!",message.innerHTML="Was it all about luck, or you are an actual champion?",backTrack.pause(),winSound.play(),setTimeout(()=>endGame(),800))},1e3))}function showResultMessage(n){let t=document.querySelector("#result-message");t.innerHTML=n;setTimeout(()=>{t.innerHTML=""},1300)}function endGame(){document.querySelector("#game").classList.toggle("hidden");document.querySelector("#finished-game-modal").classList.toggle("hidden");document.querySelector("#finished-game-modal").classList.remove("animate__fadeOutRight")}function pcPlayEffect(){let n=0;startEffect();interval=setInterval(()=>{n++,n>=3&&(stopEffect(),pcChoice==="rock"?stayOn(0):pcChoice==="papper"?stayOn(1):pcChoice==="scissors"&&stayOn(2)),startEffect()},450)}function startEffect(){addRemoveBorder(0);setTimeout(()=>{addRemoveBorder(1)},150);setTimeout(()=>{addRemoveBorder(2)},300)}function addRemoveBorder(n){pcImgs[n].classList.toggle("pcPlay");setTimeout(function(){pcImgs[n].classList.toggle("pcPlay")},150)}function stayOn(n){setTimeout(function(){pcImgs[n].classList.add("pcPlay")},470)}function stopEffect(){clearInterval(interval)}function resetScore(){pcPoints=0;playerPoints=0;pcScore.innerHTML=0;playerScore.innerHTML=0}let messageHeader=document.querySelector("#message-header"),message=document.querySelector("#message"),backTrack=document.querySelector("#back-track"),playerName=document.querySelector("#name"),enterButton=document.querySelector("#enter-button"),gameModeOptions=Array.from(document.querySelectorAll("input[type='radio']")),gameMode,buttonPressed=document.querySelector("#button-pressed");playerName.onkeydown=function(){buttonPressed.play()};enterButton.onclick=()=>{setGameMode(),playerName.value!=""&&gameMode!=undefined?(backTrack.play(),document.querySelector("#player-name").innerHTML=playerName.value,document.querySelector("#initial-modal").classList.add("animate__fadeOutRight"),document.querySelector("#game").classList.add("animate__fadeInUp"),setTimeout(()=>{document.querySelector("#initial-modal").classList.add("hidden"),document.querySelector("#game").classList.toggle("hidden")},250)):alert("Please complete the name and select the game mode.")};let playerImgs=Array.from(document.querySelectorAll(".player-img")),pcImgs=Array.from(document.querySelectorAll(".pc-img")),playerPoints=0,pcPoints=0,playerChoice,pcChoice,gameOnCourse=!1,pcScore=document.querySelector("#pc-score"),playerScore=document.querySelector("#player-score"),hoverSound=document.querySelector("#hover-sound"),lostSound=document.querySelector("#lost"),winSound=document.querySelector("#win"),pcPlaySound=document.querySelector("#pc-play-sound");winSound.volume=.7;let interval;playerButtonsProgram();let playAgainButton=document.querySelector("#play-again-button"),exitButton=document.querySelector("#exit-button");playAgainButton.onclick=()=>{document.querySelector("#finished-game-modal").classList.add("animate__fadeOutRight"),resetScore(),setTimeout(()=>{endGame()},250),setStyles(),backTrack.play()};exitButton.onclick=()=>{document.querySelector("#finished-game-modal").classList.add("animate__fadeOutRight"),resetScore(),setStyles(),playerName.value="",gameModeOptions.forEach(n=>{if(n.checked)return n.checked=!1}),setTimeout(()=>{document.querySelector("#finished-game-modal").classList.toggle("hidden"),document.querySelector("#initial-modal").classList.add("animate__fadeInLeft"),document.querySelector("#initial-modal").classList.remove("animate__fadeOutRight"),document.querySelector("#initial-modal").classList.remove("hidden")},250)}