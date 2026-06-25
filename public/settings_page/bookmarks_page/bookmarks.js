let bookmarks = {};

export function setBookmark(key, value){
  bookmarks[key] = value;
}


export function addBookmarkUI(key, value){
  const template = document.createElement("div");
  const html = `
    <img alt="" id="img_${value}">
    <div class="text_container">
      <h2 class="title">${key}</h2>
      <p>${value}</p>
    </div>`;


  template.classList.add("bookmark");
  template.innerHTML = html;

  document.body.appendChild(template);

  const img = document.getElementById(`img_${value}`);
  const favIconSize = 64;
  
  img.src = `https://www.google.com/s2/favicons?domain=${value}&sz=${String(favIconSize)}`;
}