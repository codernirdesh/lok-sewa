addEventListener(
  "DOMContentLoaded",
  async () => {
    $("#dropdown").hover(function () {
      $("#dropdown-list").toggleClass("hidden");
    });
    const dataState = document.getElementById("data-state");
    const data = await fetch("https://psc-notices.herokuapp.com/data");
    localStorage.setItem("data", JSON.stringify(await data.json()));
    dataState.innerText = "डाटा लोड भयो।";
    dataState.classList.add("scale-0");
    setTimeout(() => {
      dataState.remove();
    }, 289);
    const populatedHtmlData = populateData(
      JSON.parse(localStorage.getItem("data"))
    );
    const notices = document.getElementById("notices");
    notices.classList.remove("hidden");
    notices.innerHTML = populatedHtmlData;
  },
  { once: true }
);

function hide(id) {
  document.getElementById(id).classList.add("hidden");
}

function populateData(data) {
  var html = "";
  data.forEach((notice, i) => {
    html += `<div onclick=openPDF("${
      notice.noticePDFLink
    }") class="bg-white group border-solid border-2 border-teal-50 hover:border-teal-400 shadow-sm hover:shadow-md hover:scale-105 ease-in-out duration-200 rounded p-4 cursor-pointer relative z-4">
                <h1 class="text-xl">${notice.title}</h1>
                <div
              class="inline-flex mt-2 px-2 py-1 rounded text-xs text-white bg-red-400 items-center justify-center group-hover:bg-teal-500 ease-in-out duration-200"
            >
              ${notice.datePublished}
            </div>
                <span
                class="absolute ease-in-out duration-200 group-hover:transform-gpu group-hover:-rotate-45 group-hover:-translate-y-2 group-hover:-translate-x-4 z-2 bottom-0 right-5 opacity-5 font-[820] text-6xl"
                >${i + 1}</span
              >
              </div>`;
  });
  console.log(html);
  return html;
}

function openPDF(link) {
  window.open(link, "_blank");
}
