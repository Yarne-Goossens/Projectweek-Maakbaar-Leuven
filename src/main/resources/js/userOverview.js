getAllUsers = async () => {
	const response = await fetch(`http://127.0.0.1:8080/api/profile/overview`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	const result = await response.json();
	return result;
};

clearUserOverview = () => {
	document.getElementById("userList").innerHTML = "";
};

showAllUsers = async () => {
	const users = await getAllUsers();
	const userList = document.getElementById("userList");
	if (userList) {
		// Create the table element
		const table = document.createElement("table");
		table.style.width = "100%"; // Optional: Set table width
		table.setAttribute("border", "1"); // Optional: Set table border

		// Create a table row
		const trHead = document.createElement("tr");

		const thEmail = document.createElement("th");
		thEmail.appendChild(document.createTextNode(`Email`));
		trHead.appendChild(thEmail);

		const thFirstName = document.createElement("th");
		thFirstName.appendChild(document.createTextNode(`Voornaam`));
		trHead.appendChild(thFirstName);

		const thLastName = document.createElement("th");
		thLastName.appendChild(document.createTextNode(`Achternaam`));
		trHead.appendChild(thLastName);

		const thRole = document.createElement("th");
		thRole.appendChild(document.createTextNode(`Rol`));
		trHead.appendChild(thRole);

		// Append the row to the table
		table.appendChild(trHead);

		// Append the table to the div
		userList.appendChild(table);

		for (const user of users) {
			const trRow = document.createElement("tr");
			const tdEmail = document.createElement("td");
			tdEmail.appendChild(document.createTextNode(user.email));
			trRow.appendChild(tdEmail);
			const tdFirstName = document.createElement("td");
			tdFirstName.appendChild(document.createTextNode(user.firstname));
			trRow.appendChild(tdFirstName);
			const tdLastName = document.createElement("td");
			tdLastName.appendChild(document.createTextNode(user.lastname));
			trRow.appendChild(tdLastName);
			const tdRole = document.createElement("td");
			tdRole.appendChild(document.createTextNode(user.role));
			trRow.appendChild(tdRole);
			table.appendChild(trRow);

			const updateButton = document.createElement("button");
			updateButton.innerHTML = "Update";
			updateButton.id = "updateButton";
			trRow.appendChild(updateButton);
			// trRow.addEventListener("click", () => {
			//     clearUserOverview();
			//     showClickedOnUser(user);
			// });
			updateButton.addEventListener("click", () => {
				// Check if dropdown already exists
				if (document.getElementById("selectRole")) {
					return;
				}

				// Create select element
				const selectRole = document.createElement("select");
				selectRole.id = "selectRole";

				// Create ADMIN option
				const adminOption = document.createElement("option");
				adminOption.value = "ADMIN";
				adminOption.text = "ADMIN";

				// Create USER option
				const repairOption = document.createElement("option");
				repairOption.value = "REPAIR";
				repairOption.text = "REPAIR";

				// Create USER option
				const userOption = document.createElement("option");
				userOption.value = "USER";
				userOption.text = "USER";

				// Append options to select
				selectRole.appendChild(userOption);
				selectRole.appendChild(repairOption);
				selectRole.appendChild(adminOption);

				// Append select to the row
				trRow.appendChild(selectRole);
			});
		}
	}
};

if (sessionStorage.getItem("role") === "ADMIN") {
	showAllUsers();
}
