//variable declarations
var activePlayer,score,roundScore,dice,finalScore,gamePlaying;

init();

function init(){
	finalScore = 100;
	activePlayer = 0;
	score=[0,0];
	roundScore = 0;
	gamePlaying = true;
	dice = Math.floor(Math.random()*6)+1
	document.querySelector('#current-'+activePlayer).textContent = dice;

	document.querySelector('.dice').style.display = 'none';

	//set all the scores to zero
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.add('active');
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	
	document.querySelector('.final-score').value='';
}



//roll the dice event
document.querySelector('.btn-roll').addEventListener('click',function(){
	
	if(gamePlaying){
		//1.Select the dice element
		var diceDOM = document.querySelector('.dice');

		//2.generate a random number between 1 and 5
		var dice = Math.floor(Math.random()*6)+1;
		
		//3.change display of img to block and display the image corresponding to dice number.
		diceDOM.src ="dice-"+dice+".png";
		diceDOM.style.display = 'block';

		if(dice!=1){
			roundScore+=dice;
			var currentScore = Number(document.querySelector('#current-'+activePlayer).textContent);
			document.querySelector('#current-'+activePlayer).textContent = currentScore+dice; 
		}else{
			switchActiveClass();
		}
	}
});

//add a eventListener to hold button
document.querySelector('.btn-hold').addEventListener('click',function(){

	if(gamePlaying){

		score[activePlayer] = roundScore+score[activePlayer];
		document.getElementById('score-'+activePlayer).textContent = score[activePlayer];
		
		//check for a winner (if exists)
		if(score[activePlayer]>=finalScore){
			document.getElementById('name-'+activePlayer).textContent = 'winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
			document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
			gamePlaying = false;		
		}else{
			switchActiveClass();

		}

		// document.querySelector('.player-0-panel').classList.remove('active');
		// document.querySelector('.player-1-panel').classList.add('active');
		// document.querySelector('.dice').style.display = 'none';
	}
});

function switchActiveClass(){
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
	document.querySelector('#current-'+activePlayer).textContent = 0; 
	activePlayer ^= 1;
	roundScore = 0;
}

//add event on input field i.e final score
document.querySelector('.final-score').addEventListener('focusout',function(){
	finalScore = Number(document.querySelector('.final-score').value);
	console.log(finalScore);
});

//add click event listener on new button
document.querySelector('.btn-new').addEventListener('click',function(){
	init();	
});