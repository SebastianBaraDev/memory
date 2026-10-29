import { getSettings } from "./settings";
import { getCardTemplate, getGameTemplate } from "./game-template";
import { GameState } from "./types";
import { renderScreen, setText } from "./utils";
import { getGameOverTemplate } from "./game-over-template";

const CARDS_PER_PAIR = 2;
const FLIP_BACK_DELAY = 1000;
const GAME_OVER_DELAY = 1500;

const gameState: GameState = {
  flippedCards: [],
  isBoardLocked: false,
  currentPlayer: "blue",
  scores: { blue: 0, orange: 0 },
};

/**
 * Creates a card deck with 16, 24 or 36 Card. Each card is double.
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
 * Initializes the card flip functionality.
 */
function initCards(): void {
  const cards = document.querySelectorAll<HTMLElement>(".card");

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      handleCardClick(card);
    });
  });
}

/**
 * Checks if board is blocked an card is already flipped. Flip card if is not flipped.
 * @param card - The clicked card element.
 */
function handleCardClick(card: HTMLElement): void {
  if (gameState.isBoardLocked) return;
  if (card.classList.contains("is-flipped")) return;

  card.classList.add("is-flipped");
  gameState.flippedCards.push(card);

  if (gameState.flippedCards.length === CARDS_PER_PAIR) {
    checkForMatch();
  }
}

/**
 * Checks it the 2 flipped cards match each other. If so the current player get a Point and turns again. If not the cards flipped back.
 */
function checkForMatch(): void {
  const [firstCard, secondCard] = gameState.flippedCards;
  if (firstCard.dataset.motif === secondCard.dataset.motif) {
    handleMatch();
  } else {
    handleMismatch();
  }
}

/**
 * Checks if the 2 flipped cards match each other. If so the current Player get a Point.
 */
function handleMatch(): void {
  gameState.flippedCards.forEach((card) => {
    card.classList.add("is-matched");
  });
  gameState.scores[gameState.currentPlayer]++;
  updateHeader();
  if (isGameOver()) {
    setTimeout(() => {
      showGameOver();
    }, GAME_OVER_DELAY);
  }
  resetTurn();
}

/**
 * Checks if the 2 flipped cards dismatch. If so the cards flipped back.
 */
function handleMismatch(): void {
  gameState.isBoardLocked = true;
  setTimeout(() => {
    gameState.flippedCards.forEach((card) => {
      card.classList.remove("is-flipped");
    });
    switchPlayer();
    updateHeader();
    resetTurn();
  }, FLIP_BACK_DELAY);
}

/**
 * Resets the flipped cards after every turn, if they don't match
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
 * Changes between the two Player Blue and Orange after there turn.
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

  const icon = document.querySelector<HTMLImageElement>(
    ".gameboard-header__current-player-icon",
  );
  if (!icon) return;
  const theme = getSettings().theme;
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
  renderScreen(getGameOverTemplate(blueScore, orangeScore));
}