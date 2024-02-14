
let order = [];
let nextPressed = 0;
let user;
let userTurn = false;
let numberOfCubes = 6;

function animateRec(item){
    document.getElementById(item).style.opacity =1;
    setTimeout(() => document.getElementById(item).style.opacity =0.77, 1000);
    // add sound
}
function animatePress(item) {
    document.getElementById(item).style.opacity =1;
    setTimeout(() => document.getElementById(item).style.opacity =0.77, 500);
}

function start(boxs){
  initialize(boxs);
  
  numberOfCubes = boxs;
    document.getElementById("intraction").innerHTML = "<h1>Ok! lets start!!!</h1>";
    order = [];

    nextLevel();
}

function initialize(cubes){
  let mainContainer = document.getElementById("mainContainer");
  
  switch (cubes) {
    case 4:
      mainContainer.innerHTML = '\
      <div id="intraction"></div>\
      <div class="rectangle4 btn" id="cube1"></div>\
      <div class="rectangle4 btn" id="cube2"></div>\
      <div class="rectangle4 btn" id="cube3"></div>\
      <div class="rectangle4 btn" id="cube4"></div>';
      mainContainer.className = "grid-container4";
      ButtonsEventListener();
      break;
    case 6:
      mainContainer.innerHTML = '\
      <div id="intraction"></div>\
      <div class="rectangle6 btn" id="cube1"></div>\
      <div class="rectangle6 btn" id="cube2"></div>\
      <div class="rectangle6 btn" id="cube3"></div>\
      <div class="rectangle6 btn" id="cube4"></div>\
      <div class="rectangle6 btn" id="cube5"></div>\
      <div class="rectangle6 btn" id="cube6"></div>';
      mainContainer.className = "grid-container6"
      ButtonsEventListener();
      break;
    case 9: 
      mainContainer.innerHTML = '\
      <div id="intraction"></div>\
      <div class="rectangle9 btn" id="cube1"></div>\
      <div class="rectangle9 btn" id="cube2"></div>\
      <div class="rectangle9 btn" id="cube3"></div>\
      <div class="rectangle9 btn" id="cube4"></div>\
      <div class="rectangle9 btn" id="cube5"></div>\
      <div class="rectangle9 btn" id="cube6"></div>\
      <div class="rectangle9 btn" id="cube7"></div>\
      <div class="rectangle9 btn" id="cube8"></div>\
      <div class="rectangle9 btn" id="cube9"></div>';
      mainContainer.className = "grid-container9"
      ButtonsEventListener();
      break;
  }





}
function nextLevel(){
  nextPressed = -1;
  nextPress();
}

function nextPress(){
  nextPressed++;
  userTurn = false;
  let newPress = Math.floor(Math.random() * numberOfCubes) + 1;
  order.push(newPress);
  document.getElementById("intraction").innerHTML += order;
  
  order.forEach((element, index) => {
    setTimeout(() => {
        animateRec("cube" + element);
    }, index * 1000);
});
  setTimeout(() => userTurn = true, 1000);
}


function ButtonsEventListener(){
  const buttons = Array.from(document.querySelectorAll('.btn'));
  
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
      document.getElementById("intraction").style.backgroundColor = "Yes! Level up!";
      setTimeout(nextLevel, 1000);
    }else{
      document.getElementById("intraction").style.backgroundColor = "Keep Going";
      nextPressed++;
    }
  }else{
    fail();
  }
}

function fail(){
  const element = document.getElementById("intraction")
  element.style.backgroundColor = "red";
  element.innerHTML = "<h1> Game over! your score is " + (order.length* 100) + "</h1>";
  element.innerHTML += "<button onclick='restart()'>Try again</button>"
  userTurn = false;
}

function restart(){
  document.getElementById("intraction").innerHTML = "<h1>ready to start? please choose the difficulty of the game</h1>\
  <button onclick='start(4)'>Easy - 4 buttons</button>\
  <button onclick='start(6)'>Normal - 6 buttons</button>\
  <button onclick='start(9)'>Hard - 9 buttons</button>";
}