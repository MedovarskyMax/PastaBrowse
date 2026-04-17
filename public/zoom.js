export function setViewZoom(zoom_step) {
  const webview_container = document.getElementById("webview_container");
  const view = webview_container.querySelector(".main_view");
  const current_zoom = view.getZoomFactor();

  view.setZoomFactor(current_zoom + zoom_step);
}


export function resetViewZoom() {
  const webview_container = document.getElementById("webview_container");
  const view = webview_container.querySelector(".main_view");

  view.setZoomFactor(1);
}
