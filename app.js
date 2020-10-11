const questionNumber = document.querySelector('.question-number');
const questionText = document.querySelector('.question-text');
const optionContainer = document.querySelector('.option-container');
const answerIndicatorContainer = document.querySelector('.answers-indicator');
const homeBox = document.querySelector('.home-box');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

let correctAnswers = 0;
let attempt = 0;


// Push the question into availableQuestions Array
function setAvailableQuestions() {
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i]);
    }
    // console.log(availableQuestions);
}

// set Question No and Options
function getNewQuestion() {

    // 1.set question Number
    questionNumber.innerHTML = `Question ${questionCounter + 1} of ${quiz.length}`;

    // 2.set question Text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = 'Q. ' + currentQuestion.q;

    // get the position of 'questionIndex' from the available question array
    const index1 = availableQuestions.indexOf(questionIndex);
    // remove the 'questionIndex' from the available question array,
    // so that the question does not repeat
    availableQuestions.splice(index1, 1);

    // 3.set options
    // get the length of options
    const optionLen = currentQuestion.options.length;
    // Push options into availableOptions array
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i);
    }

    optionContainer.innerHTML = '';
    let animationDelay = .2;
    // Create options in HTML
    for (let i = 0; i < optionLen; i++) {
        // Random options
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of 'optionIndex' from the availableOptions
        const index2 = availableOptions.indexOf(optionIndex);
        // remove the 'optionIndex' from the availableOptions, so that the option does not repeat
        availableOptions.splice(index2, 1)
        const option = document.createElement('div');
        option.innerHTML = currentQuestion.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay += .2;
        option.className = 'option';
        optionContainer.appendChild(option);
        option.setAttribute('onclick', 'getResult(this)');
    }

    questionCounter++
}

function getResult(element) {
    const id = parseInt(element.id);
    // get the answer by comparing the id of clicked option
    if (id === currentQuestion.answer) {
        // set the green color to the correct option
        element.classList.add('correct');
        // add the indicator to the correct mark
        updateAnswerIndicator('correct'); 
        correctAnswers++;
    } else {
        // set the red color to the wrong  option
        element.classList.add('wrong');
        // add the indicator to the wrong mark
        updateAnswerIndicator('wrong'); 

        // if the answer is incorrect then show the 
        // correct option by adding green color to the option
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add('correct');
            }
        }
    }
    attempt++
    unClickableOptions()
}

// make all the option unClickable  once the user select a option
function unClickableOptions() {
    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add('already-answered')
    }
}

function answerIndicator() {
    const totalQuestion = quiz.length;
    for(let i = 0; i < totalQuestion; i++){
        const indicator = document.createElement('div');
        answerIndicatorContainer.appendChild(indicator);
    }
}

function updateAnswerIndicator(markType) {
    answerIndicatorContainer.children[questionCounter - 1].classList.add(markType)
}

// document.querySelector('#next').addEventListener('click', next);
function next() {
    if (questionCounter === quiz.length) {
        quizOver();
    } else {
        getNewQuestion();
    }
};

function quizOver(){
    // hide quizBox
    quizBox.classList.add('hide');
    // show resultBox
    resultBox.classList.remove('hide');
    quizResult();
}

// get the quiz result
function quizResult(){
    resultBox.querySelector('.total-question').innerHTML = quiz.length;
    resultBox.querySelector('.total-attempt').innerHTML = attempt;
    resultBox.querySelector('.total-correct').innerHTML = correctAnswers;
    resultBox.querySelector('.total-wrong').innerHTML = attempt - correctAnswers;
    resultBox.querySelector('.total-percentage').innerHTML = ((correctAnswers/quiz.length)*100).toFixed(2) + '%';
    resultBox.querySelector('.total-score').innerHTML = correctAnswers + ' / ' + quiz.length;
}

function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

// document.querySelector('#tryAgain').addEventListener('click', tryAgain)
function tryAgain(){
    // hide the resultBox
    resultBox.classList.add('hide');
    // show the quizBox
    quizBox.classList.remove('hide');
    resetQuiz();
    startQuiz();
};

// document.querySelector('#goToHome').addEventListener('click', goToHome )
function goToHome(){
    // hide the resultBox
    resultBox.classList.add('hide');
    // show the quizBox
    homeBox.classList.remove('hide');
    resetQuiz();
};


// ##### STARTING POINT #####

// document.querySelector('#startQuiz').addEventListener('click', startQuiz );
function startQuiz(){
    // hide homeBox
    homeBox.classList.add('hide');
    // show quizBox
    quizBox.classList.remove('hide');
    
    // first we will set all the questions
    setAvailableQuestions();

    // second we will call getNewQuestion() function
    getNewQuestion();

    // to create indicator of answer
    answerIndicator();
};

window.onload = function(){
    homeBox.querySelector('.total-question').innerHTML = quiz.length;
}
