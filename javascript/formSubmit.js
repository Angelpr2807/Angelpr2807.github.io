export default function formSubmit() {
  const d = document,
    xml = new XMLHttpRequest(),
    $modal = d.querySelector(".modal");

  function ajax(options) {
    let { url, method, success, body } = options;

    xml.addEventListener("readystatechange", (e) => {
      if (xml.readyState !== 4) return;

      if (xml.readyState === 4 && xml.status >= 200 && xml.status < 300) {
        success();
      } else {
        let res = xml.response,
          json = JSON.parse(res);
        if (!json.success) {
          $modal.querySelector("h3").innerText = "Ocurrió un error";
          $modal.querySelector("p").innerText =
            "Lo sentimos pero tenemos problemas para enviar el formulario, por favor vuelva a intentarlo";
          success();
        }
      }
    });

    xml.open(method || "POST", url);
    xml.send(body);
  }

  d.addEventListener("keyup", (e) => {
    if (e.target.matches("form *[required]")) {
      let expReg = new RegExp(e.target.pattern || e.target.dataset.pattern),
        $paragraph = d.querySelector(`p[data-id="${e.target.id}"]`),
        validador = expReg.exec(e.target.value);
      if (!validador && e.target.value !== "") {
        $paragraph.classList.add("is-active");
      } else {
        $paragraph.classList.remove("is-active");
      }
    }
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.target.matches("form")) {
      ajax({
        url: "https://formsubmit.co/ajax/angeldorado.apr@gmail.com",
        method: "POST",
        body: new FormData(e.target),
        success: () => {
          $modal.classList.remove("none");
          setTimeout(() => {
            $modal.classList.add("none");
          }, 3000);
        },
      });
      e.target.reset();
    }
  });
}
