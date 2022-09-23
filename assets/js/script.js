const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById("question-screen")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const header = document.getElementById("header")
const highScoresButton = document.getElementById("highscores-btn")
const submitButton = document.getElementById("submit-btn")
const endScreen = document.getElementById('end')
const scoreElement = document.getElementById('score')
const initialsElement = document.getElementById('initials')
const highScoresScreen = document.getElementById('highscores-screen')
const scoreList = document.getElementById('scores')
const clearScoresButton = document.getElementById('clear-scores-btn')
const backtoQuizButton = document.getElementById('back-to-quiz')
const displayTimer = document.getElementById('timer')
var quizTimer
var interval
var seconds
var grade
var highScores = []
var counter
let shuffledQuestions, currentQuestionIndex
startButton.addEventListener("click", startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
submitButton.addEventListener("click", handleSubmit)
clearScoresButton.addEventListener("click", clearScores)
backtoQuizButton.addEventListener("click", restart)
highScoresButton.addEventListener("click", viewHighScores)
function showSecondsAsString() {
    const string = seconds.toString()
    displayTimer.innerHTML = string
}
function handleTimeout() {
    clearInterval(interval)
    endQuiz()
}
function startTimer() {
    seconds = 60
    interval = window.setInterval(() => {
        if (seconds <= 0) {
            handleTimeout()
        }
        else {
            seconds -= 1
        }
        showSecondsAsString(seconds)
    }, 1000)
}
function startQuiz() {
    startTimer()
    counter = 0
    initialsElement.value = ""
    startButton.classList.add("hide")
    header.classList.add("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide")
    setNextQuestion()
}
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (correct) {
        counter = counter + 1
    }
    else {
        seconds = seconds - 5
    }
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        //when there are no more questions
        handleTimeout()
    }
}
function endQuiz() {
    endScreen.classList.remove('hide')
    questionContainerElement.classList.add('hide')
    grade = calculateGrade()
    scoreElement.innerHTML = "Your score is: " + grade
}
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct")
    } else {
        element.classList.add("wrong")
    }
}
function clearStatusClass(element) {
    element.classList.remove("correct")
    element.classList.remove("wrong")
}
function calculateGrade() {
    let grade
    grade = counter / questions.length
    grade = grade * 100
    grade = Math.round(grade)
    return grade
}
function handleSubmit() {
    let initials = initialsElement.value
    let entry = initials + " - " + grade
    highScores.push(entry)
    console.log(highScores)
    removeAllChildNodes(scoreList)
    highScores.forEach((score) => {
        let li = document.createElement("li");
        li.innerText = score;
        scoreList.appendChild(li);
    });
    viewHighScores()
}
function viewHighScores() {
    handleTimeout()
    highScoresScreen.classList.remove('hide')
    endScreen.classList.add('hide')
    questionContainerElement.classList.add('hide')
    header.classList.add('hide')
}
function clearScores() {
    highScores = []
    removeAllChildNodes(scoreList)
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function restart() {
    startButton.classList.remove("hide")
    header.classList.remove("hide")
    highScoresScreen.classList.add('hide')
}
const questions = [
    {
        question: "Arrays in Javascript are used to store ______.",
        answers: [
            { text: "Numbers and strings", correct: false },
            { text: "Other arrays", correct: false },
            { text: "Objects", correct: false },
            { text: "All of the above", correct: true },
        ]
    },
    {
        question: "Which of the following is the proper way to declare a class in javascript?",
        answers: [
            { text: "class.apple", correct: true },
            { text: "apple.class", correct: false },
            { text: "appleClass", correct: false },
            { text: "class Apple", correct: false },
        ]
    },
    {
        question: "What is the HTML element used to link the index.html to the javascript?",
        answers: [
            { text: "<js>", correct: false },
            { text: "<script>", correct: true },
            { text: "<stylesheet>", correct: false },
            { text: "<scripter>", correct: false },
        ]
    },
    {
        question: "How do you write a message in an alert box?",
        answers: [
            { text: "alert(message)", correct: true },
            { text: "msg(message)", correct: false },
            { text: "message(alert)", correct: false },
            { text: "alert(msg)", correct: false },
        ]
    },
    {
        question: "What of the following expresses correct javascript syntax?",
        answers: [
            { text: "appendChild{}", correct: false },
            { text: "AppendChild()", correct: false },
            { text: "appendChild()", correct: true },
            { text: "childAppend()", correct: false },
        ]
    }
]