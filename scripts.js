//Variables
const uppers = "ABCDEFHGIJKLMNOPQRSTUVWXYZ";
const lowers = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const specials = "!@#$%^&*()_-=+[]{}";
const minLen = 8;
const maxLen = 128;

//Selectors
const passGenLabel = document.getElementById("passwordGenerator");
const passGenBtn = document.getElementById("btnPasswordGenerator");
const notificationText = document.getElementById("notificationText");
const notificationContainer = document.getElementById("notificationContainer");
const passwordConfContainer = document.querySelector(".config-container");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const passwordUppersCheckbox = document.getElementById("uppers");
const passwordLowersCheckbox = document.getElementById("lowers");
const passwordDigitsCheckbox = document.getElementById("digits");
const passwordSpecialsCheckbox = document.getElementById("specials");
const passwordNumberLen = document.getElementById("numberLen");
const finishBtn = document.getElementById("finishBtn");

//Event listeners
passGenBtn.addEventListener('click', openPasswordConfComplexity);
passGenLabel.addEventListener('click', copyPasswordToClipboardAndShowNotification);
finishBtn.addEventListener('click', () => {
    if(checkValidity()) {
        closePasswordConfComplexity();
        showPasswordAndNotification();
    }
});

//Functions
//Password generations
function showPasswordAndNotification() {
    passGenLabel.innerText = generateNewPassword();
    //Show notification
    showNotificationText("New password generated successfully.");
}

function generateNewPassword() {
    let dict = "";
    let pwd = "";
    let len = passwordNumberLen.value;

    if(passwordUppersCheckbox.checked) dict += uppers;
    if(passwordLowersCheckbox.checked) dict += lowers;
    if(passwordDigitsCheckbox.checked) dict += digits;
    if(passwordSpecialsCheckbox.checked) dict += specials;

    if(len >= minLen && len <= maxLen && dict !== "") {
        for ( var i = 0; i < len; ++i ) {
            pwd += dict[Math.floor(Math.random() * dict.length)];
        }
    }
    return pwd;
  }

//Copy password to clipboard
function copyPasswordToClipboardAndShowNotification(){
    const range = document.createRange();
    range.selectNode(passGenLabel);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    //Show notification
    showNotificationText("Your password was copied to the clipboard.");
}

// Password Complexity Configuration
function openPasswordConfComplexity() {
    if(!passwordConfContainer.classList.contains("open")){
        passwordConfContainer.classList.add("open");
    }
}

function closePasswordConfComplexity() {
    if(passwordConfContainer.classList.contains("open")){
        passwordConfContainer.classList.remove("open");
    }
}

function checkValidity() {
    if(!isChecked()) {
        const error = "At least one checkbox must be selected.";
        showNotificationText(error);
        return false;
    }
    return true;
}

function isChecked() {
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) return true;
    }
    return false;
}

  //Notifications
function showNotificationText(msg) {
    notificationText.innerText = msg;
    notificationContainer.classList.add("show-notification-container");
    setTimeout(removeNotification, 1500);
}

function removeNotification() {
    notificationContainer.classList.remove("show-notification-container");
}