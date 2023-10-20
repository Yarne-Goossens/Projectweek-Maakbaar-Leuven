const generateMainDiv = () => {
    const div = document.createElement('div');
    div.id = 'maindiv';
    const main = document.querySelector('main');
    main.appendChild(div);

};
const displayMainDiv = () => {
    generateMainDiv();
    const div = document.getElementById('maindiv');
    createDropDown();
    createNextButton();
    document.getElementById('next').addEventListener('click', () => {
        const value = document.querySelector('select').value;
        console.log(value);
        clearDiv("maindiv");
        div.setAttribute('id', 'nextdiv');
        enterModel();
        
    });
    
}

const enterAndPostDeviceInfo = async () => {
    const input1 = document.getElementById('input1').value;
    const input2 = document.getElementById('input2').value;
    const input3 = document.getElementById('input3').value;
    const device = {deviceModelNumber:input1, energyConsumption:input2, buildYear:input3};
    const response = await fetch("http://localhost:8080/api/devices/add", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(device),
    });
    const result = await response.json();
    if (response.status === 400) {
        Object.keys(result).forEach((fieldName) => {
            document.getElementById(`${fieldName}-error`).innerText =
                result[fieldName];
        });
        console.log("Device is not added.");
    } else {
        console.log("werkt wel");
        console.log(input1,input2,input3)
    }
    
}

const getRepairs = async () =>{
    const response = await fetch("http://localhost:8080/api/devices/overview", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    });
    const result = await response.json()
    console.log(result)
}


const enterModel = () =>{
    const div = document.getElementById('nextdiv')
    const label1 = document.createElement('label')
    label1.innerHTML = "Device Model Number: "
    const input1 = document.createElement('input')
    input1.id= "input1"
    const label2 = document.createElement('label')
    label2.innerHTML = "Energieverbruik"
    const input2 = document.createElement('input')
    input2.id= "input2"
    const label3 = document.createElement('label')
    label3.innerHTML = "Bouwjaar"
    const input3 = document.createElement('input')
    input3.id= "input3"
    div.appendChild(label1)
    div.appendChild(input1)
    div.appendChild(label2)
    div.appendChild(input2)
    div.appendChild(label3)
    div.appendChild(input3)
    const button = document.createElement('button')
    button.innerHTML = "Start"
    button.id = "start"
    div.appendChild(button)   
    const startbutton = document.getElementById('start');
    startbutton.addEventListener('click', () => {
        enterAndPostDeviceInfo();
        getRepairs();
        clearDiv("nextdiv");
        div.setAttribute('id', 'vraag1div');
        displayBranchQuestion();

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
    button.id = "next"
    
    const div = document.getElementById('maindiv');
    div.appendChild(button);
}
const displayBranchQuestion = () => {
    const div = document.getElementById('vraag1div');
    const data = matrix[0];
    let clickedInputId = 0;
    let index = 1;
    data.forEach((element) => {
        const label = document.createElement('label');
        label.innerHTML = element;
        div.appendChild(label);
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `${index}`;
        input.name= "vraag1";
        div.appendChild(input);
        index++;


        // test

        input.addEventListener('click', (event) => {
            const clickedInput = event.target;
            clickedInputId = clickedInput.id;
            console.log(`Clicked input ID : ${clickedInputId}`);
        });
        
    })
    const vraag1button = document.createElement('button');
    vraag1button.innerHTML = 'Volgende';
    vraag1button.id = "vraag1button"
    div.appendChild(vraag1button);

    vraag1button.addEventListener('click', () => {
        clearDiv("vraag1div");
        div.setAttribute('id', 'treediv');
        const BranchDecider = clickedInputId;
        
        branchNavigation(BranchDecider);
    }
    )
    ;
};
let index = 0;
let result = [];
const branchNavigation = (BranchDecider) =>{
    
    const div = document.getElementById('treediv');
    const p = document.createElement('p');
    p.innerHTML = matrix[BranchDecider][index];
    div.appendChild(p);

    const label1 = document.createElement('label');
    label1.innerHTML = 'Ja';
    const label2 = document.createElement('label');
    label2.innerHTML = 'Nee';

    const input1 = document.createElement('input');
    input1.type = 'radio';
    input1.name  = 'tree'
    input1.id = 1;

    input1.addEventListener('click',(event)=>{
        const clickedInput = event.target;
        clickedInputId = clickedInput.id;
        

    })

    const input2 = document.createElement('input');
    input2.type = 'radio';
    input2.name  = 'tree'
    input2.id = 0;

    input2.addEventListener('click',(event)=>{
        const clickedInput = event.target;
        clickedInputId = clickedInput.id;
        

    })

    div.appendChild(label1);
    div.appendChild(input1);
    div.appendChild(label2);
    div.appendChild(input2);

    const treeButton = document.createElement('button');
    treeButton.innerHTML = 'Volgende';
    treeButton.id = 'treebutton';
    div.appendChild(treeButton);

    treeButton.addEventListener('click', () => {
        
        index++
        if(matrix[BranchDecider].length === index ){
            //POST result
            //clearDiv("treediv");
            clearDiv("treediv");
            result.push(clickedInputId);
            console.log(result)
            
        }
        else{
            clearDiv("treediv");
            branchNavigation(BranchDecider);
            result.push(clickedInputId);
        }

        
    })

}


displayMainDiv();
