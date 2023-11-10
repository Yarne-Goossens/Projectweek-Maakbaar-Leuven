const clearStatus = (status) =>
    (document.getElementById("status").innerHTML = "");

const addStatus = (status) => {
    document.getElementById("status").innerHTML += "<p class='error'>" + status + "</p>";
};
const main = async () => {
    const login_button = document.getElementById('submit-btn');
    login_button.addEventListener('click', async (event) => {
        event.preventDefault();
        clearStatus();
        const password_input = document.getElementById('user-password').value;
        const email_input = document.getElementById('user-email').value;
        const profile = {
            email: email_input,
            password: password_input,
        };
        const status = await authenticate(profile);
        console.log(status);
        if (status) {
            addStatus("login gelukt");
            const user = await getUser(profile.email);
            console.log(user)
            sessionStorage.setItem('user', user.firstname);
            window.location.href = "http://127.0.0.1:5500/wpp-2324-team-07/src/main/resources/templates/user.html";
        } else {
            addStatus("login mislukt");
        }

    });
}

const authenticate = async (profile) => {
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/profile/authenticate`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
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
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
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

checkUserLogin = () => {
    if (sessionStorage.getItem('user')) {
        const loginButton = document.getElementById('login');
        loginButton.remove();

        var navigationList = document.getElementById("navigation_list");
        var newListItem = document.createElement("li");
        var newLink = document.createElement("a");
        newLink.href = "user.html";
        newLink.textContent = "Profile";

        newListItem.appendChild(newLink);
        navigationList.appendChild(newListItem);
    }

};


main();
window.addEventListener('load', checkUserLogin());