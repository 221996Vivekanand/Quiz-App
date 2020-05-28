const username = document.getElementById('username');
const saveScoreBtn =  document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highSocres = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORE = 5;
//console.log(highSocres);
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', ()=>{
    //console.log(username.value);
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e =>{
    console.log("Clicked to Save Button");
    e.preventDefault();
    const score = {
        //here used Math.floor(Math.random()*100);
        score:mostRecentScore,
        name:username.value
    };

    highSocres.push(score);
    highSocres.sort((a,b) => {
       return b.score - a.score;
    });
    highSocres.splice(5);
    
    localStorage.setItem('highScores',JSON.stringify(highSocres));
    window.location.assign('/');
    //console.log(highSocres);
};