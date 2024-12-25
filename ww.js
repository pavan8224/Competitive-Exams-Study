let question = [];
let currentQuestionIndex = 0;
let score = 0;

// सवालों को शफल करने का फ़ंक्शन
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";

  // हर सवाल के लिए विकल्प शफल करें
  const shuffledOptions = [...currentQuestion.options];
  shuffle(shuffledOptions);

  shuffledOptions.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(button, option));
    optionsElement.appendChild(button);
  });

  nextBtn.disabled = true;
}

function selectAnswer(button, option) {
  const currentQuestion = questions[currentQuestionIndex];
  if (option === currentQuestion.answer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  document.querySelectorAll("#options button").forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === currentQuestion.answer) {
      btn.classList.add("correct");
    }
  });

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionElement.textContent = "";
  optionsElement.innerHTML = "";
  nextBtn.classList.add("hidden");
  scoreContainer.classList.remove("hidden");
  scoreElement.textContent = `${score} / ${questions.length}`;
}

restartBtn.addEventListener("click", () => {
  score = 0;
  currentQuestionIndex = 0;

  // रीस्टार्ट पर सवाल शफल करें
  shuffle(questions);

  scoreContainer.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  loadQuestion();
});

// JSON फ़ाइल से सवाल लोड करें
fetch("ww.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;

    // पहली बार लोड करते समय सवाल शफल करें
    shuffle(questions);
    loadQuestion();
  })
  .catch((error) => console.error("Error loading questions:", error));