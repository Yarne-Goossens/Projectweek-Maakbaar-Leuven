checkUserLogin = () => {
	if (sessionStorage.getItem("user")) {
		const loginButton = document.getElementById("login");
		if (loginButton) {
			loginButton.innerHTML = "Logout";
			loginButton.id = "logout";
		}

		const logoutButton = document.getElementById("logout");
		if (logoutButton) {
			logoutButton.addEventListener("click", async (event) => {
				sessionStorage.clear();
				logoutButton.innerHTML = "Login";
				logoutButton.id = "login";
				window.location.href = "login.html";
			});
		}
	}
	if (sessionStorage.getItem("role") === "USER") {
		var navigationList = document.getElementById("navigation_list");
		if (navigationList) {
			var newListItem = document.createElement("li");
			var newLink = document.createElement("a");
			newLink.href = "user.html";
			newLink.textContent = "Profiel";

			newListItem.appendChild(newLink);
			navigationList.appendChild(newListItem);
		}
	}
	if (sessionStorage.getItem("role") === "ADMIN") {
		var navigationList = document.getElementById("navigation_list");
		if (navigationList) {
			var newListItem = document.createElement("li");
			var newLink = document.createElement("a");
			newLink.href = "user.html";
			newLink.textContent = "Admin";

			newListItem.appendChild(newLink);
			navigationList.appendChild(newListItem);
		}
	}

	if (sessionStorage.getItem("role") === "REPAIR") {
		var navigationList = document.getElementById("navigation_list");
		if (navigationList) {
			var newListItem = document.createElement("li");
			var newLink = document.createElement("a");
			newLink.href = "user.html";
			newLink.textContent = "Herstellingen";

			newListItem.appendChild(newLink);
			navigationList.appendChild(newListItem);
		}
	}
};

const createCalenderOverview = () => {
	const p = document.createElement('p');
	p.innerHTML = "Bekijk je "
	const a = document.createElement('a')
	a.href = "https://outlook.office.com/calendar/view/month"
	a.target = "_blank"
	a.innerHTML = "Agenda"
	a.id = "agendaHyperlink"
	p.appendChild(a)
	return p
}

window.addEventListener("load", checkUserLogin);
