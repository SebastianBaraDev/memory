import "../styles/main.scss";
import { getHomeTemplate } from "./home-template";
import { getSettingsTemplate } from "./settings-template";
import { getSettings, initSettingsInputs, resetSettings } from "./settings";
import { getGameTemplate } from "./game-template";
import { renderBoard, stopGame } from "./game";
import { renderScreen } from "./utils";

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
    renderScreen(getSettingsTemplate());
    initSettingsInputs();
    initStartButton();
  });
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
  renderScreen(getGameTemplate(theme));
  initExitButton();
  initDialogBackButton();
  renderBoard();
}

/**
 * Listens for clicks on the "Back to start" / "Home" button or the exit button
 * in the dialog (event delegation) and goes back to the home screen.
 * After the exit button the settings of the game are kept.
 */
function initBackToStart(): void {
  const screen = document.getElementById("screen");
  if (!screen) return;
  screen.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.closest(".exit-dialog__exit-btn")) {
      showHome(true);
    } else if (target.closest(".result__btn")) {
      showHome(false);
    }
  });
}

/**
 * Stops the running game and shows the home screen without a selected theme.
 * @param keepSettings - true keeps the settings for the next game, false resets them.
 */
function showHome(keepSettings: boolean): void {
  stopGame();
  delete document.body.dataset.theme;
  renderScreen(getHomeTemplate());
  initPlayButton();
  if (!keepSettings) resetSettings();
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

renderScreen(getHomeTemplate());
initPlayButton();
initBackToStart();
