const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const highscoreButton = document.getElementById("highscore-btn");

const questionContainerElement = document.getElementById("start-btn");

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let correctAnswer = [null, null, 0];

const question = [
  {
    question:
      "What is JavaScript primarily used for?",
    answers: [
      { text: "Creating the foundation of a website", correct: false },
      { text: "Making complex website functions", correct: true },
      { text: "Changing the style of the text", correct: false },
    ],
  },
  {
    question: "Which is these is true about JavaScript?",
    answers: [
      { text: "You can start as well as end a function with a semicolon", correct: true },
      { text: "The semicolon can only go on the end of the function", correct: false },
      { text: "You don't need a semicolon to finish a function", correct: false },
    ],
  },
  {
    question: "What can be used to leave comments on the code that don't impact the program?",
    answers: [
      { text: "It is impossible to leave any comments on JS", correct: false },
      { text: "/*whatever text*/", correct: false },
      { text: "//whatever text", correct: true },
    ],
  },
  {
    question: "How long did it take to make JavaScript",
    answers: [
      { text: "It is always being developed. The war for a better language is never over.", correct: false },
      { text: "Twelve years", correct: false },
      { text: "Ten days lol", correct: true },
    ],
  },
  {
    question: "Where can you put JavaScript in a project?",
    answers: [
      { text: "It has to be its own seperate file", correct: false },
      { text: "It can go into css but not have its own duplicate file or else your CPU will fry", correct: false },
      { text: "It can go into either the HTML or its own file", correct: true },
    ],
  },
  {
    question: "What does 'boolean' mean in JavaScript?",
    answers: [
      { text: "A value that is either true or false", correct: true },
      { text: "A variable you can change to whatever you want", correct: false },
      { text: "A function that you cannot change no matter what you do after you initially set it", correct: false },
    ],
  },
  {
    question: "How many properties can you add to a single function?",
    answers: [
      { text: "No more than twenty", correct: false },
      { text: "As much as your computer can handle!", correct: true },
      { text: "No less than two", correct: false },
    ],
  },
];

let shuffledQuestions, currentQuestionIndex;
let quizScore = 0;

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setnextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  document.getElementById("start-btn").style.display = "none";
  shuffledQuestions = question.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  document.getElementById("question-container").style.display = "block";
  setnextQuestion();
  console.log(quizScore);
}

function setnextQuestion() {
  correctAnswer[1] = false;
  btn1 = document.getElementById("answerBtn1").style.backgroundColor = "orange";
  btn2 = document.getElementById("answerBtn2").style.backgroundColor = "orange";
  btn3 = document.getElementById("answerBtn3").style.backgroundColor = "orange";

  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function clearStatusClass(element) {
  console.log(element.classList);
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function showQuestion(question) {
  console.log(question);
  document.getElementById("questionHolder").innerHTML = question.question;

  question.answers.forEach((answer, i) => {
    button = document.getElementById("answerBtn" + (i + 1));
    button.innerHTML = answer.text;
    if (answer.correct) {
      correctAnswer[0] = answer.text;
    }
    button.addEventListener("click", selectAnswer);
     answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  if (correctAnswer[1]) {
    alert("You only have one chance. Use it more wisely next time.");
    return;
  }
  const target = e.target.innerHTML;
  const selectButton = e.target;
  const correct = selectButton.dataset.correct;
  console.log(target, correctAnswer);

  if (target === correctAnswer[0]) {
    document.getElementById(e.target.id).style.backgroundColor = "green";
    correctAnswer[2] = correctAnswer[2] + 1;
  } else {
    document.getElementById(e.target.id).style.backgroundColor = "red";
  }

  correctAnswer[1] = true;
  console.log(correctAnswer);
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

var sec = 60;
var time = setInterval(myTimer, 1000);

function myTimer() {
  document.getElementById("timer").innerHTML = sec + "sec left";
  sec--;
  if (sec == -2) {
    clearInterval(time);
    alert("Time's out pal. Try again or something.");
  }
}

var score = 0;
var highscore = localStorage.getItem("highscore");

if (highscore !== null) {
  if (score > highscore) {
    localStorage.setItem("highscore", score);
  }
} else {
  localStorage.setItem("highscore", score);
}