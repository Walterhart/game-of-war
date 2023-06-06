// Variable Declarations
const imageContainer = document.getElementById("image-cards");
const newDeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const winnerHTMLText= document.getElementById("winner-message")
const reamingCardsText = document.getElementById("remaining-cards")
const computerScoreText =document.getElementById("computer-score")
const playerScoreText =document.getElementById("player-score")

let deckId;

let scoreBored = {
    "Computer": 0,
    "Player": 0
  };
  
 
const determineWinner = (cpuCard, playerCard) =>{
    const cardValues = {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        "JACK": 11,
        "QUEEN": 12,
        "KING": 13,
        "ACE": 14
    };
    const cpuCardValue = cardValues[cpuCard]
    const playerCardValue = cardValues[playerCard]
    if( cpuCardValue<playerCardValue){
        scoreBored["Player"]++;
        playerScoreText.innerText= `My score: ${scoreBored["Player"]}`
        return  `Player Wins the Round!`
    }
    else if(  cpuCardValue>playerCardValue){
        scoreBored["Computer"]++;
        computerScoreText.innerText= `Computer score: ${scoreBored["Computer"]}`
        return `Computer Wins the Round!`
    }
    else{
         return `WAR!`
    }

}

const handleDrawCards = () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      getImage(data);
      const cpuCard = data.cards[0].value;
      const playerCard = data.cards[1].value;
      const winnerMessage=determineWinner(cpuCard, playerCard);
      reamingCardsText.textContent =`Remaining Cards:  ${data.remaining}`
      winnerHTMLText.textContent=winnerMessage;
      if(data.remaining === 0){
        drawBtn.disabled = true
        if (scoreBored["Computer"]< scoreBored["Player"]) {
          winnerHTMLText.innerText =`Congratulation You Win!`
        } else if (scoreBored["Computer"]>scoreBored["Player"]) {
            winnerHTMLText.innerText =`Better Luck Next Time, You Lose!`
        } else {
            winnerHTMLText.innerText =`WAR`
        }
      }
    });
};

const handleNewDeck = () => {
  fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((data) => {
      reamingCardsText.textContent =`Remaining Cards:  ${data.remaining}`
      console.log(data);
      deckId = data.deck_id;
    });
};

const getImage = (deck) => {
  console.log(deck);
  const cardSlotsHTML = deck.cards.map(
    (card) => `
      <img src="${card.image}" class="card" />
  `
  );
  
  const cardSlots = imageContainer.children;

  cardSlotsHTML.forEach((html, index) => {
    cardSlots[index].innerHTML = html;
  });
};

drawBtn.addEventListener("click", handleDrawCards);
newDeckBtn.addEventListener("click", handleNewDeck);
