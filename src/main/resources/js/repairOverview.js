let email = "email@undefined";
getUserRepairs = async () => {
    const id = sessionStorage.getItem('id');

    const response = await fetch(`http://127.0.0.1:8080/api/repairs/overview/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const result = await response.json();
    return result;
}

addDevice = async (device) => {
    const response = await fetch(`http://localhost:8080/api/profile/${sessionStorage.getItem("id")}/addDevice`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(device),
    });
}

getUserDevices = async () => {
    const id = sessionStorage.getItem('id');

    const response = await fetch(`http://127.0.0.1:8080/api/devices/overview/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const result = await response.json();
    return result;
}

getUserFromRepair = async (id) => {

    const response = await fetch(`http://127.0.0.1:8080/api/profile/repair/${id}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const result = await response.json();
    for (let key in result) {
        if (result.hasOwnProperty(key)) {
            if (key === "email") {
                return result[key];
            }
        }
    }
}

deleteRepair = async (id, email) => {
    const response = await fetch(`http://127.0.0.1:8080/api/repairs/delete/${id}/${email}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const result = await response.json();
    return result;
}

getAllRepairs = async () => {
    const response = await fetch(`http://127.0.0.1:8080/api/repairs/overview`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const result = await response.json();
    return result;
}

clearRepairOverview = () => {
    document.getElementById('repairList').innerHTML = "";
    document.getElementById('deviceList').innerHTML = "";
}

changeStatus = async (id, status) => {
    const response = await fetch(`http://localhost:8080/api/repairs/status/${id}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: status,
    });
    const result = await response.json();
    return result;
}

const mainChoiceConverter = (mainChoice) => {
    return matrixProblems[mainChoice - 1];
};

convertRepairToJSON = (repair) => {
    const dateString = repair.dateOfRepair;
    const inputDateString = "8/12/2023";
    const parts = inputDateString.split('/');

    // Rearrange the parts to the "YYYY-MM-DD" format
    const formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
    const product_age = Math.ceil((repair.ageInMonths) / 12);
    year_of_manufacture = `${parts[2] - product_age}`

    const jsondata = `{
        "id": "rcint_38849",
        "data_provider": "Repair Caf\u00e9 International",
        "country": "BEL",
        "partner_product_category": "Household appliances electric ~ Vacuum cleaner",
        "product_category": "Vacuum",
        "product_category_id": 34,
        "brand": "Dyson",
        "year_of_manufacture": "${year_of_manufacture}",
        "product_age": "${product_age}",
        "repair_status": "Repairable",
        "repair_barrier_if_end_of_life": "",
        "group_identifier": "0395",
        "event_date": "${formattedDate}",
        "problem": "${mainChoiceConverter(repair.mainChoice)}",
    }`
    return jsondata;
}

showClickedOnRepair = async (repair) => {
    const originalStatus = repair.status;
    let selectedStatus = originalStatus;
    let sendPostRequest = false;
    const repairList = document.getElementById('repairList');
    const newListItem = document.createElement('div');
    newListItem.id = "repairItemSelected";
    const deviceType = document.createElement('p');
    deviceType.innerHTML = "Toestel: " + repair.deviceType;
    email = await getUserFromRepair(repair.id);

    const status = document.createElement('p');
    status.innerHTML = "Status: "

    const role = sessionStorage.getItem('role');
    let statusOptions = "";
    let statusSelect = "";
    if (role === "REPAIR") {
        statusSelect = document.createElement('select');
        statusOptions = ["in afwachting", "in behandeling", "voltooid"];
        statusOptions.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.text = optionValue;
            if (optionValue === repair.status) {
                option.selected = true;
            }
            statusSelect.appendChild(option);
        });
    } else if (role === "USER") {
        statusSelect = document.createElement('select');
        if (repair.status === "in behandeling") {
            statusOptions = ["in behandeling", "zelf opgelost"];
        } else {
            statusOptions = ["in afwachting", "zelf opgelost"];
        }
        statusOptions.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.text = optionValue;
            if (optionValue === repair.status) {
                option.selected = true;
            }
            statusSelect.appendChild(option);
        });
    } else if (role === "ADMIN") {
        statusSelect = document.createElement('select');
        statusOptions = ["in afwachting", "in behandeling", "voltooid", "zelf opgelost"];
        statusOptions.forEach(optionValue => {
            const option = document.createElement('option');
            option.value = optionValue;
            option.text = optionValue;
            if (optionValue === repair.status) {
                option.selected = true;
            }
            statusSelect.appendChild(option);
        });
    }

    statusSelect.addEventListener("change", (event) => {
        selectedStatus = event.target.value;
        if (selectedStatus === originalStatus) {
            sendPostRequest = false;
        } else {
            sendPostRequest = true;
        }
    });

    status.appendChild(statusSelect);

    const dateOfRepair = document.createElement('p');
    dateOfRepair.innerHTML = "Datum: " + repair.dateOfRepair;
    const location = document.createElement('p');
    location.innerHTML = "Locatie: " + repair.location;

    const mainChoiceConverter = (mainChoice) => {
        return matrixProblems[mainChoice - 1];
    };

    const diagnosis = document.createElement('p');
    diagnosis.innerHTML = "Diagnose: "+ mainChoiceConverter(repair.mainChoice);

    const user = document.createElement('p');
    location.innerHTML = "Gebruiker: " + email;

    newListItem.appendChild(deviceType);
    newListItem.appendChild(diagnosis);
    newListItem.appendChild(status);
    newListItem.appendChild(dateOfRepair);
    newListItem.appendChild(location);

    if (role !== "USER") {
        const user = document.createElement('p');
        location.innerHTML = "Gebruiker: " + email;
        newListItem.appendChild(user);
    }

    const deleteIcon = document.createElement('a');
    deleteIcon.innerHTML = `<i class="fa fa-trash"></i>`;
    newListItem.appendChild(deleteIcon);

    deleteIcon.addEventListener("click", async () => {
        await deleteRepair(repair.id, email);
        window.location.href = "user.html";
    })

    repairList.appendChild(newListItem);

    const oplossingButton = document.createElement('button');
    oplossingButton.innerHTML = "Oplossing";
    oplossingButton.id = "oplossingButton";
    const terugButton = document.createElement('button');
    terugButton.innerHTML = "Terug";
    terugButton.id = "terugButton";
    const bodyRepair = document.querySelector('#repairList');
    newListItem.appendChild(oplossingButton);
    newListItem.appendChild(terugButton);

    oplossingButton.addEventListener("click", () => {
        repairList.parentNode.removeChild(repairList);
        main = document.getElementById('userMain');
        const div = document.createElement('div');
        div.id = "solutiondiv";
        main.appendChild(div);
        displaySolution(parseInt(repair.mainChoice), repair);
    });

    terugButton.addEventListener("click", async () => {
        if (sendPostRequest) {
            await changeStatus(repair.id, selectedStatus);
        }
        clearRepairOverview();
        showAllRepairs();
        showAllDevices();
    });
};

showAllRepairs = async () => {
    const repairList = document.getElementById('repairList');
    repairList.appendChild(document.createElement('h2')).innerHTML = "Reparaties";
    const role = sessionStorage.getItem('role');
    const allRepairs = await getAllRepairs();
    const repairs = await getUserRepairs();
    if (repairs.length > 0 && role === "USER") {
        for (const repair of repairs) {
            const link = document.createElement('a');
            const newListItem = document.createElement('div');
            newListItem.id = "repairItem";
            const deviceType = document.createElement('p');
            deviceType.innerHTML = "Toestel: " + repair.deviceType;
            const status = document.createElement('p');
            status.innerHTML = "Status: " + repair.status;
            const dateOfRepair = document.createElement('p');
            dateOfRepair.innerHTML = "Datum: " + repair.dateOfRepair;
            const location = document.createElement('p');
            location.innerHTML = "Locatie: " + repair.location;

            newListItem.appendChild(deviceType);
            newListItem.appendChild(status);
            newListItem.appendChild(dateOfRepair);
            newListItem.appendChild(location);
            link.appendChild(newListItem);
            repairList.appendChild(link);

            link.addEventListener("click", () => {
                clearRepairOverview();
                showClickedOnRepair(repair);
            });
        }
    } else if (allRepairs.length > 0) {
        for (const repair of allRepairs) {
            email = await getUserFromRepair(repair.id);
            const link = document.createElement('a');
            const newListItem = document.createElement('div');
            newListItem.id = "repairItem";
            const deviceType = document.createElement('p');
            deviceType.innerHTML = "Toestel: " + repair.deviceType;
            const status = document.createElement('p');
            status.innerHTML = "Status: " + repair.status;
            const dateOfRepair = document.createElement('p');
            dateOfRepair.innerHTML = "Datum: " + repair.dateOfRepair;
            const location = document.createElement('p');
            location.innerHTML = "Locatie: " + repair.location;
            const user = document.createElement('p');
            location.innerHTML = "Gebruiker: " + email;
            const jsonButton = document.createElement('button');
            jsonButton.innerHTML = "JSON";
            jsonButton.className = "button";


            jsondata = convertRepairToJSON(repair);

            jsonButton.addEventListener("click", (event) => {
                event.stopPropagation();
                alert(convertRepairToJSON(repair));
            });

            newListItem.appendChild(deviceType);
            newListItem.appendChild(status);
            newListItem.appendChild(dateOfRepair);
            newListItem.appendChild(location);
            newListItem.appendChild(user);
            newListItem.appendChild(jsonButton);
            link.appendChild(newListItem);
            repairList.appendChild(link);


            link.addEventListener("click", () => {
                clearRepairOverview();
                showClickedOnRepair(repair);
            });
        }
    } else {
        const noRepariParagraph = document.createElement('p');
        noRepariParagraph.innerHTML = "Er zijn nog geen reparaties";
        repairList.appendChild(noRepariParagraph);
    }
};

const getUser = async (email) => {
    const response = await fetch(`http://localhost:8080/api/profile/${email}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    console.log(result);
    return result;
};


const displayUserInfo = async () => {
    const user = await getUser(sessionStorage.getItem('email'));
    const userdiv = document.getElementById('userInfo');

    const card = document.createElement('article');
    card.id = 'userCard';

    const cardContent = `
        <h2>${user.firstname} ${user.lastname}</h2>
        <p>${user.email}</p>
    `;

    card.innerHTML = cardContent;


    userdiv.appendChild(card);
}

showAllDevices = async () => {
    const deviceList = document.getElementById('deviceList');
    deviceList.appendChild(document.createElement('h2')).innerHTML = "Apparaten";
    const role = sessionStorage.getItem('role');
    const devices = await getUserDevices();
    if (devices.length > 0) {
        for (const device of devices) {
            const link = document.createElement('a');
            const newListItem = document.createElement('div');
            newListItem.id = "repairItem";
            const deviceType = document.createElement('p');
            deviceType.innerHTML = "Merk: " + device.merk;
            const modelnr = document.createElement('p');
            modelnr.innerHTML = "Modelnummer: " + device.deviceModelNumber;
            const age = document.createElement('p');
            age.innerHTML = "Leeftijd: " + device.ageInMonths;
            const bereidtbt = document.createElement('p');
            bereidtbt.innerHTML = "Bereid te betalen: " + device.bereidTeBetalen;
            const aankoopprijs = document.createElement('p');
            aankoopprijs.innerHTML = "Aankoopprijs: " + device.purchasePrice;


            newListItem.appendChild(deviceType);
            newListItem.appendChild(modelnr);
            newListItem.appendChild(age);
            newListItem.appendChild(bereidtbt);
            newListItem.appendChild(aankoopprijs);

            link.appendChild(newListItem);
            deviceList.appendChild(link);

            link.addEventListener("click", () => {

            });
        }
    } else {
        const noRepariParagraph = document.createElement('p');
        noRepariParagraph.innerHTML = "Er zijn nog geen Apparaten";
        deviceList.appendChild(noRepariParagraph);
    }
};

const deviceButton = document.getElementById('deviceButton');
deviceButton.addEventListener("click", () => {
    clearRepairOverview();
    const div = document.getElementById('addDeviceDiv');
    document.getElementById("deviceButton").style.display = "none";
    const label = document.createElement("label");
    label.innerHTML = "Selecteer uw merk: ";
    label.id = "dropdownlabel";

    const select = document.createElement("select");
    select.id = "merk";
    label.appendChild(select);

    const option1 = document.createElement("option");
    option1.value = "Samsung";
    option1.innerHTML = "Samsung";
    select.appendChild(option1);

    const option3 = document.createElement("option");
    option3.value = "AEG";
    option3.innerHTML = "AEG";
    select.appendChild(option3);

    const option4 = document.createElement("option");
    option4.value = "Dyson";
    option4.innerHTML = "Dyson";
    select.appendChild(option4);

    const option5 = document.createElement("option");
    option5.value = "Bosch";
    option5.innerHTML = "Bosch";
    select.appendChild(option5);

    const option6 = document.createElement("option");
    option6.value = "Philips";
    option6.innerHTML = "Philips";
    select.appendChild(option6);

    const option7 = document.createElement("option");
    option7.value = "Rowenta";
    option7.innerHTML = "Rowenta";
    select.appendChild(option7);

    const option8 = document.createElement("option");
    option8.value = "Black&Decker";
    option8.innerHTML = "Black&Decker";
    select.appendChild(option8);

    const option9 = document.createElement("option");
    option9.value = "Domo";
    option9.innerHTML = "Domo";
    select.appendChild(option9);

    div.appendChild(label);

    const label1 = document.createElement("label");
    label1.innerHTML = "Model Nummer Apparaat: ";
    const input1 = document.createElement("input");
    input1.id = "input1";
    input1.required = true;

    const label2 = document.createElement("label");
    label2.innerHTML = "Aankoopprijs:";
    const input2 = document.createElement("input");
    input2.id = "input2";
    const label3 = document.createElement("label");
    label3.innerHTML = "Bereid te betalen:";
    const input3 = document.createElement("input");
    input3.id = "input3";
    const label4 = document.createElement("label");
    label4.innerHTML = "Leeftijd toestel (in maanden):";
    const input4 = document.createElement("input");
    input4.id = "input4";

    const button = document.createElement("button");
    button.innerHTML = "Voeg apparaat toe";
    button.addEventListener("click", () => {
        const device = {
            deviceModelNumber: document.getElementById("input1").value,
            purchasePrice: document.getElementById("input2").value,
            bereidTeBetalen: document.getElementById("input3").value,
            ageInMonths: document.getElementById("input4").value,
            merk: document.getElementById("merk").value,
        };
        addDevice(device);
        document.getElementById("addDeviceDiv").innerHTML = "";
        document.getElementById("deviceButton").style.display = "block";
        showAllRepairs();
        showAllDevices();
    });

    const terugButton = document.createElement('button');
    terugButton.innerHTML = "Terug";
    terugButton.id = "terugButton";
    const bodyRepair = document.querySelector('#addDeviceDiv');

    terugButton.addEventListener("click", async () => {
        clearRepairOverview();
        document.getElementById("addDeviceDiv").innerHTML = "";
        document.getElementById("deviceButton").style.display = "block";
        showAllRepairs();
        showAllDevices();

    });


    div.appendChild(label1);
    div.appendChild(input1);
    div.appendChild(label2);
    div.appendChild(input2);
    div.appendChild(label3);
    div.appendChild(input3);
    div.appendChild(label4);
    div.appendChild(input4);
    div.appendChild(button);
    div.appendChild(terugButton);

});

if (sessionStorage.getItem("role") === "REPAIR") {
    const createCalenderOverview = () => {
        /*const p = document.createElement('p');
        p.innerHTML = "Bekijk je "
        const a = document.createElement('a')
        a.href = "https://outlook.office.com/calendar/view/month"
        a.target = "_blank"
        a.innerHTML = "Agenda"
        p.appendChild(a)
        return p*/
        const createButton = (text, id) => {
            const button = document.createElement("button");
            button.innerText = text;
            button.id = id;
            return button;
        };

        const agendaButton = createButton("Bekijk je agenda", "agendaButton");
        agendaButton.addEventListener("click", () => {
            window.open("https://outlook.office.com/calendar/view/month", "_blank");
        });
        return agendaButton;
    }
    document.querySelector('main').appendChild(createCalenderOverview());
}

displayUserInfo();

showAllRepairs();

showAllDevices();