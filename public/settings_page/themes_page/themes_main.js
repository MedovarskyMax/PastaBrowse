import {setTheme, onResSettings, setLinearGradient, toggleRGB, toggleAutoDarkMode} from "../settings_ipc.js";

const autoDarkMode = document.getElementById("autoDarkMode");
autoDarkMode.addEventListener("change", (e) => {
  toggleAutoDarkMode();
})

const rgbCheck = document.getElementById("rgbCheck");
rgbCheck.addEventListener("change", (e) => {
  if (e.target.checked){
    toggleRGB(true);
  } else {
    toggleRGB(false)
  }
})

onResSettings((settings) => {
  document.documentElement.classList = settings["theme"];
  linearGradientCheck.checked = settings["linear-gradient"];
  rgbCheck.checked = settings["rgb-cycle"];
})

const linearGradientCheck = document.getElementById("linearGradient");
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
