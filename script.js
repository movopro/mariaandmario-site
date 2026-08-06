const sequenceText = document.getElementById("sequenceText");
const dateBlock = document.getElementById("dateBlock");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const restartBtn = document.getElementById("restartBtn");
const enterSiteBtn = document.getElementById("enterSiteBtn");
const themeToggle = document.getElementById("themeToggle");
const langToggle = document.getElementById("langToggle");
const introAudio = document.getElementById("introAudio");

const matrixScreen = document.getElementById("matrixScreen");
const farewellScreen = document.getElementById("farewellScreen");
const worldScreen = document.getElementById("worldScreen");
const infoScreen = document.getElementById("infoScreen");

let currentLang = "en";
let currentTheme = "dark";

const textSequence = {
  en: [
    "Time has come...",
    "To get married",
    "If you see this then you are special to us",
    "and...",
    "You've been selected to join our matrix",
    "Are you in?"
  ],
  bg: [
    "Времето дойде...",
    "Да се оженим",
    "Щом виждаш това, значи си специален за нас",
    "и...",
    "Избран си да се присъединиш към нашата матрица",
    "Влизаш ли?"
  ]
};

function showScreen(screen) {
  [matrixScreen, farewellScreen, worldScreen, infoScreen].forEach(section => {
    section.classList.add("hidden-screen");
    section.classList.remove("active");
  });

  screen.classList.remove("hidden-screen");
  screen.classList.add("active");
}

function applyTranslations() {
  document.querySelectorAll("[data-en]").forEach((el) => {
    el.textContent = el.dataset[currentLang];
  });

  langToggle.textContent = currentLang === "en" ? "BG" : "EN";
}

function runSequence() {
  const items = textSequence[currentLang];
  let index = 0;
  dateBlock.classList.add("hidden");

  function nextText() {
    if (index >= items.length) {
      dateBlock.classList.remove("hidden");
      return;
    }

    sequenceText.style.opacity = "0";

    setTimeout(() => {
      sequenceText.textContent = items[index];
      sequenceText.style.opacity = "1";
      index += 1;
      setTimeout(nextText, 1800);
    }, 350);
  }

  nextText();
}

yesBtn.addEventListener("click", async () => {
  try {
    introAudio.currentTime = 0;
    await introAudio.play();
  } catch (e) {
    console.log("Audio autoplay blocked until user interaction is accepted by browser.");
  }

  showScreen(worldScreen);
});

noBtn.addEventListener("click", () => {
  showScreen(farewellScreen);
});

restartBtn.addEventListener("click", () => {
  showScreen(matrixScreen);
  runSequence();
});

enterSiteBtn.addEventListener("click", () => {
  showScreen(infoScreen);
});

themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", currentTheme);
});

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "bg" : "en";
  applyTranslations();

  if (matrixScreen.classList.contains("active")) {
    runSequence();
  }
});

document.documentElement.setAttribute("data-theme", currentTheme);
applyTranslations();
runSequence();
