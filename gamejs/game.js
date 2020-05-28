console.log("Hellow Quiz player!");

const question = document.getElementById('question');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const choices =Array.from(document.getElementsByClassName('choice-text'));
const loader = document.getElementById('loader');
const game = document.getElementById('game');
//console.log(choices);
let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [];
fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
.then( res => { 
      return res.json();
       }).then(loadedQuestions =>{
        console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map( loadedQuestion =>{
        const formattedQuestion = {
                question:loadedQuestion.question
        };
        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
        answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);
        answerChoices.forEach((choice,index) =>{
            formattedQuestion['choice' + (index+1)] = choice;
        });

        return formattedQuestion;

    });
   
  //  questions = loadedQuestions;
 startQuiz();
}).catch( err => {
    console.error(err);
});

//Constant //
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startQuiz = () =>{
    questionCounter = 0;
    score =0;
    availableQuestion = [...questions];
   // console.log(availableQuestion);
    getNextQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};
getNextQuestion = () =>{
    if(availableQuestion.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score);
        //Go to the End Page
        return window.location.assign('/end.html');
    }
    questionCounter++;
    progressText.innerHTML="Question"+questionCounter + "/" + MAX_QUESTIONS;
    //update Progress Bar
    progressBarFull.style.width = ((questionCounter/MAX_QUESTIONS )*100)+"%";
   const questionIndex = Math.floor(Math.random() * availableQuestion.length);
   currentQuestion = availableQuestion[questionIndex];
   question.innerText = currentQuestion.question;

   choices.forEach(choice =>{
       const number = choice.dataset['number'];
       choice.innerText = currentQuestion['choice' + number];
   });
   availableQuestion.splice(questionIndex,1);
   acceptingAnswer = true;
};

choices.forEach(choice => {
    choice.addEventListener("click" , e =>{
      //  console.log(e.target);
      if(!acceptingAnswer) return;
       
      acceptingAnswer = false;
      const selectedChoice = e.target;
      const selectedAnswer = selectedChoice.dataset['number'];
      const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
      if(classToApply == "correct"){
          increamentScore(CORRECT_BONUS);
      }
       //console.log(classToApply);
       //getNextQuestion();
      // console.log(selectedAnswer == currentQuestion.answer);
     selectedChoice.parentElement.classList.add(classToApply);
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNextQuestion(); 
        }, 1000);
    });
});

increamentScore = num =>{
    score+=num;
    scoreText.innerText = score;
}
//startQuiz();