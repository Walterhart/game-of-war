// Variable Declarations
const imageContainer = document.getElementById("image-cards");
const newDeckBtn = document.getElementById("new-deck");
const drawBtn = document.getElementById("draw-cards");
const winnerHTMLText = document.getElementById("winner-message");
const remainingCardsText = document.getElementById("remaining-cards");
const computerScoreText = document.getElementById("computer-score");
const playerScoreText = document.getElementById("player-score");
const restartGameBtn = document.getElementById("restart-game");

let deckId;

let scoreBored = {
  Computer: 0,
  Player: 0,
};

// Function to handle the restart game functionality
const handleRestartGame = () => {
  newDeckBtn.classList.remove("hidden");
  restartGameBtn.classList.add("hidden");
  winnerHTMLText.innerText = "Game of War";
  remainingCardsText.textContent = "";
  computerScoreText.textContent = "";
  playerScoreText.textContent = "";
  scoreBored = {
    Computer: 0,
    Player: 0,
  };
};

// Function to determine the winner based on the card values
const determineWinner = (cpuCard, playerCard) => {
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
    JACK: 11,
    QUEEN: 12,
    KING: 13,
    ACE: 14,
  };
  const cpuCardValue = cardValues[cpuCard];
  const playerCardValue = cardValues[playerCard];
  if (cpuCardValue < playerCardValue) {
    scoreBored["Player"]++;
    playerScoreText.innerText = `My score: ${scoreBored["Player"]}`;
    return `Player Wins the Round!`;
  } else if (cpuCardValue > playerCardValue) {
    scoreBored["Computer"]++;
    computerScoreText.innerText = `Computer score: ${scoreBored["Computer"]}`;
    return `Computer Wins the Round!`;
  } else {
    return `WAR!`;
  }
};

// Function to display images of cards on the UI
const getImage = (deck) => {
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

// Function to handle drawing cards from the deck
const handleDrawCards = async () => {
  if (!deckId) {
    return;
  }
  try {
    const res = await fetch(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    );
    const data = await res.json();

    getImage(data);
    const cpuCard = data.cards[0].value;
    const playerCard = data.cards[1].value;
    const winnerMessage = determineWinner(cpuCard, playerCard);
    remainingCardsText.textContent = `Remaining Cards:  ${data.remaining}`;
    winnerHTMLText.textContent = winnerMessage;
    if (data.remaining === 0) {
      drawBtn.disabled = true;
      if (scoreBored["Computer"] < scoreBored["Player"]) {
        winnerHTMLText.innerText = `Congratulation You Win!`;
      } else if (scoreBored["Computer"] > scoreBored["Player"]) {
        winnerHTMLText.innerText = `Better Luck Next Time, You Lose!`;
      } else {
        winnerHTMLText.innerText = `WAR`;
      }
      restartGameBtn.classList.remove("hidden");
    }
  } catch (error) {
    console.error(error);
  }
};

// Function to handle creating a new deck
const handleNewDeck = async () => {
  try {
    const res = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const data = await res.json();

    drawBtn.disabled = false;
    remainingCardsText.textContent = `Remaining Cards:  ${data.remaining}`;
    deckId = data.deck_id;
    newDeckBtn.classList.add("hidden");
  } catch (error) {
    console.error(error);
  }
};

restartGameBtn.addEventListener("click", handleRestartGame);
drawBtn.addEventListener("click", handleDrawCards);
newDeckBtn.addEventListener("click", handleNewDeck);
