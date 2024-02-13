
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
  numberOfCubes = boxs;
    document.getElementById("intraction").innerHTML = "<h1>Ok! lets start!!!</h1>";
    order = [];

    nextLevel();
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


/// Button event Event Listener ///


const buttons = Array.from(document.querySelectorAll('div.rectangle'));

// Function to handle the click event
function handleClick(event) {
  if(userTurn){

    user = event.target.id;
    animatePress(user);
    //playSound(user);
    checkAnswer(user);
  }
}

// Attach click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', handleClick);
});

function checkAnswer(pressed){
  // console.log(order[nextPressed]);
  // console.log(pressed);
  // console.log(order);
  // console.log(nextPressed);

  if("cube" + order[nextPressed] == pressed){
    if(order.length == (nextPressed+1))
    {
      document.getElementById("intraction").style.backgroundColor = "green";
      setTimeout(nextLevel, 1000);
    }else{
      document.getElementById("intraction").style.backgroundColor = "orange";
      nextPressed++;
    }
  }else{
    fail();
  }
}

function fail(){
  document.getElementById("intraction").style.backgroundColor = "red";
  document.getElementById("intraction").innerHTML = "<h1> Game over! your score is " + (order.length* 100) + "</h1>";
  userTurn = false;
}
