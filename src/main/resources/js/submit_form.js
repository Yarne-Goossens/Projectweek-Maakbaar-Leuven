const registerUser = async () => {
    const firstname = document.getElementById("Firstname").value;
    const lastname = document.getElementById("Lastname").value;
    const email = document.getElementById("user-email").value;
    const password = document.getElementById("user-password").value;

    const profile = {
        firstname,
        lastname,
        email,
        password,
        role: "USER",
    };

    console.log("test");
    const respons = await fetch("http://localhost:8080/api/profile/add", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(profile),
    });
};

document.getElementById("register_form").addEventListener("submit", (event) => {
    event.preventDefault();
    registerUser();
});
