const value = document.querySelectorAll(".box");
const info = document.querySelector(".info");
const reset = document.querySelector(".reset");

let results;
let currentPlayer;
let gameState;

const defaultResults = () => {
  results = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameState = true;
};

const resetGameButton = () => {
  defaultResults();

  value.forEach((value) => {
    value.classList.remove("box-choose-X", "box-choose-O");
  });

  info.innerText = "Zrestowałeś gre.";
};

reset.addEventListener("click", resetGameButton);

const resultFull = () => {
  return results.find((results) => results === "") === undefined;
};

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];

const checkGame = () => {
  let gameEnd = false;
  for (let i = 0; i <= 7; i++) {
    const [idA, idB, idC] = win[i];
    const val1 = results[idA];
    const val2 = results[idB];
    const val3 = results[idC];

    if (val1 === val2 && val1 === val3 && val1 !== "") {
      gameEnd = true;
      break;
    }
  }
  if (gameEnd) {
    gameState = false;
    info.innerText = `Wygrał ${currentPlayer}!`;
  } else if (resultFull()) {
    gameState = false;
    info.innerText = `Remis!`;
  }
};

defaultResults();
value.forEach((value) => {
  value.addEventListener("click", (e) => {
    const { id } = e.target.dataset;

    if (gameState && results[id] === "") {
      results[id] = currentPlayer;
      e.target.classList.add(`box-choose-${currentPlayer}`);
      checkGame();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});
