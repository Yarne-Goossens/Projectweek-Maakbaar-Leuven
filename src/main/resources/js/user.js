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
    if (sessionStorage.getItem('role') === 'ADMIN') {
        var navigationList = document.getElementById("navigation_list");
        if (navigationList) {
            var newListItem = document.createElement("li");
            var newLink = document.createElement("a");
            newLink.href = "admin.html";
            newLink.textContent = "Admin";

            newListItem.appendChild(newLink);
            navigationList.appendChild(newListItem);
        }
    }

};


window.addEventListener('load', checkUserLogin);