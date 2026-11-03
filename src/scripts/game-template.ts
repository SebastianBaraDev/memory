import { DialogTexts } from "./types";

/**
 * Returns the HTML template for the game screen.
 * @param theme - The selected theme folder, e.g. "theme-1".
 * @param dialogTexts - The button texts of the exit dialog.
 * @returns The HTML template for the game screen.
 */
export function getGameTemplate(theme: string, dialogTexts: DialogTexts): string {
  return `
    <header class="gameboard-header">
      <h1 class="visually-hidden">Memory game</h1>
      <section class="gameboard-header__score-board">
        <div class="gameboard-header__player-score">
          <img src="/img/${theme}/blue-player-icon.svg" alt="">
          <p class="gameboard-header__blue-player-score"><span class="gameboard-header__player-name">Blue </span><span id="player-blue" class="gameboard-header__score">0</span></p>
        </div>
        <div class="gameboard-header__player-score">
          <img src="/img/${theme}/orange-player-icon.svg" alt="">
          <p class="gameboard-header__orange-player-score"><span class="gameboard-header__player-name">Orange </span><span id="player-orange" class="gameboard-header__score">0</span></p>
        </div>
      </section>
      <section class="gameboard-header__current-player">
        <p>Current player:</p>
        <span class="gameboard-header__current-player-box" data-player="blue">
          <img src="/img/${theme}/blue-player-icon.svg" class="gameboard-header__current-player-icon" alt="Blue Player">
        </span>
      </section>
      <button class="gameboard-header__exit-btn"><img src="/img/${theme}/exit-icon.svg" class="gameboard-header__btn-exit-icon" alt="">Exit game</button>
    </header>

    <section class="board" id="board">
    </section>

    <dialog class="exit-dialog">
      <p class="exit-dialog__question">Are you sure you want to quit the game?</p>
      <div class="exit-dialog__btn-box">
        <button class="exit-dialog__back-btn">${dialogTexts.back}</button>
        <button class="exit-dialog__exit-btn">${dialogTexts.exit}</button>
      </div>
    </dialog>
  `;
}

/**
 * Returns the HTML template for one card.
 * @param motif - The motif number of the card.
 * @param theme - The selected theme folder, e.g. "theme-1".
 * @returns The HTML template for one card.
 */
export function getCardTemplate(motif: number, theme: string): string {
  return `
    <div class="card" data-motif="${motif}">
      <img src="/img/${theme}/card-back.svg" alt="card back" class="card__back-face card__image">
      <img src="/img/${theme}/card-${motif}.svg" alt="card front" class="card__front-face card__image">
    </div>
  `;
}
