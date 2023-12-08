const clearStatus = (status) => (document.getElementById("status").innerHTML = "");

const addStatus = (status) => {
	document.getElementById("status").innerHTML += "<p class='error'>" + status + "</p>";
};

function showToast(message, duration = 3000) {
	const toast = document.getElementById("toast");
	toast.className = "toast show";
	toast.textContent = message; // Set the text to your message
	setTimeout(function () {
		toast.className = toast.className.replace("show", "");
	}, duration);
}

const main = async () => {
	const login_button = document.getElementById("submit-btn");
	login_button.addEventListener("click", async (event) => {
		event.preventDefault();
		clearStatus();
		const password_input = document.getElementById("user-password").value;
		const email_input = document.getElementById("user-email").value;
		const profile = {
			email: email_input,
			password: password_input,
		};
		const status = await authenticate(profile);
		console.log(status);
		if (status) {
			//addStatus("login gelukt");
			showToast("Login is gelukt! Welkom!", 2000); // Show toast for 5 seconds
			setTimeout(function () {
				window.location.href = "index.html"; // Replace with your desired URL
			}, 1500); // 3000 milliseconds = 3 seconds

			const user = await getUser(profile.email);
			console.log(user);
			sessionStorage.setItem("user", user.firstname);
			sessionStorage.setItem("role", user.role);
			sessionStorage.setItem("id", user.id);
			sessionStorage.setItem("email", user.email);
			//             window.location.href = "user.html";
			checkUserLogin();
		} else {
			showToast("Login is mislukt!", 5000); // Show toast for 5 seconds
		}
	});
};

const authenticate = async (profile) => {
	try {
		const response = await fetch(`http://127.0.0.1:8080/api/profile/authenticate`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(profile),
		});
		console.log(response);

		// if (!response.ok) {
		//     throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
		// }

		const result = await response.json();
		return result;
	} catch (error) {
		// Handle the error here, log it, or return an appropriate error message.
		console.error("Error in fetch request:", error);
		throw error; // Optionally, re-throw the error for further handling.
	}
};

const getUser = async (email) => {
	try {
		const response = await fetch(`http://127.0.0.1:8080/api/profile/${email}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		//console.log(response);

		// if (!response.ok) {
		//     throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
		// }

		const result = await response.json();
		return result;
	} catch (error) {
		// Handle the error here, log it, or return an appropriate error message.
		console.error("Error in fetch request:", error);
		throw error; // Optionally, re-throw the error for further handling.
	}
};

main();
