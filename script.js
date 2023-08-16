const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");
const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");

let answer, noOfGuesses, guessedNumsArr;

const play = () => {
  const userGuess = guessInput.value;
  if (userGuess < 0 || userGuess > 100 || isNaN(userGuess)) {
    alert("Insira um número válido entre 0 e 100.");
    return;
  }
  guessedNumsArr.push(userGuess);
  noOfGuesses += 1;
  if (userGuess != answer) {
    if (userGuess < answer) {
      hint.innerHTML = "Muito baixo. Tente novamente!";
    } else {
      hint.innerHTML = "Muito alto. Tente novamente!";
    }
    noOfGuessesRef.innerHTML = `<span>Nº de palpites:</span> ${noOfGuesses}`;
    guessedNumsRef.innerHTML = `<span>Os números adivinhados são: </span>${guessedNumsArr.join(
      ", "
    )}`;
    hint.classList.remove("error");
    setTimeout(() => {
      hint.classList.add("error");
    }, 10);
  } else {
    hint.innerHTML = `Parabéns!<br>O número era <span>${answer}</span>.<br>Você adivinhou o número em <span>${noOfGuesses} </span>tentativos.`;
    hint.classList.add("success");
    game.style.display = "none";
    restartButton.style.display = "block";
  }
};

const init = () => {
  console.log("Game Started");
  answer = Math.floor(Math.random() * 100) + 0;
  console.log(answer);
  noOfGuesses = 0;
  guessedNumsArr = [];
  noOfGuessesRef.innerHTML = "Nº de palpites: 0";
  guessedNumsRef.innerHTML = "Os números adivinhados são: Nenhum";
  guessInput.value = "";
  hint.classList.remove("success", "error");
};

guessInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    play();
  }
});

restartButton.addEventListener("click", () => {
  game.style.display = "grid";
  restartButton.style.display = "none";
  hint.innerHTML = "";
  hint.classList.remove("success");
  init();
});

checkButton.addEventListener("click", play);
window.addEventListener("load", init);