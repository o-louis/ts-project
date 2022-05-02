// import { Result, Role, RPSEnum } from '../enums/rpsEnum';
import type { RPS } from '../types/RPS';

// Enums
export enum RPSEnum {
  Rock = 'rock',
  Paper = 'paper',
  Scissors = 'scissors',
}

export enum RPSEmojiEnum {
  rock = '✊',
  paper = '🤚',
  scissors = '✌️',
}

export enum Result {
  Draw = 'Draw',
  Win = 'You win!',
  Lose = 'You lose!',
}

export enum Role {
  Null,
  User = 'user',
  Computer = 'computer',
}

// Data
const rpsActions = document.querySelectorAll<HTMLLIElement>('.actions li');
const userResult =
  document.querySelector<HTMLParagraphElement>('.user .result');
const computerResult =
  document.querySelector<HTMLParagraphElement>('.computer .result');
const winnerContainer = document.querySelector<HTMLParagraphElement>('.winner');

// Methods
const play = (action: HTMLLIElement): void => {
  const userChoice = <RPS>action.dataset.action;
  const computerChoice: RPS = getComputerChoice();
  const winner: Role = compareChoices(userChoice, computerChoice);
  showResult(userChoice, computerChoice, winner);
};

const compareChoices = (userChoice: RPS, computerChoice: RPS): Role => {
  if (userChoice === computerChoice) return Role.Null;
  switch (userChoice) {
    case RPSEnum.Rock:
      return computerChoice === RPSEnum.Scissors ? Role.User : Role.Computer;
    case RPSEnum.Paper:
      return computerChoice === RPSEnum.Rock ? Role.User : Role.Computer;
    case RPSEnum.Scissors:
      return computerChoice === RPSEnum.Paper ? Role.User : Role.Computer;
    default:
      throw new Error('Invalid choice');
  }
};

const showResult = (
  userChoice: RPS,
  computerChoice: RPS,
  winner: Role
): void => {
  if (!userResult) return;
  if (!computerResult) return;
  if (!winnerContainer) return;

  if (winner === Role.Null) {
    winnerContainer.textContent = Result.Draw;
  } else if (winner === Role.User) {
    winnerContainer.textContent = Result.Win;
  } else {
    winnerContainer.textContent = Result.Lose;
  }

  userResult.textContent = RPSEmojiEnum[userChoice];
  computerResult.textContent = RPSEmojiEnum[computerChoice];
};

const getComputerChoice = (): RPSEnum => {
  const index = Math.floor(Math.random() * Object.keys(RPSEnum).length);
  return Object.values(RPSEnum)[index];
};

// Events
rpsActions.forEach((action: HTMLLIElement) => {
  action.addEventListener('click', () => play(action));
});
