export default function hamburgerBtn() {
  const d = document,
    $hamburgerBtn = d.querySelector(".hamburger"),
    $navBar = d.querySelector(".nav-bar ul");

  d.addEventListener("click", (e) => {
    if (e.target === $hamburgerBtn || e.target.matches(".hamburger *")) {
      if (
        !$hamburgerBtn.classList.contains("is-active") ||
        !$navBar.classList.contains("is-active")
      ) {
        $hamburgerBtn.classList.add("is-active");
        $navBar.classList.add("is-active");
        $hamburgerBtn.ariaExpanded = true;
        $hamburgerBtn.ariaLabel = "Cerrar menú principal";
        $hamburgerBtn.title = "Cerrar menú principal";
      } else {
        $hamburgerBtn.classList.remove("is-active");
        $navBar.classList.remove("is-active");
        $hamburgerBtn.ariaExpanded = false;
        $hamburgerBtn.ariaLabel = "Abrir menú principal";
        $hamburgerBtn.title = "Abrir menú principal";
      }
    } else if (e.target.matches(".nav-bar ul a")) {
      $hamburgerBtn.classList.remove("is-active");
      $navBar.classList.remove("is-active");
      $hamburgerBtn.ariaExpanded = false;
      $hamburgerBtn.ariaLabel = "Abrir menú principal";
      $hamburgerBtn.title = "Abrir menú principal";
    }
  });
}
