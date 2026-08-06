const SUPABASE_URL = "https://kotgbrwblrtjmizoojii.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtvdGdicndibHJ0am1pem9vamlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMjMyMDUsImV4cCI6MjEwMTU5OTIwNX0.uCFXjKrjSFWCQEMskae2J9fZ0lrtzMccNuuNaJGPr0Y";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const translations = {
  en: {
    brand: "MARIA & MARIO",
    eventDateLabel: "EVENT DATE",
    eventDate: "28 AUGUST 2027",
    choiceAKicker: "CHOICE A",
    yesTitle: "YES, I'M IN",
    yesText: "ENTER THE STORY. JOIN THE CELEBRATION. UNLOCK THE NEXT SCENE.",
    choiceBKicker: "CHOICE B",
    noTitle: "NO, I PREFER MY SIMULATION OF REALITY",
    noText: "EXIT THIS TIMELINE AND RETURN TO YOUR DIMENSION.",
    transmissionClosed: "TRANSMISSION CLOSED",
    farewellTitle: "FAREWELL OUR FRIEND, SEE YOU IN ANOTHER DIMENSION",
    farewellText: "THIS STORYLINE ENDS HERE. ANOTHER PORTAL MAY OPEN SOMEDAY.",
    returnInvitation: "RETURN TO INVITATION",
    nextScene: "NEXT SCENE",
    welcomeTitle: "WELCOME TO OUR WORLD",
    welcomeText: "YOU HAVE PASSED THROUGH THE CODE. NOW STEP INTO A NIGHT OF LOVE, CINEMA, SUMMER LIGHTS, AND ONE STORY WRITTEN FOR ALL OF US.",
    enterCelebration: "ENTER THE CELEBRATION",
    mainStory: "THE MAIN STORY",
    heroTitle: "OUR STORY BEGINS WHERE FANTASY MEETS DESTINY.",
    heroText: "A CINEMATIC SUMMER EVENING. A WORLD BUILT FOR THE PEOPLE WE LOVE. A MOMENT WHERE REAL LIFE FEELS BIGGER THAN FILM.",
    alwaysLine: "ALWAYS? ALWAYS.",
    playTheme: "PLAY OUR THEME",
    pauseMusic: "PAUSE MUSIC",
    eventFile: "EVENT FILE",
    detailsTitle: "CELEBRATION DETAILS",
    locationKey: "LOCATION:",
    locationValue: "COORDINATES TO BE ADDED",
    dressCodeKey: "DRESS CODE:",
    dressCodeValue: "CASUAL SUMMER PARTY",
    startTimeKey: "START TIME:",
    startTimeValue: "18:00",
    giftKey: "REQUIRED GIFTS:",
    giftValue: "ONLY MONEY ACCEPTED - TICKET ON ENTRANCE",
    soundtrack: "SOUNDTRACK",
    musicTitle: "THE MUSIC OF OUR WORLD",
    musicText: "YOUR FAVORITE SONGS, MEMORIES, AND MOMENTS WILL BECOME PART OF THE NIGHT.",
    donateTitle: "DONATE OUR YOUNG FAMILY",
    nextInteraction: "NEXT INTERACTION",
    rsvpMissionTitle: "MISSION RSVP",
    rsvpMissionText: "CONFIRM YOUR PRESENCE, CHOOSE YOUR DRINKS, LEAVE A SONG, AND COMPLETE YOUR ENTRY INTO OUR CELEBRATION.",
    attendanceTitle: "ATTENDANCE STATUS",
    attendanceYes: "WE WILL ATTEND",
    attendanceNo: "WE CANNOT ATTEND",
    guestCountTitle: "GUEST COUNT",
    guestOne: "ONLY 1 PERSON",
    guestTwo: "2 PEOPLE / +1",
    drinksTitle: "ALCOHOL PREFERENCES",
    drinkVodka: "VODKA",
    drinkWhiskey: "WHISKEY",
    drinkBeer: "BEER",
    drinkRakia: "RAKIA",
    drinkCognac: "COGNAC",
    drinkWine: "WINE",
    songTitle: "SONG GIFT",
    songLabel: "WRITE A FAVORITE SONG FOR THE NIGHT",
    songPlaceholder: "YOUR SONG TITLE / ARTIST",
    messageTitle: "OPTIONAL MESSAGE",
    messageLabel: "LEAVE A SHORT NOTE FOR US",
    messagePlaceholder: "WRITE YOUR MESSAGE HERE",
    donatePanelTitle: "DONATE OUR YOUNG FAMILY",
    donatePanelText: "IF YOU CANNOT ATTEND OR IF YOU WISH TO SUPPORT US DIRECTLY, YOU CAN USE OUR REVOLUT QR CODE.",
    finalStep: "FINAL STEP",
    submitTitle: "SEND YOUR RESPONSE",
    submitText: "YOUR RESPONSE WILL NOW BE SAVED TO OUR GUEST SYSTEM.",
    submitBtn: "SUBMIT RESPONSE",
    responseSaved: "YOUR RESPONSE HAS BEEN SAVED.",
    inviteMissing: "INVALID OR MISSING INVITE TOKEN.",
    responseError: "WE COULD NOT SAVE YOUR RESPONSE. PLEASE TRY AGAIN.",
    sequence: [
      "TIME HAS COME...",
      "TO GET MARRIED",
      "IF YOU SEE THIS THEN YOU ARE SPECIAL TO US",
      "AND...",
      "YOU'VE BEEN SELECTED TO JOIN OUR MATRIX",
      "ARE YOU IN?"
    ]
  },
  bg: {
    brand: "МАРИЯ И МАРИО",
    eventDateLabel: "ДАТА НА СЪБИТИЕТО",
    eventDate: "28 АВГУСТ 2027",
    choiceAKicker: "ИЗБОР A",
    yesTitle: "ДА, В ИГРАТА СЪМ",
    yesText: "ВЛЕЗ В ИСТОРИЯТА. ПРИСЪЕДИНИ СЕ КЪМ ПРАЗНИКА. ОТКЛЮЧИ СЛЕДВАЩАТА СЦЕНА.",
    choiceBKicker: "ИЗБОР B",
    noTitle: "НЕ, ПРЕДПОЧИТАМ СИМУЛАЦИЯТА НА РЕАЛНОСТТА",
    noText: "ИЗЛЕЗ ОТ ТАЗИ ВРЕМЕВА ЛИНИЯ И СЕ ВЪРНИ В СВОЕТО ИЗМЕРЕНИЕ.",
    transmissionClosed: "ПРЕДАВАНЕТО Е ПРЕКРАТЕНО",
    farewellTitle: "СБОГОМ, ПРИЯТЕЛЮ, ЩЕ СЕ ВИДИМ В ДРУГО ИЗМЕРЕНИЕ",
    farewellText: "ТАЗИ ИСТОРИЯ ПРИКЛЮЧВА ТУК. НЯКОЙ ДЕН МОЖЕ ДА СЕ ОТВОРИ НОВ ПОРТАЛ.",
    returnInvitation: "ВЪРНИ СЕ КЪМ ПОКАНАТА",
    nextScene: "СЛЕДВАЩА СЦЕНА",
    welcomeTitle: "ДОБРЕ ДОШЛИ В НАШИЯ СВЯТ",
    welcomeText: "ПРЕМИНА УСПЕШНО ПРЕЗ КОДА. СЕГА ВЛЕЗ В ЕДНА ВЕЧЕР НА ЛЮБОВ, КИНО, ЛЕТНИ СВЕТЛИНИ И ИСТОРИЯ, СЪЗДАДЕНА ЗА ВСИЧКИ НАС.",
    enterCelebration: "ВЛЕЗ В ПРАЗНИКА",
    mainStory: "ГЛАВНАТА ИСТОРИЯ",
    heroTitle: "НАШАТА ИСТОРИЯ ЗАПОЧВА ТАМ, КЪДЕТО ФАНТАЗИЯТА СРЕЩА СЪДБАТА.",
    heroText: "ЕДНА КИНЕМАТОГРАФИЧНА ЛЯТНА ВЕЧЕР. СВЯТ, СЪЗДАДЕН ЗА ХОРАТА, КОИТО ОБИЧАМЕ. МИГ, В КОЙТО РЕАЛНОСТТА Е ПО-ГОЛЯМА ОТ ФИЛМ.",
    alwaysLine: "ALWAYS? ALWAYS.",
    playTheme: "ПУСНИ НАШАТА ТЕМА",
    pauseMusic: "СПРИ МУЗИКАТА",
    eventFile: "ДОСИЕ НА СЪБИТИЕТО",
    detailsTitle: "ДЕТАЙЛИ ЗА ПРАЗНИКА",
    locationKey: "ЛОКАЦИЯ:",
    locationValue: "КООРДИНАТИТЕ ЩЕ СЕ ДОБАВЯТ",
    dressCodeKey: "ДРЕСКОД:",
    dressCodeValue: "НЕБРЕЖНО ЛЯТНО ПАРТИ",
    startTimeKey: "НАЧАЛЕН ЧАС:",
    startTimeValue: "18:00",
    giftKey: "ПОДАРЪЦИ:",
    giftValue: "ПРИЕМАТ СЕ САМО ПАРИ - БИЛЕТ НА ВХОДА",
    soundtrack: "САУНДТРАК",
    musicTitle: "МУЗИКАТА НА НАШИЯ СВЯТ",
    musicText: "ВАШИТЕ ЛЮБИМИ ПЕСНИ, СПОМЕНИ И МОМЕНТИ ЩЕ СТАНАТ ЧАСТ ОТ ВЕЧЕРТА.",
    donateTitle: "ПОДКРЕПЕТЕ НАШЕТО МЛАДО СЕМЕЙСТВО",
    nextInteraction: "СЛЕДВАЩА ИНТЕРАКЦИЯ",
    rsvpMissionTitle: "RSVP МИСИЯ",
    rsvpMissionText: "ПОТВЪРДИ ПРИСЪСТВИЕ, ИЗБЕРИ НАПИТКИ, ОСТАВИ ПЕСЕН И ЗАВЪРШИ ВЛИЗАНЕТО СИ В НАШИЯ ПРАЗНИК.",
    attendanceTitle: "СТАТУС НА ПРИСЪСТВИЕ",
    attendanceYes: "ЩЕ ПРИСЪСТВАМЕ",
    attendanceNo: "НЯМА ДА УСПЕЕМ ДА ПРИСЪСТВАМЕ",
    guestCountTitle: "БРОЙ ГОСТИ",
    guestOne: "САМО 1 ЧОВЕК",
    guestTwo: "2МА ДУШИ / +1",
    drinksTitle: "ПРЕДПОЧИТАН АЛКОХОЛ",
    drinkVodka: "ВОДКА",
    drinkWhiskey: "УИСКИ",
    drinkBeer: "БИРА",
    drinkRakia: "РАКИЯ",
    drinkCognac: "КОНЯК",
    drinkWine: "ВИНО",
    songTitle: "ПЕСЕН ПОДАРЪК",
    songLabel: "НАПИШИ ЛЮБИМА ПЕСЕН ЗА ВЕЧЕРТА",
    songPlaceholder: "ЗАГЛАВИЕ / ИЗПЪЛНИТЕЛ",
    messageTitle: "ДОПЪЛНИТЕЛНО СЪОБЩЕНИЕ",
    messageLabel: "ОСТАВИ КРАТКО ПОСЛАНИЕ ЗА НАС",
    messagePlaceholder: "НАПИШИ СЪОБЩЕНИЕТО ТУК",
    donatePanelTitle: "ПОДКРЕПЕТЕ НАШЕТО МЛАДО СЕМЕЙСТВО",
    donatePanelText: "АКО НЕ МОЖЕТЕ ДА ПРИСЪСТВАТЕ ИЛИ ИСКАТЕ ДА НИ ПОДКРЕПИТЕ ДИРЕКТНО, МОЖЕТЕ ДА ИЗПОЛЗВАТЕ НАШИЯ REVOLUT QR КОД.",
    finalStep: "ПОСЛЕДНА СТЪПКА",
    submitTitle: "ИЗПРАТИ ОТГОВОРА",
    submitText: "ТВОЯТ ОТГОВОР ЩЕ БЪДЕ ЗАПИСАН В НАШАТА СИСТЕМА.",
    submitBtn: "ИЗПРАТИ ОТГОВОР",
    responseSaved: "ТВОЯТ ОТГОВОР БЕШЕ ЗАПИСАН.",
    inviteMissing: "ЛИПСВА ИЛИ Е НЕВАЛИДЕН INVITE TOKEN.",
    responseError: "НЕ УСПЯХМЕ ДА ЗАПИШЕМ ОТГОВОРА. ОПИТАЙ ПАК.",
    sequence: [
      "МОМЕНТЪТ НАСТЪПИ...",
      "ДА СЕ ОЖЕНИМ",
      "ЩОМ ВИЖДАШ ТОВА, ЗНАЧИ СИ СПЕЦИАЛЕН ЗА НАС",
      "И...",
      "ТИ БЕШЕ ИЗБРАН ДА ВЛЕЗЕШ В НАШАТА МАТРИЦА",
      "ВЛИЗАШ ЛИ?"
    ]
  }
};

let currentLang = "en";
let sequenceStarted = false;
let journeyStarted = false;
let journeyInterval = null;
let matrixAnimationActive = true;
let inviteRecord = null;

const body = document.body;
const languageGate = document.getElementById("languageGate");
const gatePanel = document.querySelector(".gate-panel");
const langChoices = document.querySelectorAll("[data-lang-select]");
const langSwitcher = document.querySelector(".lang-switch");
const langButtons = document.querySelectorAll(".lang-btn");
const sceneFade = document.getElementById("sceneFade");

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

const rsvpForm = document.getElementById("rsvpForm");
const rsvpStatus = document.getElementById("rsvpStatus");

const revealCards = document.querySelectorAll(".reveal-card");
const journeySlides = document.querySelectorAll(".journey-slide");

const introAudio = new Audio("./assets/music/trailer-intro.mp3");
introAudio.volume = 0.55;

const vowAudio = new Audio("./assets/music/the-vow.mp3");
vowAudio.volume = 0.5;
vowAudio.loop = true;

function getInviteToken() {
  const url = new URL(window.location.href);
  return url.searchParams.get("invite");
}

async function loadInvite() {
  const token = getInviteToken();
  if (!token) return null;

  const { data, error } = await supabaseClient
    .from("invites")
    .select("*")
    .eq("invite_token", token)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error(error);
    return null;
  }

  inviteRecord = data;
  return data;
}

function activateSceneFade() {
  sceneFade.classList.add("is-active");
}

function deactivateSceneFade() {
  sceneFade.classList.remove("is-active");
}

function applyTranslations(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });
}

function showScreen(screen) {
  [matrixIntro, farewellScreen, welcomeScreen, mainExperience].forEach((section) => {
    section.classList.add("hidden-screen");
  });
  screen.classList.remove("hidden-screen");
}

function playSequence(index = 0) {
  const lines = translations[currentLang].sequence;

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

function startExperience(lang) {
  applyTranslations(lang);
  gatePanel.classList.add("fade-out");

  setTimeout(() => {
    languageGate.classList.add("hidden-screen");
    langSwitcher.classList.remove("hidden-switch");
    showScreen(matrixIntro);

    if (!sequenceStarted) {
      sequenceStarted = true;
      playSequence();
    }
  }, 650);
}

function cycleJourneyMotion(index) {
  const motions = ["pan-left", "pan-right", "pan-up"];
  journeySlides.forEach((slide) => {
    slide.classList.remove("pan-left", "pan-right", "pan-up", "is-active");
  });

  const slide = journeySlides[index];
  slide.classList.add("is-active", motions[index % motions.length]);
}

function startJourneySlides() {
  if (journeyInterval || journeySlides.length === 0) return;

  let current = 0;
  cycleJourneyMotion(current);

  journeyInterval = setInterval(() => {
    current = (current + 1) % journeySlides.length;
    cycleJourneyMotion(current);
  }, 3800);
}

function stopMatrixAnimation() {
  matrixAnimationActive = false;
  body.classList.add("matrix-hidden");
}

function enterJourney() {
  if (journeyStarted) return;
  journeyStarted = true;

  activateSceneFade();

  setTimeout(() => {
    stopMatrixAnimation();
    showScreen(mainExperience);
    window.scrollTo({ top: 0, behavior: "auto" });
    startJourneySlides();
    observeRevealCards();
  }, 450);

  setTimeout(() => {
    deactivateSceneFade();
  }, 1100);
}

function observeRevealCards() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16
  });

  revealCards.forEach((card) => observer.observe(card));
}

langChoices.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    startExperience(button.dataset.langSelect);
  });
});

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyTranslations(button.dataset.lang);
  });
});

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
    console.log("Intro audio blocked.", error);
  }
  showScreen(welcomeScreen);
});

enterWorldBtn.addEventListener("click", () => {
  enterJourney();
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

rsvpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  rsvpStatus.textContent = "";

  const token = getInviteToken();
  if (!token) {
    rsvpStatus.textContent = translations[currentLang].inviteMissing;
    return;
  }

  if (!inviteRecord) {
    await loadInvite();
  }

  if (!inviteRecord) {
    rsvpStatus.textContent = translations[currentLang].inviteMissing;
    return;
  }

  const formData = new FormData(rsvpForm);
  const attendance = formData.get("attendance");
  const guestCount = Number(formData.get("guestCount"));
  const drinks = formData.getAll("drinks");
  const song = formData.get("song")?.trim() || null;
  const message = formData.get("message")?.trim() || null;

  const payload = {
    invite_id: inviteRecord.id,
    attendance,
    guest_count: guestCount,
    drinks,
    song,
    message,
    updated_at: new Date().toISOString()
  };

  const { error } = await supabaseClient
    .from("responses")
    .upsert(payload, { onConflict: "invite_id" });

  if (error) {
    console.error(error);
    rsvpStatus.textContent = translations[currentLang].responseError;
    return;
  }

  rsvpStatus.textContent = translations[currentLang].responseSaved;
});

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
  if (!matrixAnimationActive) return;

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

(async function init() {
  await loadInvite();
  requestAnimationFrame(drawMatrix);
})();
