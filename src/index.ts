import type { RPS } from '../types/RPS';

enum RPSEnum {
  Rock = 'rock',
  Paper = 'paper',
  Scissors = 'scissors',
}

enum Result {
  Draw = 'Draw',
  Win = 'You win!',
  Lose = 'You lose!',
}

// Data
const mainContainer = document.querySelector<HTMLElement>('main');
const playBtn = document.querySelector<HTMLButtonElement>('.btn-play');
const rpsActions = document.querySelectorAll<HTMLLIElement>('.actions li');

const userResult =
  document.querySelector<HTMLParagraphElement>('.user .result');
const computerResult =
  document.querySelector<HTMLParagraphElement>('.computer .result');
const winnerContainer = document.querySelector<HTMLParagraphElement>('.winner');

// Events
playBtn?.addEventListener('click', () => {
  mainContainer?.classList.remove('hide');
});

rpsActions.forEach((action) => {
  action.addEventListener('click', () => {
    const userAction: RPS = action.dataset.action as RPS;
    const computerAction: RPS = getRandomRPS();
    const result: Result | null = checkWinner(userAction, computerAction);
    displayResult(userAction, computerAction, result);
  });
});

// Methods
const checkWinner = (userAction: RPS, computerAction: RPS): Result | null => {
  if (userAction === computerAction) return Result.Draw;

  switch (userAction) {
    case RPSEnum.Rock:
      return computerAction === RPSEnum.Scissors ? Result.Win : Result.Lose;
    case RPSEnum.Paper:
      return computerAction === RPSEnum.Rock ? Result.Win : Result.Lose;
    case RPSEnum.Scissors:
      return computerAction === RPSEnum.Paper ? Result.Win : Result.Lose;
    default:
      return null;
  }
};

const displayResult = (
  userAction: RPS,
  computerAction: RPS,
  result: Result | null
): void => {
  if (userResult) userResult.textContent = userAction;
  if (computerResult) computerResult.textContent = computerAction;
  if (winnerContainer) winnerContainer.textContent = result;
};

const getRandomRPS = (): RPSEnum => {
  const index = Math.floor(Math.random() * Object.keys(RPSEnum).length);
  return Object.values(RPSEnum)[index];
};
