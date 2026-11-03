import "../styles/main.scss";
import { getHomeTemplate } from "./home-template";
import { getSettingsTemplate } from "./settings-template";
import { getSettings, initSettingsInputs, resetSettings } from "./settings";
import { getGameTemplate } from "./game-template";
import { renderBoard, stopGame } from "./game";
import { getDialogTexts, renderScreen } from "./utils";

/**
 * Starts the app: shows the home screen and adds the listeners
 * that are needed on every screen.
 */
function init(): void {
  showHome();
  initBackToStart();
}

/**
 * Initializes the play button functionality.
 */
function initPlayButton(): void {
  const playButton = document.querySelector<HTMLButtonElement>(".home__play-button");
  if (!playButton) {
    console.error("Play button not found");
    return;
  }
  playButton.addEventListener("click", () => {
    showSettings();
  });
}

/**
 * Shows the settings screen. Settings that are still saved
 * (e.g. after leaving a game) are preselected.
 */
function showSettings(): void {
  renderScreen(getSettingsTemplate());
  initSettingsInputs();
  initStartButton();
}

/**
 * Initializes the start button functionality.
 */
function initStartButton(): void {
  const startButton = document.querySelector<HTMLButtonElement>(".settings__start-button");
  if (!startButton) {
    console.error("Start button not found");
    return;
  }
  startButton.addEventListener("click", () => {
    startGame();
  });
}

/**
 * Applies the selected theme and renders the game screen with its listeners.
 */
function startGame(): void {
  const theme = getSettings().theme;
  if (!theme) return;
  document.body.dataset.theme = theme;
  renderScreen(getGameTemplate(theme, getDialogTexts(theme)));
  initExitButton();
  initDialogBackButton();
  renderBoard();
}

/**
 * Listens for clicks on the exit button in the dialog and on the
 * "Back to start" / "Home" button of the result screen (event delegation).
 */
function initBackToStart(): void {
  const screen = document.getElementById("screen");
  if (!screen) return;
  screen.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest(".exit-dialog__exit-btn")) {
      leaveGame();
    } else if (target.closest(".result__btn")) {
      showHome();
    }
  });
}

/**
 * Stops the running game and removes its theme from the page.
 */
function endGame(): void {
  stopGame();
  delete document.body.dataset.theme;
}

/**
 * Leaves the running game and goes back to the settings screen,
 * where the settings of this game are still selected.
 */
function leaveGame(): void {
  endGame();
  showSettings();
}

/**
 * Ends the game and shows the home screen with empty settings.
 */
function showHome(): void {
  endGame();
  resetSettings();
  renderScreen(getHomeTemplate());
  initPlayButton();
}

/**
 * Opens the exit dialog when the exit button is clicked.
 */
function initExitButton(): void {
  const exitButton = document.querySelector<HTMLButtonElement>(".gameboard-header__exit-btn");
  if (!exitButton) {
    console.error("Exit button not found");
    return;
  }
  exitButton.addEventListener("click", () => {
    openExitDialog();
  });
}

/**
 * Opens the exit dialog.
 */
function openExitDialog(): void {
  const dialog = document.querySelector<HTMLDialogElement>(".exit-dialog");
  if (!dialog) {
    console.error("Dialog not found");
    return;
  }
  dialog.showModal();
}

/**
 * Closes the exit dialog.
 */
function closeExitDialog(): void {
  const dialog = document.querySelector<HTMLDialogElement>(".exit-dialog");
  if (!dialog) {
    console.error("Dialog not found");
    return;
  }
  dialog.close();
}

/**
 * Closes the exit dialog when the back button is clicked.
 */
function initDialogBackButton(): void {
  const backButton = document.querySelector<HTMLButtonElement>(".exit-dialog__back-btn");
  if (!backButton) {
    console.error("Back button not found");
    return;
  }
  backButton.addEventListener("click", () => {
    closeExitDialog();
  });
}

document.addEventListener("DOMContentLoaded", init);
