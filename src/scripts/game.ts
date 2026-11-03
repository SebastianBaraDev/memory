import { getSettings } from "./settings";
import { getCardTemplate } from "./game-template";
import { GameState } from "./types";
import { getHomeButtonText, renderScreen, setText } from "./utils";
import { getGameOverTemplate } from "./game-over-template";
import { getDrawTemplate, getWinnerTemplate } from "./winner-template";
import { Card } from "./card";
import { TimerManager } from "./timer-manager";

const CARDS_PER_PAIR = 2;
const FLIP_BACK_DELAY = 1000;
const GAME_OVER_DELAY = 1500;
const RESULT_DELAY = 3000;

const gameState: GameState = {
  flippedCards: [],
  isBoardLocked: false,
  currentPlayer: "blue",
  scores: { blue: 0, orange: 0 },
};

/** All running timers of the game, so they can be stopped when the game is left. */
const timers = new TimerManager();

/**
 * Creates a card deck where every motif number appears twice.
 * @param boardSize - The number of cards: 16, 24 or 36.
 * @returns The motif numbers of all cards (not shuffled yet).
 */
export function createDeck(boardSize: number): number[] {
  const numbers: number[] = [];
  const pairCount = boardSize / CARDS_PER_PAIR;
  for (let i = 1; i <= pairCount; i++) {
    numbers.push(i, i);
  }
  return numbers;
}

/**
 * Shuffles an array randomly (Fisher-Yates algorithm).
 * @param deck - The cards to shuffle.
 * @returns A new, shuffled array.
 */
export function shuffleDeck(deck: number[]): number[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }
  return shuffled;
}

/**
 * Starts a new game: resets the game state and renders the shuffled cards
 * in the selected board size and theme.
 */
export function renderBoard(): void {
  const settings = getSettings();
  const theme = settings.theme;
  if (!settings.boardSize || !theme || !settings.player) return;
  resetGameState(settings.player);
  const deck = shuffleDeck(createDeck(settings.boardSize));
  const board = document.querySelector<HTMLElement>(".board");
  if (!board) return;

  board.innerHTML = getCardsHtml(deck, theme);
  board.classList.add(`board--${settings.boardSize}`);
  initCards();
  updateHeader();
}

/**
 * Stops all running timers of the game, e.g. when the player leaves it.
 * Otherwise an old timer could change the next game.
 */
export function stopGame(): void {
  timers.stopAll();
}

/**
 * Builds the HTML for all cards of a deck.
 * @param deck - The shuffled motif numbers.
 * @param theme - The selected theme folder, e.g. "theme-1".
 * @returns The HTML of all cards as one string.
 */
function getCardsHtml(deck: number[], theme: string): string {
  let html = "";
  deck.forEach((motif) => {
    html += getCardTemplate(motif, theme);
  });
  return html;
}

/**
 * Creates a Card object for every card element and makes it clickable.
 */
function initCards(): void {
  const cardElements = document.querySelectorAll<HTMLElement>(".card");

  cardElements.forEach((element) => {
    const card = new Card(element);
    card.onClick(() => {
      handleCardClick(card);
    });
  });
}

/**
 * Flips the clicked card, unless the board is locked or the card is already open.
 * @param card - The clicked card.
 */
function handleCardClick(card: Card): void {
  if (gameState.isBoardLocked) return;
  if (card.isFlipped()) return;

  card.flip();
  gameState.flippedCards.push(card);

  if (gameState.flippedCards.length === CARDS_PER_PAIR) {
    checkForMatch();
  }
}

/**
 * Checks if the two flipped cards show the same motif.
 */
function checkForMatch(): void {
  const [firstCard, secondCard] = gameState.flippedCards;
  if (firstCard.matches(secondCard)) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

/**
 * Handles a found pair: marks the cards, gives the current player a point
 * and shows the game over screen after the last pair.
 */
function handleMatch(): void {
  gameState.flippedCards.forEach((card) => {
    card.markMatched();
  });
  gameState.scores[gameState.currentPlayer]++;
  updateHeader();
  if (isGameOver()) {
    timers.start(() => {
      showGameOver();
    }, GAME_OVER_DELAY);
  }
  resetTurn();
}

/**
 * Handles a wrong pair: flips the cards back and switches the player.
 */
function handleMismatch(): void {
  gameState.isBoardLocked = true;
  timers.start(() => {
    gameState.flippedCards.forEach((card) => {
      card.flipBack();
    });
    switchPlayer();
    updateHeader();
    resetTurn();
  }, FLIP_BACK_DELAY);
}

/**
 * Resets the flipped cards and unlocks the board after every turn.
 */
function resetTurn(): void {
  gameState.flippedCards = [];
  gameState.isBoardLocked = false;
}

/**
 * Resets the game state for a new game.
 * @param startPlayer - The player who starts.
 */
function resetGameState(startPlayer: string): void {
  gameState.flippedCards = [];
  gameState.isBoardLocked = false;
  gameState.currentPlayer = startPlayer;
  gameState.scores = { blue: 0, orange: 0 };
}

/**
 * Switches between the players blue and orange after a wrong pair.
 */
function switchPlayer(): void {
  if (gameState.currentPlayer === "blue") {
    gameState.currentPlayer = "orange";
  } else {
    gameState.currentPlayer = "blue";
  }
}

/**
 * Updates scores and the current player icon in the header.
 */
function updateHeader(): void {
  setText("player-blue", String(gameState.scores.blue));
  setText("player-orange", String(gameState.scores.orange));
  updateCurrentPlayerIcon();
}

/**
 * Shows the icon of the current player and marks its box with the player
 * (the box color is set per theme in _themes.scss).
 */
function updateCurrentPlayerIcon(): void {
  const box = document.querySelector<HTMLElement>(".gameboard-header__current-player-box");
  const icon = document.querySelector<HTMLImageElement>(".gameboard-header__current-player-icon");
  if (!box || !icon) return;
  const theme = getSettings().theme;
  box.dataset.player = gameState.currentPlayer;
  icon.src = `/img/${theme}/${gameState.currentPlayer}-player-icon.svg`;
  icon.alt = `${gameState.currentPlayer} player`;
}

/**
 * Checks if all pairs have been found.
 * @returns true if the game is over.
 */
function isGameOver(): boolean {
  const size = getSettings().boardSize;
  if (size === null) return false;
  const pairCount = size / CARDS_PER_PAIR;
  const foundPairs = gameState.scores.blue + gameState.scores.orange;
  return pairCount === foundPairs;
}

/**
 * Shows the game over screen with the final scores.
 */
function showGameOver(): void {
  const blueScore = gameState.scores.blue;
  const orangeScore = gameState.scores.orange;
  const theme = getSettings().theme;
  if (!theme) return;
  renderScreen(getGameOverTemplate(blueScore, orangeScore, theme));
  timers.start(() => {
    showResult();
  }, RESULT_DELAY);
}

/**
 * Finds out which player has won or if it is a draw.
 * @returns "blue", "orange" or "draw".
 */
function getWinner(): string {
  if (gameState.scores.blue > gameState.scores.orange) {
    return "blue";
  }
  if (gameState.scores.orange > gameState.scores.blue) {
    return "orange";
  }
  return "draw";
}

/**
 * Shows the winner or the draw screen at the end of the game.
 */
function showResult(): void {
  const winner = getWinner();
  const theme = getSettings().theme;
  if (!theme) return;
  const buttonText = getHomeButtonText(theme);
  if (winner === "draw") {
    renderScreen(getDrawTemplate(theme, buttonText));
    return;
  }
  renderScreen(getWinnerTemplate(winner, theme, buttonText));
}
