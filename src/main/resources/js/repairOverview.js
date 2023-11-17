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

main = async () => {
    const repairs = await getUserRepairs();
    console.log(repairs);
    const repairList = document.getElementById('repairList');
    if (repairList) {
        console.log('in repairlist');
        repairs.forEach(repair => {
            const newListItem = document.createElement('div');
            newListItem.id = "repairItem";
            const deviceType = document.createElement('p');
            deviceType.innerHTML = repair.deviceType;
            const status = document.createElement('p');
            status.innerHTML = repair.status;
            const dateOfRepair = document.createElement('p');
            dateOfRepair.innerHTML = repair.dateOfRepair;
            const location = document.createElement('p');
            location.innerHTML = repair.location;

            newListItem.appendChild(deviceType);
            newListItem.appendChild(status);
            newListItem.appendChild(dateOfRepair);
            newListItem.appendChild(location);
            repairList.appendChild(newListItem);
        });
    }
}

main();