const uppers = "ABCDEFHGIJKLMNOPQRSTUVWXYZ";
const lowers = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const specials = "!@#$%^&*()_-=+[]{}";
const len = 10;

const passGenLabel = document.getElementById("passwordGenerator");
const passGenBtn = document.getElementById("btnPasswordGenerator");
const notificationText = document.getElementById("notificationText");
const notificationContainer = document.getElementById("notificationContainer");

passGenBtn.addEventListener('click', () => {
    passGenLabel.innerText = generateNewPassword();
    showNotificationText("New password generated successfully.");
});

passGenLabel.addEventListener('click', () =>{
    const range = document.createRange();
    range.selectNode(passGenLabel);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

    showNotificationText("Your password was copied to the clipboard.");
});

function generateNewPassword() {
    let dict = uppers + lowers + digits + specials;
    let pwd = "";

    for ( var i = 0; i < len; ++i ) {
        pwd += dict[Math.floor(Math.random() * dict.length)];
    }
    return pwd;
  }

  function showNotificationText(msg) {
      notificationText.innerText = msg;
      notificationContainer.classList.add("show-notification-container");
      setTimeout(removeNotification, 1500);
  }

  function removeNotification() {
    notificationContainer.classList.remove("show-notification-container");
  }