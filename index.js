// Variable Declarations
const imageContainer = document.getElementById("image-cards");
const newDeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const winnerHTMLText= document.getElementById("winner-message")
let deckId;
 
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
        return `Computer Wins the Round!`
    }
    else if(  cpuCardValue>playerCardValue){
        return `Player Wins the Round!`
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
      winnerHTMLText.textContent=winnerMessage;
    });
};

const handleNewDeck = () => {
  fetch("https://deckofcardsapi.com/api/deck/new/")
    .then((res) => res.json())
    .then((data) => {
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
