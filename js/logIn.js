
function Person(userName, firstName, lastName, password, age, email) {
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.age = age;
    this.email = email;
    this.failedAttempt = 0;
    /*
    // You can also define methods using the prototype property
    this.greet = function() {
      return 'Hello, ' + this.firstName + ' ' + this.lastName + '!';
    };*/
  }

let yaniv = new Person('Yanivt', 'Yaniv', 'Tawily', 'Yt123456', '27', 'yaniv1tawily@gmail.com', 0);
let danel = new Person('daniel', 'Yaniv', 'Tawily', 'Yt123456', '27', 'yaniv1tawily@gmail.com', 0);
let davidos = new Person('davidos', 'david', 'roger', 'Yt123456', '24', 'davidos@gmail.com', 0);
let users = [yaniv, danel, davidos];
localStorage.setItem('users', JSON.stringify(users));
backData = JSON.parse(localStorage.getItem('users'));
console.log(backData);

function validateForm() {

  var usernameOrEmail = document.getElementById('username_or_email').value;
  var password = document.getElementById('password').value;
  
  // Check password
  var passwordValidation = passwordCheck(password);
  
  if (passwordValidation !== true) {

      // If password check fails, show error message in notes box
      document.getElementById('notesBox').style.display = "block"
      document.getElementById('notesBox').innerHTML = passwordValidation;
      return false; // Prevent form submission
  }//else if (){

  //}
  
  return true;
}

function passwordCheck(password){
      // Check if the password more than 8 characters 
      if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }

    // Check if the password contains at least one number
    if (!/\d/.test(password)) {
        return "Password must contain at least one number.";
    }
    
    // Check if the password contains at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    
    // Check if the password contains at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }

    return true;
}

function getCookieObject(name) {
  var cookieValue = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith(name + '='));

  if (cookieValue) {
      return JSON.parse(cookieValue.substring(name.length + 1));
  } else {
      return null;
  }
}

function setOrEditCookieObject(name, object, daysToExpire) {
  var expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + (daysToExpire * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
  var expires = "expires=" + expirationDate.toUTCString();
  var serializedObject = JSON.stringify(object); // Serialize the object to JSON
  document.cookie = name + "=" + serializedObject + ";" + expires + ";path=/";
}

// Example usage:
var user = { name: "John", age: 30, isAdmin: true };

var retrievedUser = getCookieObject("user"); // Retrieve the object from the cookie
console.log("User:", retrievedUser);

var updatedUser = { name: "Jane", age: 25, isAdmin: false };
setOrEditCookieObject("user", updatedUser, 7); // Update the "user