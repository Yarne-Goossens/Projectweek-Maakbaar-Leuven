const clearStatus = (status) =>
    (document.getElementById("status").innerHTML = "");

const addStatus = (status) => {
    clearStatus();
    document.getElementById("status").innerHTML += "<p class='error'>" + status + "</p>";
};


const login_button = document.getElementById('submit-btn');
login_button.addEventListener('click', async () => {
    const email_input = document.getElementById('user-email').value;
    const password_input = document.getElementById('user-password').value;
    const status = authenticate(email_input, password_input);
    addStatus(status);
});


const authenticate = async (email, password) => {
    const requestBody = {
        password: password,
    };
    const response = await fetch(`http://localhost:8080/api/profile/authenticate/${email}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }, body: JSON.stringify(requestBody),
    });
    const result = await response.json();
    return result;
}