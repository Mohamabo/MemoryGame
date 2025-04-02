const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let flippedCards = [];
let matchedCards = [];
let canClick = true;

function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  const card = event.target;
 
  if (!canClick || matchedCards.includes(card) || flippedCards.includes(card) || flippedCards.length >= 2) {
    return;
  }

  card.style.backgroundColor = card.className;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    canClick = false;
    if (flippedCards[0].className === flippedCards[1].className && flippedCards[0] !== flippedCards[1]) {
      matchedCards.push(flippedCards[0], flippedCards[1]);
      flippedCards = [];
      canClick = true;
    } else {
      setTimeout(() => {
        flippedCards[0].style.backgroundColor = "";
        flippedCards[1].style.backgroundColor = "";
        flippedCards = [];
        canClick = true;
      }, 1000);
    }
  }

  console.log("Card clicked:", card, "Background color set to: ", card.className);
  
  console.log("Flipped cards:", flippedCards);
}

// when the DOM loads
createDivsForColors(shuffledColors);
