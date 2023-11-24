addStatusError = (status) => {
    document.getElementById("statusError").innerHTML = "<p class='error'>" + status + "</p>";
};

const clearStatus = (status) => (document.getElementById("statusError").innerHTML = "");

function showToast(message, duration = 3000) {
    const toast = document.getElementById("toast");
    toast.className = "toast show";
    toast.textContent = message; // Set the text to your message
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, duration);
}

const registerUser = async () => {
    const firstname = document.getElementById("Firstname").value;
    const lastname = document.getElementById("Lastname").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    const regex_email = new RegExp("^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
    if (!regex_email.test(email)) {
        console.log("Yes");
        addStatusError("Email is niet geldig");
        return 0;
    }

    const regex_firstname = new RegExp("[A-Za-z]+-?[A-Za-z]+$");
    // console.log(regex_firstname.test(firstname))
    if (!regex_firstname.test(firstname)) {
        console.log("Yes");
        addStatusError("Voornaam is niet geldig");
        return 0;
    }

    const regex_lastname = new RegExp("[A-Za-z]+-?[A-Za-z]+$");
    // console.log(regex_lastname.test(lastname))
    if (!regex_lastname.test(lastname)) {
        console.log("Yes");
        addStatusError("Achternaam is niet geldig");
        return 0;
    }

    // Define regular expressions to check for various criteria
    const lengthRegex = /.{8,}/; // Minimum length of 8 characters
    const uppercaseRegex = /[A-Z]/; // At least one uppercase letter
    const lowercaseRegex = /[a-z]/; // At least one lowercase letter
    const digitRegex = /\d/; // At least one digit
    const specialCharacterRegex = /[!@#\$%^&*()_+{}\[\]:;<>,.?~\\-]/; // At least one special character

    // Check each criterion
    const isLengthValid = lengthRegex.test(password);
    const isUppercaseValid = uppercaseRegex.test(password);
    const isLowercaseValid = lowercaseRegex.test(password);
    const isDigitValid = digitRegex.test(password);
    const isSpecialCharacterValid = specialCharacterRegex.test(password);

    // Calculate the overall strength
    if (!isLengthValid) {
        addStatusError("Wachtwoord moet minstens 8 characters lang zijn.")
        return 0;
    }
    if (!isUppercaseValid) {
        addStatusError("Wachtwoord moet minstens 1 grote letter hebben.")
        return 0;
    }
    if (!isLowercaseValid) {
        addStatusError("Wachtwoord moet minstens 1 kleine character bevatten.")
        return 0;
    }
    if (!isDigitValid) {
        addStatusError("Wachtwoord moet minstens 1 getal hebben.")
        return 0;
    }
    if (!isSpecialCharacterValid) {
        addStatusError("Wachtwoord moet minstens 1 speciale character bevatten.");
        return 0;
    }

    clearStatus();

    const profile = {
        firstname,
        lastname,
        email,
        password,
        role: "USER",
    };

    const respons = await fetch("http://localhost:8080/api/profile/add",
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(profile),
        });
    console.log(respons);

    showToast("Registreren is gelukt!", 5000); // Show toast for 5 seconds
    setTimeout(function() {
        window.location.href = "index.html"; // Replace with your desired URL
    }, 3000); // 3000 milliseconds = 3 seconds
  
    return 1;
};

document.getElementById("register_form").addEventListener("click", async (event) => {
    event.preventDefault();
    const register = await registerUser();
    console.log(register)
    if (register === 1) {
        window.location.href = "login.html"
    }
});
