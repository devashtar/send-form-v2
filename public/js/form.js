let lineBreakHint = false;   // A one-time variable needed to display a modal window in the editor of the message to the author (window on the right). It works when we press "ENTER" on the keyboard!
let currentLang = 'en';  // Curren language. By default england.
// ru
const ruRules = `
<h3>Правила пользования.</h3>
<p><b>Описание:</b> Это форма для отправки текстовых сообщений, с возможностью прикрепления файлов в следующих форматах: txt, word, excel, doc, docx, pdf, jpeg, jpg, png.</p>
<h4>Важно!</h4>
<p>Для отправки сообщений необходимо заполнить все поля, кроме поля, куда вы можете прикрепить файл по своему усмотрению.</p>
<p><b>"Имя"</b> - Поле имени должно содержать символы латинского алфавита или кириллицы. Максимальное количество символов - 22.</p>
<p><b>"Почта"</b> - Пример написания вашей почты: «example.@gmail.com» или «your_mail.name@mail.ru». Максимальное количество символов - 40.</p>
<p><b>"Сообщение"</b> - Максимальное количество символов - 2000.</p>
<p><b>Ограничения:</b> <br/>
 <b>- Сообщение:</b> Количество символов не может превышать 2000, включая пробелы и разрывы строк (при разрыве строки в специальном окне редактирования сообщения добавляется тег «br»). <br/>
 <b>- Файл:</b> Допустимые форматы: txt, word, excel, doc, docx, pdf, jpeg, jpg, png. Максимальный размер файла не должен превышать 2 МБ. Максимально возможное количество файлов - 1. 
</p>
`;

// en
const enRules = `
<h3>Application rules.</h3>
<p><b>Description:</b> This is a form for sending text messages, and with the ability to attach a file in the following formats: txt, word, excel, doc, docx, pdf, jpeg, jpg, png.</p>
<h4>Important!</h4>
<p>To send messages, you must fill in all the fields, except for the field where you can attach a file at your discretion.</p>
<p><b>"Name"</b> - The name field must contain either Latin or Cyrillic characters. The maximum number of characters is 22.</p>
<p><b>"e-mail"</b> - An example of writing your mail: "example.@gmail.com" or "your_mail.name@mail.ru". The maximum number of characters is 40.</p>
<p><b>"Message"</b> - The maximum number of characters is 2000.</p>
<p><b>Limitations:</b> <br/>
 <b>- Message:</b> The number of characters cannot exceed 2000, including spaces and line breaks (when a line break in a special window for editing of message, the tag "br" is added). <br/>
 <b>- File:</b> Acceptable formats: txt, word, excel, doc, docx, pdf, jpeg, jpg, png. The maximum file size should not exceed 2MB. The maximum possible number of files is 1. 
</p>
`;

// update Rules 
document.querySelector('.rules__content').innerHTML = enRules;

//  *****************************    UPDATE LANGUAGE   ***************************************
document.querySelector('.languages').addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.id === 'langen' || event.target.id === 'langru') updatePageContent(event.target.id);
    return;
})

function updatePageContent(lang) {
    if (lang === 'langru') {
        currentLang = 'ru';
        const inputWrapers = document.querySelectorAll('.input__wrapper');
        for (let i = 0; i < inputWrapers.length; i++) {
            for (let elem of inputWrapers[i].children) {
                if (elem.classList.contains('input__type')) {
                    elem.innerHTML = i === 0 ? 'Имя' : i === 1 ? 'Почта' : 'Сообщение';
                }
                if (elem.id === 'empty') {
                    elem.innerHTML = 'Пожалуйста заполните это поле!';
                }
                if (elem.id === 'invalid') {
                    elem.innerHTML = i === 0 ? 'Только символы латиницы или киррилицы' : i === 1 ? 'Пример почты: example@gmail.com' : 'Неизвестная ошибка, попробуйте снова';
                }
            }
        }
        document.querySelector('.label__file__input').innerHTML = 'Прикрепить файл';
        document.querySelector('.footer__buttons').innerHTML = 'Домой';
        document.querySelector('#btns').value = 'Отправить';
        document.querySelector('.title__textarea').innerHTML = 'Ты можешь написать сообщение автору здесь! )))';
        document.querySelector('.rules__content').innerHTML = ruRules;
    } else if (lang === 'langen') {
        currentLang = 'en';
        const inputWrapers = document.querySelectorAll('.input__wrapper');
        for (let i = 0; i < inputWrapers.length; i++) {
            for (let elem of inputWrapers[i].children) {
                if (elem.classList.contains('input__type')) {
                    elem.innerHTML = i === 0 ? 'Name' : i === 1 ? 'e-mail' : 'Message';
                }
                if (elem.id === 'empty') {
                    elem.innerHTML = 'Please fill in this field!';
                }
                if (elem.id === 'invalid') {
                    elem.innerHTML = i === 0 ? 'Only Latin or Cyrillic characters!' : i === 1 ? 'example@gmail.com' : 'Unknown error, please try again!';
                }
            }
        }
        document.querySelector('.label__file__input').innerHTML = 'Attach file';
        document.querySelector('.footer__buttons').innerHTML = 'Home';
        document.querySelector('#btns').value = 'Send';
        document.querySelector('.title__textarea').innerHTML = 'You can write a message to the author here! )))';
        document.querySelector('.rules__content').innerHTML = enRules;
    }
    checkFiles();
}
//  *****************************    /UPDATE LANGUAGE   ***************************************


//**************** */ Animation text of input field *************************
document.querySelectorAll('.input').forEach((el) => {
    el.addEventListener('focus', (e) => {
        e.preventDefault();
        resetField(e.target);
        e.target.previousElementSibling.classList.add('up');
    });
    el.addEventListener('blur', (e) => {
        e.preventDefault();
        resetField(e.target);
        e.target.value = e.target.value.trim();
        if (e.target.value === '') {
            e.target.previousElementSibling.classList.remove('up');
        } else {
            checkFillField(e.target, e.target.id)
        }
    });
})

// function for reset style field
function resetField(el) {
    if (el.classList.contains('error')) {
        el.classList.remove('error');
        if (el.parentElement.children[2].classList.contains('show__broom')) {
            el.parentElement.children[2].classList.remove('show__broom');
        }
        if (el.nextElementSibling.classList.contains('show')) {
            el.nextElementSibling.classList.remove('show');
        } 
        if (el.parentElement.lastElementChild.classList.contains('show')) {
            el.parentElement.lastElementChild.classList.remove('show');
        }
    } else if (el.classList.contains('valid')) {
        el.classList.remove('valid');
        el.parentElement.children[1].classList.remove('show');
    }
}

// field = input that need check || fieldId = input.id
function checkFillField(field, fieldId) {
    field.value = field.value.trim().split(' ').filter((item, index) => index === 0 ? item : item === '' ? false : ` ${item}`).join(' ');
    if (field.classList.contains('error')) return true;
    if (field.classList.contains('valid') && field.value === '') { resetField(field); return true; }
    const reName = /^[a-zа-яё]+(?:\s[a-zа-яё]+)?$/i;
    const reMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validStr = fieldId === 'inputname' ? reName : fieldId === 'inputmail' ? reMail : '';
    
    if (field.value === '') {
        field.classList.add('error');
        field.nextElementSibling.classList.add('show');
        return true;
    } else if (validStr !== '') {
        if (field.value.match(validStr) === null) {
            field.classList.add('error');
            field.parentElement.lastElementChild.classList.add('show');
            field.parentElement.children[2].classList.add('show__broom');
            field.parentElement.children[2].addEventListener('click', (event) => {event.preventDefault(); field.value = ''; resetField(field); field.focus();})
            return true;
        } else {
            field.classList.add('valid');
            field.parentElement.children[1].classList.add('show');
            return false;
        }
    } else {
        field.classList.add('valid');
            field.parentElement.children[1].classList.add('show');
            return false;
    }
}

document.querySelector('.container').addEventListener('click', (e) => {
    e.stopPropagation();
    
    const decisive = e.target.className;
    if (decisive !== 'info__button') {
        document.querySelector('.info__button').classList.remove('move');
    } else {
        document.querySelector('.info__button').classList.add('move');
    }
    
    // Rules
    if (e.target.id === 'rultext') {
        document.querySelector('.rules').classList.add('show');
        document.querySelector('.rules').addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('.rules').classList.remove('show');
        })
    }

    // Prewiew message and it editing
    if (e.target.id === 'prewmes') {
        document.querySelector('.text__content').addEventListener('keyup', (event) => {
            event.preventDefault();
            if (event.code === 'Enter') {
                event.target.value = event.target.value + '<br/> '
                if (!lineBreakHint) {
                    lineBreakHint = true;
                    if (currentLang === 'en') {
                        alert('All is well ))). This tag is needed for line breaks, do not remove it. This tag is used for markup. You can also see by the "<br/>" tag and find out where the line break was.');
                    } else {
                        alert('Все хорошо ))). Этот тег нужен для разрывов строк, не удаляйте его. Этот тег используется для разметки. Вы также можете увидеть по тегу «<br/>», где был разрыв строки.');
                    }
                    
                }
            }
        })
        document.querySelector('.content__message').classList.add('show');
        document.querySelector('.text__content').value = document.querySelector('#inputmessage').value;
    }
    if (decisive === 'closer') {
        document.querySelector('.content__message').classList.remove('show');
        if (e.target.id === 'okey') {
            document.querySelector('#inputmessage').value = document.querySelector('.text__content').value;
            checkFillField(document.querySelector('#inputmessage'), 'inputmessage');
            if (document.querySelector('#inputmessage').value === '') {
                resetField(document.querySelector('#inputmessage'));
                document.querySelector('#inputmessage').previousElementSibling.classList.remove('up');
            } else {
                document.querySelector('#inputmessage').previousElementSibling.classList.add('up');
            }
        }
    }
    if (decisive === 'signature') {
        document.querySelector('.text__content').focus();
    }
})

//***********  inpit FILE   **************

function checkFiles() {
    if (document.querySelector('#inputfile').files.length === 0) return;
    const inputFile = document.querySelector('#inputfile').files;
    
    if (inputFile.length > 1) {
        document.querySelector('#inputfile').value = '';
        if (currentLang === 'en') {
            alert('You can attach no more than one file!');
        } else {
            alert('Ты можешь прикрепить не более одного файла!');
        }
    } else if (inputFile[0].size < 10490000) {   // max limit 10MB
        let result = '';
        const nBytes = inputFile[0].size;
        for (let aMultiples = ["KB", "MB", "GB", "TB"], nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            result = currentLang === 'en' ? `Size:<br/> ${nApprox.toFixed(3)} ${aMultiples[nMultiple]} <br/>Type:<br/> ${inputFile[0].type}` : `Размер:<br/> ${nApprox.toFixed(3)} ${aMultiples[nMultiple]} <br/>Тип:<br/> ${inputFile[0].type}`;
        }
        document.querySelector('.file__about__block').innerHTML = result === '' && currentLang === 'en' ? `Size:<br/> ${nBytes} bytes <br/>Type:<br/> ${inputFile[0].type}` : result === '' && currentLang === 'ru' ? `Размер:<br/> ${nBytes} байт <br/>Тип:<br/> ${inputFile[0].type}` : result; 
    } else {
        document.querySelector('#inputfile').value = '';
        if (currentLang === 'en') {
            alert('Maximum allowed file size 10MB!');
        } else {
            alert('Максимально допустимый размер файла 10МБ!');
        }
    }   
}
//***********  /inpit FILE  **************


// ***********  SUBMIT  send message  **************

document.querySelector('#form').addEventListener('submit', async (event) => {
    event.preventDefault();
    let checker = false;
    await document.querySelectorAll('.input').forEach((el) => {
        if (checkFillField(el, el.id)) checker = true;
    })
    if (checker) return false;
    // ************ SEND FORM DATA *************** 

    const file = await document.querySelector('#inputfile').files[0];
    if (file) {
        const objUser = {
            name: document.querySelector('#inputname').value,
            mail: document.querySelector('#inputmail').value,
            text: document.querySelector('#inputmessage').value,
            nameFile: file.name
        }
        const preparedFile = file.slice(0);
        const fileType = await file.type;
        fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': fileType,
                'X-File-Name': file.name
            },
            body: preparedFile
        }).then(response => {
            if (response.ok) {
                sendJsonData(objUser)
            } else {
                if (currentLang === 'en') {
                    alert('Sorry! try again.');
                } else {
                    alert('Что-то пошло не так, попробуйте еще раз!')
                }
            }
        })
    } else {
        const objUser = {
            name: document.querySelector('#inputname').value,
            mail: document.querySelector('#inputmail').value,
            text: document.querySelector('#inputmessage').value,
        }
        sendJsonData(objUser)
    }
    // ************ /SEND FORM DATA ***************    
})

function sendJsonData(obj) {
    fetch('/uploadjson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    }).then(resp => {
        if (resp.ok) {
            if (currentLang === 'en') {
                alert('Message success sent!');
            } else {
                alert('Сообщение успешно отправлено!')
            }
            location.reload();
        } else {
            if (currentLang === 'en') {
                alert('Sorry! try again.');
            } else {
                alert('Что-то пошло не так, попробуйте еще раз!')
            }
        }
    })
}

// ***********  /SUBMIT  send message  **************