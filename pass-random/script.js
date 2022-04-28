const copyPassword = document.getElementsByClassName("box-buttons__button")[0];
const generatePassword = document.getElementsByClassName("box-buttons__button")[1];
const generatePasswordOffice = document.getElementsByClassName("box-buttons__button")[2];
const lengthPass = document.getElementsByClassName("passwordLength")[0];
const passwordOutput = document.getElementsByClassName("passwordOutput")[0];

function genPass() {
    const arrPasswordSymbols = [];
    const passwordSymbols =
      "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  
    if (lengthPass.value === "" || lengthPass.value < 8 || lengthPass.value > 50 || !isFinite(lengthPass.value )) {
      alert("Длина пароля должна быть не менее 8 и не более 50 символов");
      return;
    }
  
    for (let i = 0; i < lengthPass.value - 1; i++) {
      let randomNumber = Math.ceil(Math.random() * passwordSymbols.length - 1);
      arrPasswordSymbols.push(passwordSymbols[randomNumber]);
    }
  
    passwordOutput.value = arrPasswordSymbols.join("") + '!';
  
    return passwordOutput;
}

generatePassword.onclick = genPass;

generatePasswordOffice.onclick = function() {
  lengthPass.value = 9;
  genPass();
  navigator.clipboard.writeText(passwordOutput.value);
}

copyPassword.onclick = function() {
  navigator.clipboard.writeText(passwordOutput.value);
}