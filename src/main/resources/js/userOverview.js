getAllUsers = async () => {
    const response = await fetch(`http://127.0.0.1:8080/api/profile/overview`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const result = await response.json();
    return result;
}
clear = () => {
    document.getElementById('userList').innerHTML = "";
    document.getElementById('deviceList').innerHTML = "";
    document.getElementById('selectRole').innerHTML = "";
    document.getElementById('userInfo').innerHTML = "";
    document.getElementById('repairList').innerHTML = "";
}

clearUserOverview = () => {
    document.getElementById('userList').innerHTML = "";
}

showAllUsers = async () => { 
    
    const users = await getAllUsers();
    const userList = document.getElementById('userList');
    if (userList) {
        // Create the table element
        const table = document.createElement('table');
        table.style.width = '100%'; // Optional: Set table width
        table.setAttribute('border', '1'); // Optional: Set table border

        // Create a table row
        const trHead = document.createElement('tr');
    
        const thEmail = document.createElement('th');
        thEmail.appendChild(document.createTextNode(`Email`));
        trHead.appendChild(thEmail);

        const thFirstName = document.createElement('th');
        thFirstName.appendChild(document.createTextNode(`Voornaam`));
        trHead.appendChild(thFirstName); 
        
        const thLastName = document.createElement('th');
        thLastName.appendChild(document.createTextNode(`Achternaam`));
        trHead.appendChild(thLastName); 

        const thRole = document.createElement('th');
        thRole.appendChild(document.createTextNode(`Rol`));
        trHead.appendChild(thRole); 
       

        // Append the row to the table
        table.appendChild(trHead);

        // Append the table to the div
        userList.appendChild(table);

        for (const user of users) {
            const trRow = document.createElement('tr');
            const tdEmail = document.createElement('td');
            tdEmail.appendChild(document.createTextNode(user.email));
            trRow.appendChild(tdEmail);
            const tdFirstName = document.createElement('td');
            tdFirstName.appendChild(document.createTextNode(user.firstname));
            trRow.appendChild(tdFirstName);
            const tdLastName = document.createElement('td');
            tdLastName.appendChild(document.createTextNode(user.lastname));
            trRow.appendChild(tdLastName);
            const tdRole = document.createElement('td');
            tdRole.appendChild(document.createTextNode(user.role));
            trRow.appendChild(tdRole);
            table.appendChild(trRow);
            
            const updateButton = document.createElement('button');
            updateButton.innerHTML = "Update";
            updateButton.id = "updateButton";
            trRow.appendChild(updateButton);
            // trRow.addEventListener("click", () => {
            //     clearUserOverview();
            //     showClickedOnUser(user);
            // });
            updateButton.addEventListener("click", () => {
                // Check if dropdown already exists
                if (document.getElementById('selectRole')) {
                    return;
                }
            
                // Create select element
                const selectRole = document.createElement('select');
                selectRole.id = 'selectRole';
            
                // Create ADMIN option
                const adminOption = document.createElement('option');
                adminOption.value = 'ADMIN';
                adminOption.text = 'ADMIN';
            
                // Create USER option
                const userOption = document.createElement('option');
                userOption.value = 'USER';
                userOption.text = 'USER';
            
                // Append options to select
                selectRole.appendChild(adminOption);
                selectRole.appendChild(userOption);
            
                // Append select to the row
                trRow.appendChild(selectRole);
            });
            
        }
    }
    
};

getAllDevices = async () => {
    const response = await fetch(`http://127.0.0.1:8080/api/devices/overview`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const result = await response.json();
    return result;
}


const showAllDevices = async () => {
    const devices = await getAllDevices();
    const deviceList = document.getElementById('deviceList');
    if (deviceList) {
        // Create the table element
        const table = document.createElement('table');
        table.style.width = '100%'; // Optional: Set table width
        table.setAttribute('border', '1'); // Optional: Set table border

        // Create a table row
        const trHead = document.createElement('tr');
    
        const thdeviceModelNumber = document.createElement('th');
        thdeviceModelNumber.appendChild(document.createTextNode(`deviceModelNumber`));
        trHead.appendChild(thdeviceModelNumber);

        const thpurchasePrice = document.createElement('th');
        thpurchasePrice.appendChild(document.createTextNode(`purchase price`));
        trHead.appendChild(thpurchasePrice); 
        
        const thbereidTeBetalen = document.createElement('th');
        thbereidTeBetalen.appendChild(document.createTextNode(`bereid te betalen`));
        trHead.appendChild(thbereidTeBetalen); 

        const thageInMonths = document.createElement('th');
        thageInMonths.appendChild(document.createTextNode(`age in months`));
        trHead.appendChild(thageInMonths); 
       
        const thdiagnose = document.createElement('th');
        thdiagnose.appendChild(document.createTextNode(`diagnose`));
        trHead.appendChild(thdiagnose); 

        const thuserId = document.createElement('th');
        thuserId.appendChild(document.createTextNode(`userId`));
        trHead.appendChild(thuserId); 

        // Append the row to the table
        table.appendChild(trHead);

        // Append the table to the div
        
        deviceList.appendChild(table);

        for (const device of devices) {
            const trRow = document.createElement('tr');
            const tddeviceModelNumber = document.createElement('td');
            tddeviceModelNumber.appendChild(document.createTextNode(device.deviceModelNumber));
            trRow.appendChild(tddeviceModelNumber);
            const tdpurchasePrice = document.createElement('td');
            tdpurchasePrice.appendChild(document.createTextNode(device.purchasePrice));
            trRow.appendChild(tdpurchasePrice);
            const tdbereidTeBetalen = document.createElement('td');
            tdbereidTeBetalen.appendChild(document.createTextNode(device.bereidTeBetalen));
            trRow.appendChild(tdbereidTeBetalen);
            const tdageInMonths = document.createElement('td');
            tdageInMonths.appendChild(document.createTextNode(device.ageInMonths));
            trRow.appendChild(tdageInMonths);
            const tddiagnose = document.createElement('td');
            tddiagnose.appendChild(document.createTextNode(device.diagnose));
            trRow.appendChild(tddiagnose);
            const tduserId = document.createElement('td');
            tduserId.appendChild(document.createTextNode(device.userId));
            trRow.appendChild(tduserId);
            table.appendChild(trRow);

            
            
            };}
            
        
};

if (sessionStorage.getItem("role") === "ADMIN") {
    //statements 
    const btn1 = document.createElement("button");
    btn1.innerHTML = "Beheer gebruikers";

    const btn2 = document.createElement("button");
    btn2.innerHTML = "Beheer devices";

    const main = document.querySelector("main");
    main.appendChild(btn1);
    main.appendChild(btn2);

    btn1.addEventListener("click", () => {
        showAllUsers();
    });
    btn2.addEventListener("click", () => {
        showAllDevices();
    });
    
}



