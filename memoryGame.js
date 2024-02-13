
let order = [];
let user;

function animateRec(item){
    document.getElementById(item).style.opacity =1;
    setTimeout(() => document.getElementById(item).style.opacity =0.77, 1500);
    // add sound
}
function animatePress(item) {
    document.getElementById(item).style.opacity =1;
    setTimeout(() => document.getElementById(item).style.opacity =0.77, 500);
}

function start(boxs){
    document.getElementById("intraction").innerHTML = "<h1>Ok! lets start!!!</h1>";

    let newPress = Math.floor(Math.random() * boxs) + 1;
    order.push(newPress);
    document.getElementById("intraction").innerHTML += order;

    setTimeout(() => animateRec("cube" + newPress), 1500);

}


const buttons = Array.from(document.querySelectorAll('div.rectangle'));

// Function to handle the click event
function handleClick(event) {
  console.log("Clicked element ID:", user);
  user = event.target.id;
  animatePress(user);
  //playSound(user);
  checkAnswer(user);
}

// Attach click event listener to each button
buttons.forEach(button => {
  document.getElementById("cube1").style.color= "red";
  button.addEventListener('click', handleClick);
  button.color = "red";
});