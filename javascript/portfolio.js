export default function portfolioBtn() {
  let url;
  document.addEventListener("click", (e) => {
    if (
      e.target.matches("#portafolio button") ||
      e.target.matches("#portafolio button *")
    ) {
      if (e.target.matches("img") || e.target.matches("span")) {
        url = e.target.parentElement.parentElement.dataset.src;
      } else if (e.target.matches("button")) {
        url = e.target.parentElement.dataset.src;
      }
      if (url) {
        window.open(url);
      }
    }
  });
}
