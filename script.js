const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const goToScoreBoardButton = document.getElementById('goToScoreBoard-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const selectOptionsElement = document.getElementById('answer-select');
const mainQuestionSectionContainer = document.getElementById("mainQuestionSectionContainer");
const scoreBoardContainer = document.getElementById("scoreBoardContainer");
const restartButton = document.getElementById('startAgain-button');

let correctAnswers = 0;
let check = 0;
let shuffledQuestions, currentQuestionIndex, usedIndexList, questionsList;

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        questionsList = JSON.parse(xhttp.responseText);
    }
};
xhttp.open("GET", "questions.json", true);
xhttp.send();


startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    check = 0;
    setNextQuestion()
})
goToScoreBoardButton.addEventListener('click', () => {
    scoreBoardContainer.classList.remove('hide');
    mainQuestionSectionContainer.classList.add('hide');
    document.getElementById('score-scoreBoard').innerHTML = correctAnswers;
})
restartButton.addEventListener('click', () => {
    scoreBoardContainer.classList.add('hide');
    goToScoreBoardButton.classList.add('hide')
    mainQuestionSectionContainer.classList.remove('hide');
    startGame();
});


function startGame() {
    startButton.classList.add('hide')
    correctAnswers = 0;
    currentQuestionIndex = 0;
    check = 0;
    shuffledQuestions = questionsList.questions //questions.sort(() => Math.random - .5); // <---- change to DB
    usedIndexList = []
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function mixQuestions() {
    let indexNumber;

    while (true) {
        indexNumber = Math.floor(Math.random() * shuffledQuestions.length);
        if (!usedIndexList.includes(indexNumber)) {
            usedIndexList.push(indexNumber);
            // currentQuestionIndex++
            break;
        }
    }
    return indexNumber;
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[mixQuestions()])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    switch (question.questionType) {
        case 'ABCD-TF':
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
            break;
        case 'List':
            const select = document.createElement("select");
            question.answers.forEach(answer => {
                const option = document.createElement('option')
                option.innerText = answer.text
                // button.classList.add('btn')
                if (answer.correct) {
                    option.dataset.correct = answer.correct
                }
                option.addEventListener('click', selectAnswer)
                answerButtonsElement.appendChild(selectOptionsElement)
                selectOptionsElement.appendChild(selectOptionsElement)
            })
            break;
        default:
            break;


    }
    document.getElementById('score').innerHTML = "Score: " + correctAnswers;
}

function resetState() {
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    if (check < 1) {
        setStatusClass(selectedButton, correct);
        check++
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        goToScoreBoardButton.classList.remove('hide')

        // startButton.innerText = 'Once more'
        // startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
        correctAnswers += 10;
        // document.getElementById('score').innerHTML = "Score: " + correctAnswers.update(document.getElementById('score').innerHTML = "Score: " + correctAnswers);
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


// const questions = [{
//     question: 'what is 2 + 2',
//     answers: [
//         {text: '4', correct: true},
//         {text: '22', correct: false}
//     ]
// }, {
//     question: 'what is 4 * 8  #1',
//     answers: [
//         {text: '32', correct: true},
//         {text: '16', correct: false},
//         {text: '48', correct: false},
//         {text: '84', correct: false}
//     ]
// }, {
//     question: 'what is 4 * 8  #2',
//     answers: [
//         {text: '32', correct: true},
//         {text: '16', correct: false},
//         {text: '48', correct: false},
//         {text: '84', correct: false}
//     ]
// }, {
//     question: 'what is 4 * 8  #3',
//     answers: [
//         {text: '32', correct: true},
//         {text: '16', correct: false},
//         {text: '48', correct: false},
//         {text: '84', correct: false}
//     ]
// }
//
// ]