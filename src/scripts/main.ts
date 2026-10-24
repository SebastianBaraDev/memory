import "../styles/main.scss";
import { getHomeTemplate } from "./home-template";
import { getSettingsTemplate } from "./settings-template";
import { initSettingsInputs } from "./settings";

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

//initCardFlip();

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
