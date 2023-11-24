checkUserLogin = () => {
    if (sessionStorage.getItem('user')) {
        console.log('hier2');
        const loginButton = document.getElementById('login');
        if (loginButton) {
            loginButton.innerHTML = "Logout";
            loginButton.id = "logout"
        }

        const logoutButton = document.getElementById('logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', async (event) => {
                sessionStorage.clear();
                logoutButton.innerHTML = "Login";
                logoutButton.id = 'login';
                window.location.href = "login.html"

            })
        }
    }
    if (sessionStorage.getItem('role') === 'USER') {
        var navigationList = document.getElementById("navigation_list");
        if (navigationList) {
            var newListItem = document.createElement("li");
            var newLink = document.createElement("a");
            newLink.href = "user.html";
            newLink.textContent = "Profile";

            newListItem.appendChild(newLink);
            navigationList.appendChild(newListItem);
        }
    }

};

const getUser = async (email) => {
    const response = await fetch(`http://localhost:8080/api/profile/${email}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();
    console.log(result);
    return result;
};


const displayUserInfo = async () => {
    const user = await getUser(sessionStorage.getItem('email'));
    const userdiv = document.getElementById('userInfo');

    const card = document.createElement('div');
    card.id = 'userCard';

    const cardContent = `
        <h2>${user.firstname} ${user.lastname}</h2>
        <p>Email: ${user.email}</p>
        <p>Role: ${user.role}</p>
    `;

    card.innerHTML = cardContent;

    userdiv.appendChild(card);
}

displayUserInfo();
window.addEventListener('load', checkUserLogin);