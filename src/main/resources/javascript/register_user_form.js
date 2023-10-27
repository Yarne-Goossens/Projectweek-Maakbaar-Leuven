addStatusError = (status) => {
    document.getElementById("statusError").innerHTML = "<p class='error'>" + status + "</p>";
  };

const registerUser = async () => {
    const firstname = document.getElementById('Firstname').value;
    const lastname = document.getElementById('Lastname').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;

    console.log(email);


    // new RegExp("/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/");
    let regex = new RegExp("/^[a-zA-Z]+$/")
    if (!regex.test(email)) {
        console.log("Yes")
        throw new addStatusError("Email not valid");
        return;
    }

    const profile = {
        firstname,
        lastname,
        email,
        password,
        role: "USER"
    };

    const respons = await fetch("http://localhost:8080/api/profile/add",
        {method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json"},
        body: JSON.stringify(profile),
        });
};

document.getElementById("register_form").addEventListener("submit", (event) => {
    event.preventDefault();
    registerUser();
});