
const displayMainDiv = () => {
    const div = document.getElementById('maindiv');
    createDropDown();
    createNextButton();
    document.querySelector('button').addEventListener('click', () => {
        const value = document.querySelector('select').value;
        console.log(value);
        div.innerHTML = ""
        enterModel();

    
    });

}

const enterModel = () =>{
    const div = document.getElementById('maindiv')
    const label1 = document.createElement('label')
    label1.innerHTML = "req1"
    const input1 = document.createElement('input')
    input1.innerHTML = "req1"
    const label2 = document.createElement('label')
    label2.innerHTML = "req1"
    const input2 = document.createElement('input')
    input2.innerHTML = "req1"
    const label3 = document.createElement('label')
    label3.innerHTML = "req1"
    const input3 = document.createElement('input')
    input3.innerHTML = "req1"
    div.appendChild(label1)
    div.appendChild(input1)
    div.appendChild(label2)
    div.appendChild(input2)
    div.appendChild(label3)
    div.appendChild(input3)
    const button = document.createElement('button')
    button.innerHTML = "Start"
    div.appendChild(button)
    
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
    button.id = "repair_form"
    
    const div = document.getElementById('maindiv');
    div.appendChild(button);
}

displayMainDiv();
