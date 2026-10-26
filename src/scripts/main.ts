import "../styles/main.scss";
import { getHomeTemplate } from "./home-template";
import { getSettingsTemplate } from "./settings-template";
import { getSettings, initSettingsInputs } from "./settings";
import { getGameTemplate } from "./game-template";

/**
 * Initializes the card flip functionality.
 */
function initCardFlip(): void {
  const card = document.querySelector(".card") as HTMLElement | null;
  if (!card) {
    console.error("Card element not found");
    return;
  }
  card.addEventListener("click", () => {
    card.classList.toggle("is-flipped");
  });
}

/**
 * Renders the provided template into the screen element.
 * @param template - The HTML template to render.
 */
function renderScreen(template: string): void {
  const screen = document.getElementById("screen");
  if (!screen) {
    console.error("Site not found");
    return;
  }
  screen.innerHTML = template;
}

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
  ) as HTMLAnchorElement | null;
  if (!startButton){
    console.error("Start button not found");
    return;
  }
  startButton.addEventListener("click", () => {
    renderScreen(getGameTemplate());
    console.log(getSettings());
  });
}
