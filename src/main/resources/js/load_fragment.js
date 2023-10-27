function loadHeader() {
    fetch('fragments/header.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('headerContainer').innerHTML = html;
        })
        .catch(error => console.error('Error loading header:', error));
}

function loadFooter() {
    fetch('fragments/footer.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('footerContainer').innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error));
}

window.addEventListener('load', loadHeader);
window.addEventListener('load', loadFooter);