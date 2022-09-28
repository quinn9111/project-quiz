const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-screen");
const questionElement = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const optionAElement = document.getElementById("answer_a");
const optionBElement = document.getElementById("answer_b");
const optionCElement = document.getElementById("answer_c");
const optionDElement = document.getElementById("answer_d");
const answerButtonsElement = document.getElementById("answer-buttons");
const header = document.getElementById("header");
const highScoresButton = document.getElementById("highscores-btn");
// const submitButton = document.getElementById("submit-btn");
const endScreen = document.getElementById("end");
const scoreElement = document.getElementById("score");
const initialsElement = document.getElementById("initials");
const highScoresScreen = document.getElementById("highscores-screen");
const scoreList = document.getElementById("scores");
const clearScoresButton = document.getElementById("clear-scores-btn");
const backtoQuizButton = document.getElementById("back-to-quiz");
const displayTimer = document.getElementById("timer");
// const submitButtton = document.getElementById("submit");
// const submitAnswer = document.getElementById("submitAnswer");
var correctAnswerElement;
var quizTimer;
var interval;
var seconds;
var grade;
var highScores = [];
var counter;
let questions = [];

//let shuffledQuestions, currentQuestionIndex
//coppied
// startButton.addEventListener("click", startQuiz);
// nextButton.addEventListener("click", () => {
//   currentQuestionIndex++;
//   setNextQuestion();
// });

// submitButton.addEventListener("click", handleSubmit);
// clearScoresButton.addEventListener("click", clearScores);
// backtoQuizButton.addEventListener("click", restart);
// highScoresButton.addEventListener("click", viewHighScores);

function showSecondsAsString() {
  const string = seconds.toString();
  displayTimer.innerHTML = string;
}
function handleTimeout() {
  clearInterval(interval);
  endQuiz();
}
function startTimer() {
  seconds = 60;
  interval = window.setInterval(() => {
    if (seconds <= 0) {
      handleTimeout();
    } else {
      seconds -= 1;
    }
    showSecondsAsString(seconds);
  }, 1000);
}

function startQuiz() {
  //  startTimer()
  counter = 0;
  initialsElement.value = "";
  startButton.classList.add("hide");
  header.classList.add("hide");
  //shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  //   submitAnswer.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
}

function getApiQuestion() {
  var requestUrl =
    "https://quizapi.io/api/v1/questions?apiKey=NFUXqcTPppFSXafHQp9yM04DHprK1iUc6fbqCmiT&category=sql&difficulty=Medium&limit=10";
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        let question = {};
        question.questionText = data[i].question;
        question.answers = [];
        // questionElement.innerText=thing
        for ([key, value] of Object.entries(data[i].answers)) {
          if (value) question.answers.push(value);
          if (key == data[i].correct_answer) question.correct = value;
        }

        if (question.questionText) questions.push(question);
      }
      console.log(questions);
      displayQuestion(0);
    });
}

function displayQuestion(index) {
  questionElement.innerText = questions[index].questionText;

  for (let i = 0; i < questions[index].answers.length; i++) {
    // create button - answers[j]
    let button = document.createElement("button");
    button.textContent = questions[index].answers[i];
    button.addEventListener("click", selectAnswer);
    button.setAttribute(
      "isCorrect",
      questions[index].answers[i] == questions[index].correct
    );
    answerButtonsElement.appendChild(button);
  }
}

//coppied
// startButton.addEventListener("click", getApiQuestion);

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.getAttribute("iscorrect");
  if (correct === "true") {
    alert("Good job!");
    counter = counter + 1;
  } else {
    seconds = seconds - 5;
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    //when there are no more questions
    handleTimeout();
  }
}

function endQuiz() {
  endScreen.classList.remove("hide");
  questionContainerElement.classList.add("hide");
  grade = calculateGrade();
  scoreElement.innerHTML = "Your score is: " + grade;
}
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
function calculateGrade() {
  let grade;
  grade = counter / questions.length;
  grade = grade * 100;
  grade = Math.round(grade);
  return grade;
}
function handleSubmit() {
  let initials = initialsElement.value;
  let entry = initials + " - " + grade;
  highScores.push(entry);
  console.log(highScores);
  removeAllChildNodes(scoreList);
  highScores.forEach((score) => {
    let li = document.createElement("li");
    li.innerText = score;
    scoreList.appendChild(li);
  });
  viewHighScores();
}
function viewHighScores() {
  handleTimeout();
  highScoresScreen.classList.remove("hide");
  endScreen.classList.add("hide");
  questionContainerElement.classList.add("hide");
  header.classList.add("hide");
}
function clearScores() {
  highScores = [];
  removeAllChildNodes(scoreList);
}
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function restart() {
  startButton.classList.remove("hide");
  header.classList.remove("hide");
  highScoresScreen.classList.add("hide");
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// submitButton.addEventListener("click", handleSubmit);
clearScoresButton.addEventListener("click", clearScores);
backtoQuizButton.addEventListener("click", restart);
highScoresButton.addEventListener("click", viewHighScores);

startButton.addEventListener("click", getApiQuestion);
