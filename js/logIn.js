function Person(userName, firstName, lastName, password, age, email) {
  this.userName = userName;
  this.firstName = firstName;
  this.lastName = lastName;
  this.password = password;
  this.age = age;
  this.email = email;
  this.failedAttempt = 0;
  this.memoryLevel1 = 0;
  this.memoryLevel2 = 0;
  this.memoryLevel3 = 0;
  

  // Method to return details of the person object as a string
  this.toString = function() {
    return "User Name: " + this.userName + "\n" +
            "First Name: " + this.firstName + "\n" +
            "Last Name: " + this.lastName + "\n" +
            "Password: " + this.password + "\n" +
            "Age: " + this.age + "\n" +
            "Email: " + this.email + "\n" +
            "Failed Attempt: " + this.failedAttempt;
  };
}

if(JSON.parse(localStorage.getItem('users')) == null){
  let yaniv = new Person('Yanivt', 'Yaniv', 'Tawily', 'Yt123456', '27', 'yaniv1tawily@gmail.com');
  let danel = new Person('daniel', 'Yaniv', 'Tawily', 'Yt123456', '27', 'yaniv1tawily@gmail.com');
  let davidos = new Person('davidos', 'david', 'roger', 'Yt123456', '24', 'davidos@gmail.com');
  let users = [yaniv, danel, davidos];
  localStorage.setItem('users', JSON.stringify(users));
}

let backData = JSON.parse(localStorage.getItem('users'));
console.log(backData);

function validateFormLogIn() {

  let username = document.getElementById('username').value;
  let password = document.getElementById('password').value;
  
  // Check password
  let passwordValidation = passwordCheck(password);
  let box = document.getElementById('notesBox');
  box.style.display = "block"

  if (passwordValidation !== true) {
      // If password check fails, show error message in notes box
      box.innerHTML = passwordValidation;
      return false; 
  }
  return CheckUser(username, password);
}

function CheckUser(user, password){
  for (let i = 0; i < backData.length; i++) {
      if (backData[i].userName == user) {
        if(backData[i].password == password){
          if(backData[i].failedAttempt > 14){
            box.innerHTML = "user has been blocked.";
            return false;
          }else{
            alert("Log-in");
            setOrEditCookieObject("user",backData[i].userName, 3);
            return true;
          }
        }else{
          box.innerHTML = "wrong user/email/password.";
          backData[i].failedAttempt++;
          localStorage.setItem('users', JSON.stringify(backData));
          return false;
        }
      }
  }

  // If user not found
  box.innerHTML = "wrong user/email/password.";
  return false;
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