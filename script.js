const questions = [
  {
    question: "Who invented the telescope?",
    options: [
      {
        text: "Hypatia",
        correct: false,
      },
      {
        text: "Hans Lippershey",
        correct: true,
      },
      {
        text: "Galileo",
        correct: false,
      },
      {
        text: "Johannes Kepler",
        correct: false,
      },
    ],
  },
  {
    question:
      "What is the name of the radio source that is very far from Earth?",
    options: [
      {
        text: "Quasar",
        correct: true,
      },
      {
        text: "Tracer",
        correct: false,
      },
      {
        text: "Phaser",
        correct: false,
      },
      {
        text: "Taser",
        correct: false,
      },
    ],
  },
  {
    question:
      "Which spacecraft was Laika, the first living creature sent into space?",
    options: [
      {
        text: "Apollo 11",
        correct: false,
      },
      {
        text: "Sputnik 2",
        correct: true,
      },
      {
        text: "Sputnik 3",
        correct: false,
      },
      {
        text: "Vostok 1",
        correct: false,
      },
    ],
  },
  {
    question: "What is the dark center of a sunspot called?",
    options: [
      {
        text: "Umbra",
        correct: true,
      },
      {
        text: "Dark Spot",
        correct: false,
      },
      {
        text: "Penumbra",
        correct: false,
      },
      {
        text: "Filament",
        correct: false,
      },
    ],
  },
  {
    question:
      "In 1921, Albert Einstein received the Noble Prize for which of his following work?",
    options: [
      {
        text: "Physical Cosmology",
        correct: false,
      },
      {
        text: "Relativity Theory",
        correct: false,
      },
      {
        text: "Neutrino Oscillations",
        correct: false,
      },
      {
        text: "Photoelectric Effect",
        correct: true,
      },
    ],
  },
  {
    question:
      "Who was the first female commander of the International Space Station (ISS) ?",
    options: [
      {
        text: "Eileen Collins",
        correct: false,
      },
      {
        text: "Christina Koch",
        correct: false,
      },
      {
        text: "Peggy Whitson",
        correct: false,
      },
      {
        text: "Valentina Tereshkova",
        correct: true,
      },
    ],
  },
  {
    question: "Who was the first person to enter outer space twice?",
    options: [
      {
        text: "Yuri Gagarin",
        correct: false,
      },
      {
        text: "Christina Koch",
        correct: false,
      },
      {
        text: "Vladimir Komarov",
        correct: true,
      },
      {
        text: "Scott Kelly",
        correct: false,
      },
    ],
  },
  {
    question: 'Who discovered the phenomenon of "Baily\'s Beads" ?',
    options: [
      {
        text: "Richard Baily",
        correct: false,
      },
      {
        text: "John Herschel",
        correct: false,
      },
      {
        text: "Francis Baily",
        correct: true,
      },
      {
        text: "Nicolas-Louis de Lacaille",
        correct: false,
      },
    ],
  },
  {
    question: "Which astronomer formulated the modern Big Bang Theory ?",
    options: [
      {
        text: "William Herschel",
        correct: false,
      },
      {
        text: "Edwin Hubble",
        correct: false,
      },
      {
        text: "Carl Sagan",
        correct: false,
      },
      {
        text: "Georges Lemaître",
        correct: true,
      },
    ],
  },
  {
    question:
      "Which planet's axis is almost parallel to its orbital plane, making it spin nearly on its side ?",
    options: [
      {
        text: "Jupiter",
        correct: false,
      },
      {
        text: "Saturn",
        correct: false,
      },
      {
        text: "Venus",
        correct: false,
      },
      {
        text: "Uranus",
        correct: true,
      },
    ],
  },
];

const quizMain = document.getElementById("quiz-main");
const body = document.getElementById("body");

let shuffledQuestions, currentQuestionIndex, currentScore;

function startGame() {
  quizMain.style.display = "none";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  currentScore = 0;
  setNextQuestion();
}

function setNextQuestion() {
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  body.innerHTML = `
    <div class="quiz-bg">
        <div class="quiz-bg-inner">
          <div class="progress-bar">
            <div class="progress-bar-inner" id="progress-bar-inner"></div>
          </div>
          <h1>${question.question}</h1>
          <div class="answers-wrap" id="answers-wrap">
            <ol type="I" class="answers" id="answers-list">
            </ol>
          </div>
        </div>
      </div>
    `;
  const progressBarInner = document.getElementById("progress-bar-inner");
  progressBarInner.style.width =
    (((currentQuestionIndex + 1) / questions.length) * 100).toString() + "%";
  const answersList = document.getElementById("answers-list");
  question.options.forEach((answer) => {
    const li = document.createElement("li");
    if (answer.correct) {
      li.innerHTML = `<div class='answer' onclick="selectAnswer(event)" data-correct="true">${answer.text}</div>`;
    } else {
      li.innerHTML = `<div class='answer' onclick="selectAnswer(event)">${answer.text}</div>`;
    }
    answersList.appendChild(li);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  const answersWrap = document.getElementById("answers-wrap");
  const answers = document.getElementsByClassName("answer");
  if (correct) {
    currentScore++;
    selectedButton.classList.add("correct-btn");
    const div = document.createElement("div");
    div.classList.add("answers-result");
    div.innerHTML = `
      <img src="./images/correct.svg" alt="Correct" />
      <button id="next-btn">Next &#8594;</button>
      `;
    answersWrap.appendChild(div);
  } else {
    const correctBtn = document.querySelector("[data-correct]");
    correctBtn.classList.add("correct-btn");
    selectedButton.classList.add("wrong-btn");
    const div = document.createElement("div");
    div.classList.add("answers-result");
    div.innerHTML = `
    <img src="./images/wrong.svg" alt="Correct" />
    <button id="next-btn">Next &#8594;</button>
    `;
    answersWrap.appendChild(div);
  }
  for (var i = 0, len = answers.length; i < len; i++) {
    answers[i].onclick = "";
  }

  const nextBtn = document.getElementById("next-btn");
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextBtn.addEventListener("click", () => {
      currentQuestionIndex++;
      setNextQuestion();
    });
  } else {
    nextBtn.innerText = "Results";
    nextBtn.addEventListener("click", showResults);
  }
}

function showResults() {
  body.innerHTML = `
        <div class="quiz-results">
        <div class="quiz-results-inner">
          <h1>Your Results For The Quiz Are</h1>
          <p>${currentScore}/${questions.length}</p>
          <button onclick="showHome()">Back to home</button>
        </div>
        </div>
    `;
}

function showHome() {
  body.innerHTML = `
     <div class="quiz-main-bg" id="quiz-main">
      <h1 class="title">Space Quiz</h1>
      <button class="play-btn" onclick="startGame()">Play Now</button>
     </div>
     `;
}
