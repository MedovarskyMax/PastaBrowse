import {setTheme, onResSettings, setLinearGradient, toggleRGB, toggleAutoDarkMode} from "../ipc.js";
import {openCustomThemeConfig} from "./custom_themes.js";

const autoDarkMode = document.getElementById("autoDarkMode");
autoDarkMode.addEventListener("change", (e) => {
  toggleAutoDarkMode(autoDarkMode.checked);
})

const rgbCheck = document.getElementById("rgbCheck");
rgbCheck.addEventListener("change", (e) => {
  if (e.target.checked){
    toggleRGB(true);
  } else {
    toggleRGB(false)
  }
})

function bustCssCache(){
  document.documentElement.removeAttribute("class");
  const styleLink = document.querySelector(`link[rel="stylesheet"]`);
  styleLink.href = styleLink.href.split("?")[0] + "?v=" + Date.now();
}

onResSettings((settings) => {
  bustCssCache();
  
  document.documentElement.classList = settings["theme"];
  linearGradientCheck.checked = settings["linear-gradient"];
  rgbCheck.checked = settings["rgb-cycle"];
  autoDarkMode.checked = settings["auto-dark-mode"];
})

export const linearGradientCheck = document.getElementById("linearGradient");
linearGradientCheck.addEventListener("change", (e) => {setLinearGradient()});


const redBtn = document.getElementById("redBtn");
redBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-red-linear-gradient" : "theme-red")});

const greenBtn = document.getElementById("greenBtn");
greenBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-green-linear-gradient" : "theme-green")});

const blueBtn = document.getElementById("blueBtn");
blueBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-blue-linear-gradient" : "theme-blue")});

const orangeBtn = document.getElementById("orangeBtn");
orangeBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-orange-linear-gradient" : "theme-orange")});

const bronzeBtn = document.getElementById("bronzeBtn");
bronzeBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-bronze-linear-gradient" : "theme-bronze")});

const tealBtn = document.getElementById("tealBtn");
tealBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-teal-linear-gradient" : "theme-teal")});

const indigoBtn = document.getElementById("indigoBtn");
indigoBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-indigo-linear-gradient" : "theme-indigo")});

const purpleBtn = document.getElementById("purpleBtn");
purpleBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-purple-linear-gradient" : "theme-purple")});

const pinkBtn = document.getElementById("pinkBtn");
pinkBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-pink-linear-gradient" : "theme-pink")});

const greyBtn = document.getElementById("greyBtn");
greyBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-grey-linear-gradient" : "theme-grey")});

const darkBtn = document.getElementById("darkBtn");
darkBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-dark-linear-gradient" : "theme-dark")});

const fGreenBtn = document.getElementById("fGreenBtn");
fGreenBtn.addEventListener("click", () => {setTheme(linearGradientCheck.checked ? "theme-forest-green-linear-gradient" : "theme-forest-green")});

const newCustomThemeBtn1 = document.getElementById("newCustomThemeBtn1");
const newCustomThemeBtn2 = document.getElementById("newCustomThemeBtn2");
const newCustomThemeBtn3 = document.getElementById("newCustomThemeBtn3");
const newCustomThemeBtn4 = document.getElementById("newCustomThemeBtn4");

newCustomThemeBtn1.addEventListener("click", (e) => {openCustomThemeConfig(e)});
newCustomThemeBtn2.addEventListener("click", (e) => {openCustomThemeConfig(e)});
newCustomThemeBtn3.addEventListener("click", (e) => {openCustomThemeConfig(e)});
newCustomThemeBtn4.addEventListener("click", (e) => {openCustomThemeConfig(e)});
