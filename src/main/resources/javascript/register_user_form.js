addStatusError = (status) => {
    document.getElementById("statusError").innerHTML = "<p class='error'>" + status + "</p>";
  };

  const clearStatus = (status) =>
  (document.getElementById("statusError").innerHTML = "");

const registerUser = async () => {
    const firstname = document.getElementById('Firstname').value;
    const lastname = document.getElementById('Lastname').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;

    const regex_email=new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
    if (!regex_email.test(email)) {
        console.log("Yes");
        addStatusError("Email is niet geldig");
        return;
    }

    const regex_firstname=new RegExp("[A-Za-z]+-?[A-Za-z]+$");
    console.log(regex_firstname.test(firstname))
    if (!regex_firstname.test(firstname)) {
        console.log("Yes");
        addStatusError("Voornaam is niet geldig");
        return;
    }

    const regex_lastname=new RegExp("[A-Za-z]+-?[A-Za-z]+$");
    console.log(regex_lastname.test(lastname))
    if (!regex_lastname.test(lastname)) {
        console.log("Yes");
        addStatusError("Achternaam is niet geldig");
        return;
    }

    if(password.length < 8) {
        addStatusError("Wachtwoord moet minimaal 8 karakters bevatten");
        return;
    }
    
    clearStatus();

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