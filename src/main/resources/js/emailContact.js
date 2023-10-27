

const displayEmailMain = () =>{
    const divMain = document.createElement('div');
    divMain.id = 'emailMain';
    const main = document.querySelector('main');
    main.appendChild(divMain);
    
    const emailButton = createButton('Hulp nodig met het formulier? Stuur een mail!', 'emailButton')
    divMain.appendChild(emailButton);
    
    const formButton = createButton('Vul het formulier zelf in', 'formButton')
    divMain.appendChild(formButton);

    emailButton.addEventListener('click', () => {
        divMain.innerHTML = "";
        displayEmailForm();
    });
    formButton.addEventListener('click', () => {
        divMain.innerHTML = "";
        displayMainDiv();
    });
}

const createButton = (text, id) =>{
    const button = document.createElement('button');
    button.innerText = text;
    button.id = id;
    return button;
}

const displayEmailForm = () =>{
    const form = document.createElement('form');
    const mainDiv = document.getElementById('emailMain');
    mainDiv.id = 'emailForm';
    const label1 = document.createElement('label');
    label1.innerText = 'Email-adres';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    const label2 = document.createElement('label');
    label2.innerText = 'Telefoonnummer';
    const phoneInput = document.createElement('input');
    form.appendChild(label1);
    form.appendChild(emailInput);
    form.appendChild(label2);
    form.appendChild(phoneInput);
    mainDiv.appendChild(form);


    const button = createButton('Verstuur', 'sendButton');
    mainDiv.appendChild(button);

}

displayEmailMain();



