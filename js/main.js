//Example fetch using pokemonapi.co
if(!localStorage.getItem('deckId')) {
  let firstDeckId = ''
  fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        firstDeckId = data.deck_id
        localStorage.setItem('deckId', firstDeckId) 
      });
  
}


let deckId = ''


document.querySelector('button').addEventListener('click', drawCards)




function drawCards(){
  deckId = localStorage.getItem('deckId');
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`

  let player1Val = 0;
  let player2Val = 0;

  let player1Card = '';
  let player2Card = '';

  let player1Pile = 'pile1';
  let player2Pile = 'pile2';

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
      //NEED TO ADD 26 CARDS TO EACH PLAYER PILE. Iterate through data.cards[index].code
      
      // Assign the cards to each player and show cards -- need to get card value
        document.getElementById('player1').src = data.cards[0].image
        document.getElementById('player2').src = data.cards[1].image
        //got card values, got card codes
        player1Val = convertToNum(data.cards[0].value)
        player1Card = data.cards[0].code;
        console.log(`player1 card value is ${player1Val}`)
        // got card values, got card codes
        player2Val = convertToNum(data.cards[1].value)
        player2Card = data.cards[1].code;
        console.log(`player2 card value is ${player2Val}`)
        
        //the game; checking conditions
        if (player1Val > player2Val) {
          document.querySelector('.winStatement').innerText = 'Player 1 wins!'
          //start a pile; add cards to pile.
          fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${player1Pile}/add/?cards=${player1Card},${player2Card}`)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              console.log(data)
            });
          // list cards in pile
          fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${player1Pile}/list/`)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              console.log(data)
            });

        } else if (player1Val < player2Val) {
          document.querySelector('.winStatement').innerText = 'Player 2 wins!'
          //start pile; add cards to pile.
          fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${player2Pile}/add/?cards=${player1Card},${player2Card}`)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              console.log(data)
            });
          // list cards in pile
          fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/${player2Pile}/list/`)
            .then(res => res.json()) // parse response as JSON
            .then(data => {
              console.log(data)
            });

        } else if (player1Val == player2Val){
          document.querySelector('.winStatement').innerText = 'War!'
          // Code to enact war actions (3 cards from each player's deck aside, each player draws again and compares 2 drawn cards. Winner gets all cards.)
            
        } 
      });
}
//push to get it working, store information on browser so you can come back and keep playing, card game called 'war'. Playing against each other, both players draw cards. Want to compare cards, higher card wins. Same cards? --> both players put up 3 cards, flip 4th. Winner of 4th flip wins all 8 cards from there. 
//make sure always using the same deck. *use local storage to store the deck id*
  //check if there IS a deck id. if not, get new deck, if there is, do nothing  -- DONE

//Steps: fetch the deck of cards, store that deck ID in global variable, click button to use a function that draws 2 cards. Assign cards to each player -- DONE

function convertToNum(val) {
  if(val ==='ACE'){
    return 14
  } else if(val ==='KING'){
    return 13
  } else if (val === 'QUEEN'){
    return 12
  } else if (val === 'JACK'){
    return 11
  } else {
    return Number(val);
  }
}