
const displayDiv = () => {
    const div = document.getElementById('maindiv');
    createDropDown();
    createNextButton();
    document.querySelector('button').addEventListener('click', () => {
        const value = document.querySelector('select').value;
        console.log(value);
    });

}

const createDropDown = () => {
    const label = document.createElement('label');
    label.innerHTML = 'Selecteer een apparaat: ';
    const select = document.createElement('select');
    select.id = 'devices';
    label.appendChild(select);
    const option1 = document.createElement('option');
    option1.value = 'Stofzuiger';
    option1.innerHTML = 'Stofzuiger';
    select.appendChild(option1);
    const option2 = document.createElement('option');
    option2.value = '...';
    option2.innerHTML = '...';
    select.appendChild(option2);
    const div = document.getElementById('maindiv');
    div.appendChild(label);
}

const createNextButton = () => {
    const button = document.createElement('button');
    button.innerHTML = 'Volgende';
    const div = document.getElementById('maindiv');
    div.appendChild(button);
}

displayDiv();
