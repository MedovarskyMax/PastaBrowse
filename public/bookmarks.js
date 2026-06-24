let bookmarks = {}

export function addBookmark(){
  const input = document.getElementById("url");
  const url = input.value;

  const tab = document.querySelector(".main_tab");
  const title = tab.querySelector("p").textContent;

  if (Object.values(bookmarks).includes(url)){
    console.error("Cannot store duplicate bookmark URLs");
    return;
  }

  bookmarks[title] = url;
}