export default function portfolioBtn() {
  let url;
  document.addEventListener("click", (e) => {
    if (
      e.target.matches("#portafolio button") ||
      e.target.matches("#portafolio button *")
    ) {
      console.log(e.target.parentElement);
      if (e.target.matches("img") || e.target.matches("h3")) {
        url = e.target.parentElement.parentElement.dataset.src;
      } else if (e.target.matches("div")) {
        url = e.target.parentElement.dataset.src;
      }
      if (url) {
        window.open(url);
      }
    }
  });
}
