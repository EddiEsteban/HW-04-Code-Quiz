// 10 questions

// Begin quiz

var questionCounter = 0
var counter = 2*60
var terminated = false

function startQuiz(event){
    event.preventDefault()

    var startButton = event.target
    startButton.setAttribute("disabled","")
    startButton.innerHTML = 'Test ongoing...'

    document.querySelector('#quizBody').style.display = 'block'

    shuffleArray(quiz)
    document.querySelector('#quizQuestions').innerHTML = `<div>${quiz[questionCounter].question}</div>`
    insertChoices(questionCounter)
    beginTimer()
}

function answerQuestion(event){
    event.preventDefault()
    document.querySelector('#quizQuestions').innerHTML = ''
    document.querySelector('#quizChoices').innerHTML = ''
    if (questionCounter < quiz.length){
        console.log(questionCounter)
        console.log(quiz.length)

        if (event.target.matches('button')){
            document.querySelector('#quizQuestions').innerHTML = `<div>${quiz[questionCounter].question}</div>`
            insertChoices(questionCounter)
            questionCounter ++
        } 
    } else {
        terminateQuiz()
        terminated = true
    
    }
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function insertChoices(questionIndex){
    shuffleArray(quiz[questionIndex].choices)
    quizChoices = document.querySelector('#quizChoices')
    for (i = 0; i < quiz[questionIndex].choices.length; i++){
        quizChoices.innerHTML += `<div class='col'><button type=button class="btn btn-primary">${quiz[questionIndex].choices[i]}</button></div>`
    }
}

// timer

function beginTimer(){
    document.querySelector('#timer').innerHTML = counter
    function countdown(){
        if (counter > 1) {
            counter --; 
            document.querySelector('#timer').innerHTML = counter
        } else {
            terminateQuiz()
            terminated = true
        }
    }
    setInterval(countdown, 1000)
}

function terminateQuiz(){
    if (!terminated){
        document.querySelector('#quizBody').style.display = 'none'
        
    }
}

quiz = [
    {question: 'What is not a basic Javascript class?',
        choices: ['number', 'string', 'boolean', 'object'],
        get answer(){
            return this.choices[3]
        }
    },
    {question: 'Which cannot be used to contain strings?',
        choices: ['\'string\'', '`string`', '[string]', '"string"'],
        get answer(){
            return this.choices[2]
        }
    },
    {question: 'Which HTML tag contains javascript?',
        choices: ['&#60style&#62&#60/style&#62', '&#60script&#62&#60/script&#62', '', ''],
        get answer(){
            return this.choices[0]
        }
    },
    {question: 'What is not a basic Javascript class?',
        choices: ['a', 'b', 'c', 'd'],
        get answer(){
            return this.choices[0]
        }
    },
    {question: 'What is not a basic Javascript class?',
        choices: ['a', 'b', 'c', 'd'],
        get answer(){
            return this.choices[0]
        }
    },
]


// use display:none in CSS to hide text