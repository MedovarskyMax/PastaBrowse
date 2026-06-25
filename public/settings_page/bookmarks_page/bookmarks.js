let bookmarks = {};

export function setBookmark(key, value){
  bookmarks[key] = value;
}


export function addBookmarkUI(key, value){
  const template = document.createElement("div");
  const html = `
    <h2 class="title">${key}</h2>
    <p>${value}</p>`;


  template.classList.add("bookmark");
  template.innerHTML = html;

  document.body.appendChild(template);
}