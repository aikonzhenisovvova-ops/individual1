"use strict";

// Игра «Камень, ножницы, бумага» — 3 раунда против компьютера.
// Rock-Paper-Scissors: 3 rounds against the computer.

// Массив вариантов
const choices = ["камень", "ножницы", "бумага"];

// Счёт
let playerScore = 0;
let computerScore = 0;

for (let round = 1; round <= 3; round++) {
  // Выбор игрока через prompt(); если ввод неверный — спрашиваем ещё раз
  let playerChoice = prompt("Раунд " + round + " из 3. Ваш выбор: камень, ножницы или бумага?");
  playerChoice = playerChoice === null ? "" : playerChoice.trim().toLowerCase();

  while (!choices.includes(playerChoice)) {
    playerChoice = prompt("Неверный ввод. Введите: камень, ножницы или бумага");
    playerChoice = playerChoice === null ? "" : playerChoice.trim().toLowerCase();
  }

  // Случайный индекс 0, 1 или 2 → выбор компьютера
  const randomIndex = Math.floor(Math.random() * choices.length);
  const computerChoice = choices[randomIndex];

  console.log("Раунд " + round + ": игрок — " + playerChoice + ", компьютер — " + computerChoice);

  // Определяем результат раунда
  if (playerChoice === computerChoice) {
    console.log("Ничья! Очки не начисляются.");
  } else if (
    (playerChoice === "камень" && computerChoice === "ножницы") ||
    (playerChoice === "ножницы" && computerChoice === "бумага") ||
    (playerChoice === "бумага" && computerChoice === "камень")
  ) {
    playerScore++;
    console.log("Вы выиграли раунд! +1 очко игроку.");
  } else {
    computerScore++;
    console.log("Компьютер выиграл раунд! +1 очко компьютеру.");
  }
}

// Итоговый счёт
console.log("Итоговый счёт — игрок: " + playerScore + ", компьютер: " + computerScore);

if (playerScore > computerScore) {
  console.log("Победитель игры: игрок!");
} else if (computerScore > playerScore) {
  console.log("Победитель игры: компьютер!");
} else {
  console.log("Итог: ничья!");
}
