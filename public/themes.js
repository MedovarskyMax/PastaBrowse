const root = document.documentElement;

export function setTheme(variant){
  try {
    root.classList = `theme-${variant}`
  } catch (e){
    console.error("Undefined theme")
  }
}
