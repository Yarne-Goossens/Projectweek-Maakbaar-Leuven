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

    const diagnosis = document.createElement('p');
    diagnosis.innerHTML = `Diagnose: + <a href="">${repair.mainChoice}</a>`;

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
    deleteIcon.addEventListener("click", () => {
        deleteRepair(repair.id, email);
    })
    newListItem.appendChild(deleteIcon);

    repairList.appendChild(newListItem);

    const terugButton = document.createElement('button');
    terugButton.innerHTML = "Terug";
    terugButton.id = "terugButton";
    const bodyRepair = document.querySelector('#repairList');
    bodyRepair.appendChild(terugButton);

    terugButton.addEventListener("click", async () => {
        if (sendPostRequest) {
            await changeStatus(repair.id, selectedStatus);
        }
        clearRepairOverview();
        showAllRepairs();
    })
};

showAllRepairs = async () => {
    const repairList = document.getElementById('repairList');
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

displayUserInfo();

showAllRepairs();