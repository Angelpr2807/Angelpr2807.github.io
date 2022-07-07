export default function formAnimation() {
  const d = document;

  d.addEventListener("focusin", (e) => {
    if (e.target.matches("label > *[required]")) {
      let $label = d.querySelector(`label[for="${e.target.id}"]`);
      $label.style.fontSize = "1.25rem";
      e.target.placeholder = "";
    }
  });

  d.addEventListener("focusout", (e) => {
    if (e.target.matches("label > *[required]")) {
      let $label = d.querySelector(`label[for="${e.target.id}"]`);
      $label.style.fontSize = "0";
      if (!e.target.value) {
        e.target.placeholder = $label.textContent;
      }
    }
  });
}
