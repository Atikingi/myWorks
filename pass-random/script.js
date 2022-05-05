const copyPassword = document.querySelector(".box-buttons__button-copy");
const generatePassword = document.querySelector(".box-buttons__button-generate");
const generatePasswordOffice = document.querySelector(".box-buttons__button-office");
const generatePasswordSAP = document.querySelector(".box-buttons__button-sap");
const lengthPass = document.querySelector(".passwordLength");
const passwordOutput = document.querySelector(".passwordOutput");
const copyStatus = document.querySelector('.content__popup');

function genPass() {
    const arrPasswordSymbols = [];
    const passwordSymbols =
        "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    if (lengthPass.value === "" || lengthPass.value < 8 || lengthPass.value > 50 || !isFinite(lengthPass.value)) {
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

function genLogin() {
    const userName = document.querySelector('.input__username');
    const buttonSAP = document.querySelector('.box-buttons__button-sap');
    let finalName = [];

    const transl = {
        'А': 'A',
        'Б': 'B',
        'В': 'V',
        'Г': 'G',
        'Д': 'D',
        'Е': 'E',
        'Ё': 'Yo',
        'Ж': 'Zh',
        'З': 'Z',
        'И': 'I',
        'Й': 'J',
        'К': 'K',
        'Л': 'L',
        'М': 'M',
        'Н': 'N',
        'О': 'O',
        'П': 'P',
        'Р': 'R',
        'С': 'S',
        'Т': 'T',
        'У': 'U',
        'Ф': 'F',
        'Х': 'H',
        'Ц': 'TS',
        'Ч': 'Ch',
        'Ш': 'Sh',
        'Щ': 'Sh',
        'Ъ': '',
        'Ы': 'Y',
        'Ь': '',
        'Э': 'E',
        'Ю': 'Yu',
        'Я': 'Ya',
        'а': 'a',
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'д': 'd',
        'е': 'e',
        'ё': 'yo',
        'ж': 'zh',
        'з': 'z',
        'и': 'i',
        'й': 'y',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'о': 'o',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'у': 'u',
        'ф': 'f',
        'х': 'h',
        'ц': 'ts',
        'ч': 'ch',
        'ш': 'sh',
        'щ': 'sh',
        'ъ': '',
        'ы': 'y',
        'ь': '',
        'э': 'e',
        'ю': 'yu',
        'я': 'ya',
    }

    let userArr = userName.value.split(' ').filter(Boolean);

    if (userArr[1]) {
        userArr[1] = userArr[1].slice(0, 1);
    }

    if (userArr[2]) {
        userArr[2] = userArr[2].slice(0, 1);
    }

    if (userArr.length > 3) {
        return alert('ФИО должно содержать 3 слова')
    }

    userArr = userArr.join('').toUpperCase();
    keys = Object.keys(transl);


    for (let a = 0; a < userArr.length; a++) {
        for (let i = 0; i < keys.length; i++) {
            if (userArr[a] === keys[i]) {
                finalName.push(transl[keys[i]])
                continue;
            } else if (userArr[a] === transl[keys[i]]) {
                finalName.push(userArr[a])
            }
        }
    }

    return passwordOutput.value = finalName.join('').toUpperCase();
}


const showCopyPopup = () => {
    copyStatus.classList.remove('hide');
    setTimeout(() => copyStatus.classList.add('hide'), 1500)
};

generatePassword.onclick = genPass;

generatePasswordOffice.onclick = function() {
    lengthPass.value = 9;
    genPass();
    navigator.clipboard.writeText(passwordOutput.value);
    showCopyPopup();
};

copyPassword.onclick = function() {
    navigator.clipboard.writeText(passwordOutput.value);
    showCopyPopup();
};

generatePasswordSAP.onclick = function() {
    if (genLogin()) {
        navigator.clipboard.writeText(passwordOutput.value);
        showCopyPopup();
    }

};
