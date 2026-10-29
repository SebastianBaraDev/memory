import "../styles/main.scss";
import { getHomeTemplate } from "./home-template";
import { getSettingsTemplate } from "./settings-template";
import { initSettingsInputs } from "./settings";
import { getGameTemplate } from "./game-template";
import { renderBoard } from "./game";
import { renderScreen } from "./utils";

/**
 * Initializes the play button functionality.
 */
function initPlayButton(): void {
  const playButton = document.querySelector(
    ".home__play-button",
  ) as HTMLElement | null;
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

renderScreen(getHomeTemplate());
initPlayButton();

/**
 * Initialize the start button functionality.
 */
function initStartButton(): void {
  const startButton = document.querySelector(
    ".settings__start-button",
  ) as HTMLButtonElement | null;
  if (!startButton){
    console.error("Start button not found");
    return;
  }
  startButton.addEventListener("click", () => {
    renderScreen(getGameTemplate());
    renderBoard();
  });
}
