'use strict';

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');


let activePlayer, currentScore, totalScore, playing;

const init = function(){

    activePlayer = 0;
    currentScore = 0;
    totalScore = [0, 0];
    playing = true;

    diceEl.classList.add('hidden');

    player1El.classList.remove('player--winner');
    player0El.classList.remove('player--winner');

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
}

init();

const switchPlayer = function(){
    
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    activePlayer = activePlayer === 0 ? 1 : 0;

    /*if(activePlayer === 0){
            activePlayer = 1;
        }else{
            activePlayer = 0;
    }*/

    player0El.classList.toggle('player--active'); /**changing/toggling the bg color */
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function(){

    if(playing){

        const dice = Math.trunc(Math.random()*6) + 1;
        diceEl.src = `dice-${dice}.png`;
        diceEl.classList.remove('hidden');
    
        if(dice !== 1 ){
    
            currentScore = currentScore + dice ;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
        }else{

            switchPlayer();
        }        
    }           
});

btnHold.addEventListener('click', function(){

    if(playing){

        let i = activePlayer;
        totalScore[i] = totalScore[i] + currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = totalScore[i];
        //document.getElementById(`current--${activePlayer}`).textContent = 0;

        if(totalScore[i] >= 50){
            
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${i}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            //document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer + 1} Wins`;
            
        }else{
            switchPlayer();
        }
    }    
});

btnNew.addEventListener('click', init);
/*this is the callback function wich the event should call but until the click happen unlike closeModal() calling the func right away*/ 

    
          
