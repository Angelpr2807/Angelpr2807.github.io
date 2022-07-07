export default function rowBtn() {
  const d = document,
    $rowBtn = d.querySelector(".row-up");

  window.addEventListener("scroll", (e) => {
    if (window.scrollY >= window.innerHeight) {
      $rowBtn.classList.remove("none");
    } else {
      $rowBtn.classList.add("none");
    }
  });

  d.addEventListener("click", (e) => {
    if (e.target === $rowBtn || e.target.matches(".row-up *")) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
}
