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
        console.log(selectedStatus);
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

    newListItem.appendChild(deviceType);
    newListItem.appendChild(diagnosis);
    newListItem.appendChild(status);
    newListItem.appendChild(dateOfRepair);
    newListItem.appendChild(location);
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
    const repairs = await getUserRepairs();
    const repairList = document.getElementById('repairList');
    if (repairs.length > 0) {
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
    } else {
        const noRepariParagraph = document.createElement('p');
        noRepariParagraph.innerHTML = "U heeft nog geen reparaties";
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

    const card = document.createElement('div');
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