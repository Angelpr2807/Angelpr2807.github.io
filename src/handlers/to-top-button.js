document.addEventListener("click", (e) => {
    if (e.target.matches("article button.to-top") || e.target.matches("article button.to-top *")) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }
});
