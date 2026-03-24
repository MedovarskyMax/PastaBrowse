searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", loadURL)


function loadURL(){
  const input = document.getElementById("url").value;
  const view = document.getElementById("view");

  let url = input;

  if (!url.startsWith("http")) {
    url = "https://" + url
  }

  view.src = url;
}
