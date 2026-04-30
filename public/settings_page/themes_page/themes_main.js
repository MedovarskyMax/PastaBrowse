import {setTheme, onResTheme} from "../settings_ipc.js";

onResTheme((theme) => {
  document.documentElement.classList = theme;
})

const redBtn = document.getElementById("redBtn");
redBtn.addEventListener("click", () => {setTheme("theme-red")});

const greenBtn = document.getElementById("greenBtn");
greenBtn.addEventListener("click", () => {setTheme("theme-green")});

const blueBtn = document.getElementById("blueBtn");
blueBtn.addEventListener("click", () => {setTheme("theme-blue")});

const orangeBtn = document.getElementById("orangeBtn");
orangeBtn.addEventListener("click", () => {setTheme("theme-orange")});

const bronzeBtn = document.getElementById("bronzeBtn");
bronzeBtn.addEventListener("click", () => {setTheme("theme-bronze")});

const tealBtn = document.getElementById("tealBtn");
tealBtn.addEventListener("click", () => {setTheme("theme-teal")});

const indigoBtn = document.getElementById("indigoBtn");
indigoBtn.addEventListener("click", () => {setTheme("theme-indigo")});

const purpleBtn = document.getElementById("purpleBtn");
purpleBtn.addEventListener("click", () => {setTheme("theme-purple")});

const pinkBtn = document.getElementById("pinkBtn");
pinkBtn.addEventListener("click", () => {setTheme("theme-pink")});

const greyBtn = document.getElementById("greyBtn");
greyBtn.addEventListener("click", () => {setTheme("theme-grey")});

const darkBtn = document.getElementById("darkBtn");
darkBtn.addEventListener("click", () => {setTheme("theme-dark")});

const fGreenBtn = document.getElementById("fGreenBtn");
fGreenBtn.addEventListener("click", () => {setTheme("theme-forest-green")});
