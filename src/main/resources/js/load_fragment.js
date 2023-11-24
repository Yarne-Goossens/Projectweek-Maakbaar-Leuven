// Create a custom event for header loaded
const headerLoadedEvent = new Event("headerLoaded");

function loadHeader() {
    fetch("fragments/header.html")
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("headerContainer").innerHTML = html;
            window.dispatchEvent(headerLoadedEvent); // Trigger the custom event
        })
        .catch((error) => console.error("Error loading header:", error));
}

function loadFooter() {
    fetch("fragments/footer.html")
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("footerContainer").innerHTML = html;
        })
        .catch((error) => console.error("Error loading footer:", error));
}

window.addEventListener("load", loadHeader);
window.addEventListener("load", loadFooter);

function highlightCurrentPage() {
    const currentPageUrl = window.location.href;
    var match = currentPageUrl.match(/\/([^\/?#]+)$/);
    var currentPage = match ? match[1] : null;
    // console.log(currentPage);

    const menuItem = document.querySelector('#menu a[href="' + currentPage + '"]');
    // console.log(menuItem);
    if (menuItem) {
        menuItem.classList.add("current");
    }
}

window.addEventListener('load', loadFooter);
window.addEventListener('load', loadHeader);
window.addEventListener('headerLoaded', checkUserLogin); // Listen for the custom event
window.addEventListener("headerLoaded", highlightCurrentPage);
