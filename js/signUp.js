let box = document.getElementById('notesBox');
box.style.display = "block";

function validateFormSignUp(){
    let username = document.getElementById("username").value;
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let password = document.getElementById("password").value;
    let cPassword = document.getElementById("confirmPassword").value;
    let email = document.getElementById("email").value;
    let age = document.getElementById("age").value

    let passwordValidation = passwordCheck(password);
    if (passwordValidation !== true) {
        // If password check fails, show error message in notes box
        box.innerHTML = passwordValidation;
        return false; 
    }else if(password != cPassword){
        box.innerHTML = "password confirmation is wrong!";
        return false; 
    }
    return CheckUserInSign(username, new Person(username, firstName, lastName, password, age, email));
}

function CheckUserInSign(username, newUser){
    for (let i = 0; i < backData.length; i++) {
        if (backData[i].userName == username) {
            box.innerHTML = "user already exist!";
            return false;
        }
    }
    backData.push(newUser);
    localStorage.setItem('users', JSON.stringify(backData));
    alert("User has been created!")
    return true;
}