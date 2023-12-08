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

showClickedOnRepair = async (repair) => {
    const originalStatus = repair.status;
    let selectedStatus = originalStatus;
    let sendPostRequest = false;
    const repairList = document.getElementById('repairList');
    const newListItem = document.createElement('div');
    newListItem.id = "repairItem";
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

    const user = document.createElement('p');
    location.innerHTML = "Gebruiker: " + email;

    newListItem.appendChild(deviceType);
    newListItem.appendChild(diagnosis);
    newListItem.appendChild(status);
    newListItem.appendChild(dateOfRepair);
    newListItem.appendChild(location);
    newListItem.appendChild(user);

    if (role !== "USER") {
        const user = document.createElement('p');
        location.innerHTML = "Gebruiker: " + email;
        newListItem.appendChild(user);
    }

    const deleteIcon = document.createElement('a');
    deleteIcon.innerHTML = `<i class="fa fa-trash"></i>`;
    deleteIcon.addEventListener("click", () => {
        console.log(repair.id);
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

if (sessionStorage.getItem("role") === "REPAIR") {
    const createCalenderOverview = () => {
        const p = document.createElement('p');
        p.innerHTML = "Bekijk je "
        const a = document.createElement('a')
        a.href = "https://outlook.office.com/calendar/view/month"
        a.target = "_blank"
        a.innerHTML = "Agenda"
        p.appendChild(a)
        return p
    }
    document.querySelector('main').appendChild(createCalenderOverview());
}

displayUserInfo();

showAllRepairs();