
// declare pre-quiz initial values for variables
let questionCounter = null
let counter = 2*60
let terminated = false
let score = 0

// declare timer variable existence
let quizInterval = null

// declare leaderboard and write
let leaderboard = localStorage.leaderboard ? JSON.parse(localStorage.leaderboard) : Array(10).fill({user: 'example', highscore: 0, })

function leaderboardWrite(){
    document.querySelector('#leaderboard').innerHTML = ''
    for (i = 0; i < leaderboard.length; i++){
        document.querySelector('#leaderboard').innerHTML += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${leaderboard[i].user}</td>
        <td>${leaderboard[i].highscore}</td>
      </tr>`
    }
}

leaderboardWrite()

function startQuiz(event){
    event.preventDefault()

    questionCounter = 0
    counter = 2*60
    terminated = false
    score = 0

    document.querySelector('#questionId').textContent = questionCounter + 1
    document.querySelector('#end').style.display = 'none'
    document.querySelector('#quizChoices').innerHTML = ''

    var startButton = event.target
    startButton.setAttribute("disabled","")
    startButton.innerHTML = 'Test ongoing...'

    var submitButton = document.querySelector('#submit')
    submitButton.disabled = false;
    submitButton.innerHTML = 'Submit'

    document.querySelector('#quizBody').style.display = 'block'

    shuffleArray(quiz)
    document.querySelector('#quizQuestions').innerHTML = `<div>${quiz[questionCounter].question}</div>`
    insertChoices(questionCounter)
    beginTimer()
}

function answerQuestion(event){
    event.preventDefault()

    if (event.target.matches('button')){

        console.log(`you clicked ${event.target.innerHTML}, answer is ${quiz[questionCounter].answer}`)
        if (event.target.innerHTML == quiz[questionCounter].answer){
            score ++
        } else {
            counter -= 20
            if (counter < 1){
                terminateQuiz()
                terminated = true
                document.querySelector('#terminateCondition').textContent = 'the timer penalty incurred from your incorrect answer was greater than the remaining time'
            }
            document.querySelector('#timer').innerHTML = counter
        }

        if (questionCounter < quiz.length - 1){
            questionCounter ++
            document.querySelector('#questionId').textContent = questionCounter + 1
            document.querySelector('#quizQuestions').innerHTML = ''
            document.querySelector('#quizChoices').innerHTML = ''
            document.querySelector('#quizQuestions').innerHTML = `<div>${quiz[questionCounter].question}</div>`
            insertChoices(questionCounter)
            
        } else {
            terminateQuiz()
            terminated = true
            document.querySelector('#terminateCondition').textContent = 'you completed all the questions'
        } 
        
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
        quizChoices.innerHTML += `<div class='col-sm-12 col-md-6'><button type=button class="btn btn-primary" style='margin:1em;padding=1em'>${quiz[questionIndex].choices[i]}</button></div>`
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
            document.querySelector('#terminateCondition').textContent = 'the timer ticked to 0'
        }
    }
    quizInterval = setInterval(countdown, 1000)
}

function terminateQuiz(){
    if (!terminated){
        clearInterval(quizInterval)
        
        document.querySelector('#quizBody').style.display = 'none'

        document.querySelector('#end').style.display = 'block'

        var startButton = document.querySelector('#startButton')
        startButton.disabled = false;

        document.querySelector('#finalScore').textContent = `${score} out of a possible ${quiz.length} points`

        startButton.innerHTML = 'Retry?'
        

    }
}

function submitScore(event){
    event.preventDefault()

    var submitButton = event.target
    submitButton.setAttribute("disabled","")
    submitButton.innerHTML = 'Submitted'

    leaderboard[leaderboard.length-1] = {user: document.querySelector('#username').value, highscore: score}

    function compare(a, b) {
        const highscoreA = a.highscore
        const highscoreB = b.highscore
      
        let comparison = 0
        if (highscoreA > highscoreB) {
          comparison = 1
        } else if (highscoreA < highscoreB) {
          comparison = -1
        }
        return comparison * -1

      }
    leaderboard = leaderboard.sort(compare)

    localStorage.leaderboard = JSON.stringify(leaderboard)
    leaderboardWrite()
    
}

function resetLeaderboard(event){
    event.preventDefault()
    
    

    leaderboard = Array(10).fill({user: 'example', highscore: 0, })
    localStorage.leaderboard = JSON.stringify(leaderboard)
    leaderboardWrite()
}

// quiz content

quiz = [
    {question: 'What is not a basic Javascript class?',
        choices: ['number', 'string', 'boolean', 'object'],
        answer: 'object',
    },
    {question: 'Which cannot be used to declare a string?',
        choices: ['\'string\'', '`string`', '[string]', '"string"'],
        answer: '[string]',
    },
    {question: 'Which HTML tag interprets javascript?',
        choices: ['&#60style&#62&#60/style&#62', 
            '&#60script&#62&#60/script&#62', 
            '&#60head&#62&#60/head&#62', 
            '&#60body&#62&#60/body&#62'],
        answer: '&lt;script&gt;&lt;/script&gt;', 
    },
    {question: 'What is event delegation?',
        choices: ['Assigning behaviour of function based on event', 
            'Priority for functions executed within innermost nested HTML tags', 
            'Handling events with a separate javascript file', 
            'Executing an event with a function'],
        answer: 'Priority for functions executed within innermost nested HTML tags', 
    },
    {question: 'Which cannot access existing HTML elements?',
        choices: ['document.querySelector()', 
            'document.getElementById()', 
            'event.target', 
            'localStorage.target'],
        answer: 'localStorage.target',
    },
    {question: 'How can you iterate through an array called myArray in a for loop?',
        choices: ['i = 0; i < myArray; i--', 
            'i = 0; i > myArray; i++', 
            'i = 0; i > myArray; i--', 
            'i = 0; i < myArray; i++'],
        answer: 'i = 0; i &lt; myArray; i++',
    },
    {question: 'Which can be taken as false input?',
        choices: [`1 == '1'`, `1 === '1'`, `1`, `1 = '1'`],
        answer: `1 === '1'`,
    },
    {question: 'What cannot be used to branch to one of three outputs depending on the input?',
        choices: ['if, else if, else',
            'ternary operator',
            'switch statement',
            'for statement'],
        answer: 'for statement',
    },
    {question: 'Which can be used to declare an object?',
        choices: ['{object}', '[object]', '(object)', '&#60object&#62'],
        answer: '{object}',
    },
    {question: 'What is scoping?',
        choices: ['The amount of operations a function has relative to the whole script', 
            'The input breadth a function can take', 
            'The nest level of an entity that determines where it can be called', 
            'The interconnectedness of functions'],
        answer: 'The nest level of an entity that determines where it can be called', 
    },
]
