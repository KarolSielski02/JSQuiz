const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
let correctAnswers = 0;
const score = document.getElementById('score');

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame(){
    startButton.classList.add('hide')
    correctAnswers = 0;
    shuffledQuestions = JSON.parse(questions.json).sort(() => Math.random - .5); // <---- change to DB
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    nextButton.classList.add('hide')
    score.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    // Array.from(answerButtonsElement.children).forEach(button => {
    //     setStatusClass(button, button.dataset.correct)
    // })
    // if(selectedButton.dataset.correct){
    //     correctAnswers += 10;
    // }
    setStatusClass(selectedButton, correct);
    if(shuffledQuestions.length > currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')

        document.getElementById('score').innerHTML = "You have scored: " + correctAnswers + " points";
        score.classList.remove('hide')
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
        correctAnswers += 10;
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [ {
    question: 'what is 2 + 2',
    answers: [
        {text: '4', correct: true},
        {text: '22', correct: false}
    ]
},{
    question: 'what is 4 * 8',
    answers: [
        {text: '32', correct: true},
        {text: '16', correct: false},
        {text: '48', correct: false},
        {text: '84', correct: false}
    ]
}

]