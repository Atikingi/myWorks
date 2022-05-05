const copyPassword = document.querySelector(".box-buttons__button-copy");
const generatePassword = document.querySelector(".box-buttons__button-generate");
const generatePasswordOffice = document.querySelector(".box-buttons__button-office");
const generatePasswordSAP = document.querySelector(".box-buttons__button-sap");
const lengthPass = document.querySelector(".passwordLength");
const passwordOutput = document.querySelector(".passwordOutput");
const copyStatus = document.querySelector('.content__popup');
const help = document.querySelector('.question-icon');
const howUseIcon = document.querySelector('.how-use-icon')
const helpContentBox = document.querySelector('.box-title');
const howUse = document.querySelector('.box-how-use');

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

function showHelpMessage() {
    const helpBox = document.createElement('div');
    helpBox.classList.add('help-box');
    helpContentBox.appendChild(helpBox);
    helpBox.innerHTML = 'Введите ФИО сотрудника на <br> русской раскладке и нажмите кнопку FOR SAP';
    help.onmouseout = function() {
        helpBox.remove();
    }
}

function showHowUse() {
    const helpBox = document.createElement('div');
    helpBox.classList.add('help-how-use');
    howUse.appendChild(helpBox);
    helpBox.innerHTML = 'Функционал кнопок: <br> <b><u>GENERATE</u></b> - введите длину пароля в поле Password length, чтобы сгенерировать пароль<br><b><u>COPY</u></b> - копирует результат в буфер обмена<br><b><u>FOR OFFICE</u></b> - генерирует пароль из 9 символов с символом <q>!</q> в конце и автоматически копирует в ваш буфер обмена<br><b><u>FOR SAP</u></b> - введите ФИО на русском в поле Username for SAP, чтобы сгенерировать логин для SAP на латиннице (результат - фамилия + первая буква имени + первая буква отчества), сразу копирует результат в ваш буфер обмена';
    howUseIcon.onmouseout = function() {
        helpBox.remove();
    }
}

help.addEventListener('mouseover', showHelpMessage);
howUseIcon.addEventListener('mouseover', showHowUse);


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
