
const imageContainer = document.getElementById("image-cards");
const newDeckBtn =document.getElementById("new-deck")
const drawBtn =document.getElementById("draw-cards")
let deckId
function getNewDeck() {
  fetch("https://deckofcardsapi.com/api/deck/new/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      deckId = data.deck_id;
    });
}

function getImage(deck) {
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
}

newDeckBtn.addEventListener("click", getNewDeck);

drawBtn.addEventListener("click", () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      getImage(data);
    });
});
