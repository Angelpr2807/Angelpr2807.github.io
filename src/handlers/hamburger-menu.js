
document.addEventListener("click", (e) => {
    if (e.target.matches('.hamburger') || e.target.matches('.hamburger *')) {
        let hamburgerButton = document.querySelector('.hamburger');
        let linksPanel = document.querySelector('.internal-links');

        if (hamburgerButton.getAttribute('aria-expanded') === 'false'){
            hamburgerButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>`;
            hamburgerButton.setAttribute('aria-label', 'close main menu');
            hamburgerButton.setAttribute('aria-expanded', 'true');
        } else {
            hamburgerButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>`;
            hamburgerButton.setAttribute('aria-label', 'open main menu');
            hamburgerButton.setAttribute('aria-expanded', 'false');
        }

        linksPanel.classList.toggle('active');
    }
})

