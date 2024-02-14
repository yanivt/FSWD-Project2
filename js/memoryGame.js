
let order = [];
let nextPressed = 0;
let user;
let userTurn = false;
let numberOfCubes = 6;
let intraction = document.getElementById("intraction");
let audioPlayer = document.getElementById("audioPlayer");

function updateIntraction(){
  intraction = document.getElementById("intraction");
}

function animateRec(item){
    document.getElementById(item).style.opacity =1;
    setTimeout(() => document.getElementById(item).style.opacity =0.77, 1000);
    
    audioPlayer.src = "../media/sounds/gamePress.wav";
    audioPlayer.play();
}
function animatePress(item) {
    document.getElementById(item).style.opacity =1;
    setTimeout(() => document.getElementById(item).style.opacity =0.77, 500);

    audioPlayer.src = "../media/sounds/userPress.wav";
    audioPlayer.play();
}

function startGame(cubes){
  initialize(cubes);
  intraction.innerHTML = "<h1>Ok! lets start!!!</h1>";
  
  nextLevel();
}

function initialize(cubes){
  let mainContainer = document.getElementById("mainContainer");
  order = [];
  numberOfCubes = cubes;

  switch (numberOfCubes) {
    case 4:
      mainContainer.innerHTML = '\
      <div id="intraction"></div>\
      <div class="rectangle" id="cube1"></div>\
      <div class="rectangle" id="cube2"></div>\
      <div class="rectangle" id="cube3"></div>\
      <div class="rectangle" id="cube4"></div>';
      mainContainer.className = "grid-container";
      ButtonsEventListener();
      updateIntraction();
      break;
    case 6:
      mainContainer.innerHTML = '\
      <div id="intraction"></div>\
      <div class="rectangle" id="cube1"></div>\
      <div class="rectangle" id="cube2"></div>\
      <div class="rectangle" id="cube3"></div>\
      <div class="rectangle" id="cube4"></div>\
      <div class="rectangle" id="cube5"></div>\
      <div class="rectangle" id="cube6"></div>';
      mainContainer.className = "grid-container"
      ButtonsEventListener();
      updateIntraction();
      break;
    case 9: 
      mainContainer.innerHTML = '\
      <div id="intraction"></div>\
      <div class="rectangle" id="cube1"></div>\
      <div class="rectangle" id="cube2"></div>\
      <div class="rectangle" id="cube3"></div>\
      <div class="rectangle" id="cube4"></div>\
      <div class="rectangle" id="cube5"></div>\
      <div class="rectangle" id="cube6"></div>\
      <div class="rectangle" id="cube7"></div>\
      <div class="rectangle" id="cube8"></div>\
      <div class="rectangle" id="cube9"></div>';
      mainContainer.className = "grid-container9"
      ButtonsEventListener();
      updateIntraction();
      break;
  }

}
function nextLevel(){
  audioPlayer.src = "../media/sounds/levelUp.wav";
  audioPlayer.play();

  nextPressed = -1;
  setTimeout(nextPress, 1000);
}

function nextPress(){
  nextPressed++;
  userTurn = false;
  let newPress = Math.floor(Math.random() * numberOfCubes) + 1;
  order.push(newPress);
  intraction.innerHTML = "<h1>wait for it..</h1>";
  intraction.style.color = "blue";
  let time;
  order.forEach((element, index) => {
    time = index * 1000;

    setTimeout(() => {
        animateRec("cube" + element);
    }, time);
});
  setTimeout(() => userTurn = true, time);
  setTimeout(() => intraction.innerHTML = "<h1>your turn..</h1>", time);
  intraction.style.backgroundColor = "orange";
}


function ButtonsEventListener(){
  const buttons = Array.from(document.querySelectorAll('.rectangle'));
  
  buttons.forEach(button => {
    button.addEventListener('click', handleClick);
  });
}


// Function to handle the click event
function handleClick(event) {
  if(userTurn){

    user = event.target.id;
    animatePress(user);
    //playSound(user);
    checkAnswer(user);
  }
}



function checkAnswer(pressed){

  if("cube" + order[nextPressed] == pressed){
    if(order.length == (nextPressed+1))
    {
      intraction.innerHTML = "<h1>Yes! Level up!</h1>";
      intraction.style.backgroundColor = "green";
      setTimeout(nextLevel, 1000);
    }else{
      intraction.innerHTML = "<h1>Keep Going</h1>";
      intraction.style.backgroundColor = "orange";

      nextPressed++;
    }
  }else{
    fail();
  }
}

function fail(){
  intraction.style.backgroundColor = "red";
  intraction.innerHTML = "<h1> Game over! your score is " + (order.length* 100) + "</h1>";
  intraction.innerHTML += "<button onclick='restart()'>Try again</button>"
  userTurn = false;
  audioPlayer.src = "../media/sounds/gameOver.mp3";
  audioPlayer.play();
}

function restart(){
  intraction.innerHTML = "<h1>ready to start? please choose the difficulty of the game</h1>\
  <button onclick='startGame(4)'>Easy - 4 buttons</button>\
  <button onclick='startGame(6)'>Normal - 6 buttons</button>\
  <button onclick='startGame(9)'>Hard - 9 buttons</button>";
}