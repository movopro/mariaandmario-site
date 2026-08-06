const lines = [
  "TIME HAS COME...",
  "TO GET MARRIED",
  "IF YOU SEE THIS THEN YOU ARE SPECIAL TO US",
  "AND...",
  "YOU'VE BEEN SELECTED TO JOIN OUR MATRIX",
  "ARE YOU IN?"
];

const typeSequence = document.getElementById("typeSequence");
const dateBlock = document.getElementById("dateBlock");
const choiceBlock = document.getElementById("choiceBlock");

const matrixIntro = document.getElementById("matrixIntro");
const farewellScreen = document.getElementById("farewellScreen");
const welcomeScreen = document.getElementById("welcomeScreen");
const mainExperience = document.getElementById("mainExperience");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const returnBtn = document.getElementById("returnBtn");
const enterWorldBtn = document.getElementById("enterWorldBtn");
const playVowBtn = document.getElementById("playVowBtn");
const pauseVowBtn = document.getElementById("pauseVowBtn");

const introAudio = new Audio("./assets/music/trailer-intro.mp3");
introAudio.volume = 0.55;

const vowAudio = new Audio("./assets/music/the-vow.mp3");
vowAudio.volume = 0.5;
vowAudio.loop = true;

function showScreen(screen) {
  [matrixIntro, farewellScreen, welcomeScreen, mainExperience].forEach(section => {
    section.classList.add("hidden-screen");
  });
  screen.classList.remove("hidden-screen");
}

function playSequence(index = 0) {
  if (index >= lines.length) {
    dateBlock.classList.remove("hidden");
    choiceBlock.classList.remove("hidden");
    return;
  }

  const line = document.createElement("div");
  line.className = "type-line";
  line.textContent = lines[index];

  typeSequence.innerHTML = "";
  typeSequence.appendChild(line);

  setTimeout(() => {
    playSequence(index + 1);
  }, 4300);
}

noBtn.addEventListener("click", () => {
  introAudio.pause();
  introAudio.currentTime = 0;
  showScreen(farewellScreen);
});

returnBtn.addEventListener("click", () => {
  showScreen(matrixIntro);
});

yesBtn.addEventListener("click", async () => {
  try {
    introAudio.currentTime = 0;
    await introAudio.play();
  } catch (error) {
    console.log("Intro audio blocked until user interaction is allowed.", error);
  }
  showScreen(welcomeScreen);
});

enterWorldBtn.addEventListener("click", () => {
  showScreen(mainExperience);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

playVowBtn.addEventListener("click", async () => {
  try {
    await vowAudio.play();
  } catch (error) {
    console.log("Audio playback failed.", error);
  }
});

pauseVowBtn.addEventListener("click", () => {
  vowAudio.pause();
});

playSequence();

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;
const fontSize = 18;
let columns = Math.floor(width / fontSize);
let drops = Array(columns).fill(1);

canvas.width = width;
canvas.height = height;

const letters = "01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ";

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  columns = Math.floor(width / fontSize);
  drops = Array(columns).fill(1);
}

function drawMatrix() {
  ctx.fillStyle = "rgba(2, 6, 8, 0.072)";
  ctx.fillRect(0, 0, width, height);

  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillStyle = "#7fffd4";
    ctx.fillText(text, x, y - fontSize);

    ctx.fillStyle = "#39e97a";
    ctx.fillText(text, x, y);

    if (y > height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

window.addEventListener("resize", resizeCanvas);
requestAnimationFrame(drawMatrix);
