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

  changeBookmarkIcon("saved");
}

/**
  "default"  |  "add"  |  "saved"  |  "remove"  - valid bookmark icon types
*/
function changeBookmarkIcon(new_icon_name){ 
  const bookmark_img = document.getElementById("bookmarkImg");
  bookmark_img.src = `../Icons/bookmark_${new_icon_name}.svg`;
}


export function bookmarkBtnHover(e){
  const bookmark_img = document.getElementById("bookmarkImg");

  switch (e.type){
    case "mouseover":
      if (bookmark_img.src.includes("default")){
        changeBookmarkIcon("add");
      } else {
        changeBookmarkIcon("remove");
      }
      break;

    case "mouseout":
      if (bookmark_img.src.includes("add")){
        changeBookmarkIcon("default");
      } else {
        changeBookmarkIcon("saved");
      }
      break;
  }
}
