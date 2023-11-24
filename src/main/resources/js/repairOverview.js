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

showClickedOnRepair = (repair) => {
    const originalStatus = repair.status;
    let selectedStatus = originalStatus;
    let sendPostRequest = false;
    const repairList = document.getElementById('repairList');
    const newListItem = document.createElement('div');
    newListItem.id = "repairItem";
    const deviceType = document.createElement('p');
    deviceType.innerHTML = "Toestel: " + repair.deviceType;

    const status = document.createElement('p');
    status.innerHTML = "Status: "

    const statusSelect = document.createElement('select');
    const statusOptions = ["in behandeling", "voltooid"];
    statusOptions.forEach(optionValue => {
        const option = document.createElement('option');
        option.value = optionValue;
        option.text = optionValue;
        if (optionValue === repair.status) {
            option.selected = true;
        }
        statusSelect.appendChild(option);
    });

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
    diagnosis.innerHTML = "Diagnose: TODO"

    const user = document.createElement('p');
    location.innerHTML = "Gebruiker: " + email;

    newListItem.appendChild(deviceType);
    newListItem.appendChild(diagnosis);
    newListItem.appendChild(status);
    newListItem.appendChild(dateOfRepair);
    newListItem.appendChild(location);
    newListItem.appendChild(user);
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
    if (repairList && role === "USER") {
        const repairs = await getUserRepairs();
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
    } else if (repairList && role === "REPAIR") {
        const allRepairs = await getAllRepairs();
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

            newListItem.appendChild(deviceType);
            newListItem.appendChild(status);
            newListItem.appendChild(dateOfRepair);
            newListItem.appendChild(location);
            newListItem.appendChild(user);
            link.appendChild(newListItem);
            repairList.appendChild(link);

            link.addEventListener("click", () => {
                clearRepairOverview();
                showClickedOnRepair(repair);
            });
        }
    }
};

showAllRepairs();