/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, dice, firstRoll, winningScore;

init();



    //works when clicking 'ROLL DICE'
document.querySelector('.btn-roll').addEventListener('click' , function() {
    if(gamePlaying) {
        
        dice = Math.floor(Math.random() * 6) + 1;
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').src = 'dice-' + dice + '.png';
        
        if(dice !== 1 && !(dice === 6 && firstRoll === 6)) {
            roundScore += dice;
            firstRoll = dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else if (dice === 6 && firstRoll === 6) {
            document.getElementById('score-' + activePlayer).textContent = 0;
            document.getElementById('current-' + activePlayer).textContent = 0;
           nextPlayer();
        }
        else {
            nextPlayer();
        } 
    }                                               
});



    //changes the turn to the next player
function nextPlayer() {
    activePlayer = (activePlayer + 1) % 2;
    roundScore = 0;
    firstRoll = 0;
    
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    document.querySelector('.dice').style.display = 'none';
}



    //works when clicking 'NEW GAME'
document.querySelector('.btn-new').addEventListener('click' , init);
    



    //works when clicking 'HOLD'    
document.querySelector('.btn-hold').addEventListener('click' , function() {
    if(gamePlaying) {
        scores[activePlayer] += roundScore; 
        
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }                                        
});




    //resets the game
function init() {
    winningScore = prompt("what score would you like to be winning score?");
    scores = [0 , 0];
    roundScore = 0;
    activePlayer = 0;
    firstRoll = 0;
    gamePlaying = true;
    
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.dice').style.display = 'none';
    
    document.querySelector('.player-0-panel').classList.remove('winner');    
    document.querySelector('.player-1-panel').classList.remove('winner');    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');  
}






