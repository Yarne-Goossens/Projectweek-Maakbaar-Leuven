const clearStatus = (status) =>
    (document.getElementById("status").innerHTML = "");

const addStatus = (status) => {
    clearStatus();
    document.getElementById("status").innerHTML += "<p class='error'>" + status + "</p>";
};
const main = async () => {
    console.log("hier");
    const login_button = document.getElementById('login_form');
    login_button.addEventListener('click', async () => {
        const password_input = document.getElementById('user-password').value;
        console.log(`passw_input: ${password_input}`);
        const email_input = document.getElementById('user-email').value;
        console.log(`email_input: ${email_input}`);
        const profile = { email: email_input, password: password_input };
        console.log("voor auth");
        const status = await authenticate(profile);
        console.log("na auth")
        addStatus(status);
    });
}

const authenticate = async (profile) => {
    const response = await fetch(`http://localhost:8080/api/profile/authenticate`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }, body: JSON.stringify(profile),
    });
    const result = await response.json();
    if (response.status === 400) {
        console.log("Device is not added.");
    } else {
        console.log("werkt wel");
    }
    return result;
}

main();