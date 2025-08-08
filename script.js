let questionNum = 1;
let randomAdTrigger = Math.floor(Math.random() * 3) + 3; // Between 3–5

const questionDisplay = document.getElementById("question-number");
const nextBtn = document.getElementById("next-btn");
const adPopup = document.getElementById("ad-popup");
const closeAdBtn = document.getElementById("close-ad");
const clickToUnlockBtn = document.getElementById("click-to-unlock");
const countdownDisplay = document.getElementById("countdown");

let countdown;
let timer = 15;
let adOpened = false;

nextBtn.addEventListener("click", () => {
  questionNum++;
  questionDisplay.textContent = questionNum;

  if (questionNum === randomAdTrigger) {
    showAdPopup();
  }
});

function showAdPopup() {
  adPopup.style.display = "flex";
  timer = 15;
  countdownDisplay.textContent = timer;
  closeAdBtn.disabled = true;
  adOpened = false;

  countdown = setInterval(() => {
    timer--;
    countdownDisplay.textContent = timer;
    if (timer <= 0) {
      clearInterval(countdown);
      closeAdBtn.disabled = false;
    }
  }, 1000);
}

clickToUnlockBtn.addEventListener("click", () => {
  window.open("https://www.profitableratecpm.com/y21dkmz2?key=3b2f7ceb575d671b6b4d5135eb3cdf4a", "_blank"); // Replace with your ad link
  adOpened = true;
  clearInterval(countdown);
  closeAdBtn.disabled = false;
});

closeAdBtn.addEventListener("click", () => {
  adPopup.style.display = "none";
  // Prepare next trigger randomly again
  randomAdTrigger = questionNum + Math.floor(Math.random() * 3) + 3;
});
