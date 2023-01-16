const exitButton = document.getElementById("Exit")
const scoreBoardContainer = document.getElementById("scoreBoardContainer")
const mainMenuContainer = document.getElementById("mainMenu-container")
const selectQuizForm = document.getElementById("selectQuizForm")
const mainQuestionSectionContainer = document.getElementById("mainQuestionSectionContainer");
import questionsList from './questions.json' assert {type: 'json'};

createQuizList();
exitButton.addEventListener('click', () => {
    scoreBoardContainer.classList.add("hide");
    mainMenuContainer.classList.remove("hide");
})

function createQuizList() {
    questionsList.quizzes.forEach(element => console.log(element.quizName))
    questionsList.quizzes.forEach(element => {
            const button = document.createElement('button');
            button.innerText = element.quizName
            button.value = element.quizName
            button.classList.add('btn')
            button.classList.add('btn-quiz-choice')
            button.addEventListener('click', function () {
                mainMenuContainer.classList.add('hide')
                mainQuestionSectionContainer.classList.remove('hide')
                console.log("Button on click")
                startGame(button.value)
            })
            mainMenuContainer.appendChild(button);
        }
    )
}
