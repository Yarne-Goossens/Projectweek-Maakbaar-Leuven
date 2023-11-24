const displayEmailMain = () => {
    const divMain = document.createElement("div");
    divMain.id = "emailMain";
    const main = document.querySelector("main");
    main.appendChild(divMain);
    
    const LabelOf = document.createElement("label");
    LabelOf.innerText = "Heb je een dringende vraag? Maak een afspraak!";
    LabelOf.style.textAlign = "center";
    const buttonAfspraak = createButton("Maak een afspraak", "sendButton");
    buttonAfspraak.addEventListener("click", function () {
        window.location.href = "booking.html";
    });
    buttonAfspraak.setAttribute("class", "buttonLayout2");
    divMain.appendChild(LabelOf);
    divMain.appendChild(buttonAfspraak);
};

const createButton = (text, id) => {
    const button = document.createElement("button");
    button.innerText = text;
    button.id = id;
    return button;
};

displayEmailMain();
