const clearStatus = (status) =>
    (document.getElementById("status").innerHTML = "");

const addStatus = (status) => {
    clearStatus();
    document.getElementById("status").innerHTML += "<p class='error'>" + status + "</p>";
};
const main = async () => {
    console.log("hier");
    const login_button = document.getElementById('submit-btn');
    login_button.addEventListener('click', async () => {
        const password_input = document.getElementById('user-password').value;
        console.log(`passw_input: ${password_input}`);
        const email_input = document.getElementById('user-email').value;
        console.log(`email_input: ${email_input}`);
        const profile = { email: email_input, password: password_input };
        console.log(profile);
        console.log("voor auth");
        const status = await authenticate(profile);
        console.log("status:" + status);
        console.log("na auth")
        addStatus(status);
    });
}

const authenticate = async (profile) => {
    try {
        const response = await fetch(`http://localhost:8080/api/profile/authenticate`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profile),
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        // Handle the error here, log it, or return an appropriate error message.
        console.error("Error in fetch request:", error);
        throw error; // Optionally, re-throw the error for further handling.
    }
};


main();