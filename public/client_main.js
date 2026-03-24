searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", loadURL);

root_exit_btn = document.getElementById("root_exit_btn");
root_exit_btn.addEventListener("click", root_exit);

function loadURL(){
  const input = document.getElementById("url").value;
  const view = document.getElementById("view");

  let url = input;

  if (!url.startsWith("http")) {
    url = "https://" + url
  }

  view.src = url;
}

function root_exit(){
  window.api.killApp();
}