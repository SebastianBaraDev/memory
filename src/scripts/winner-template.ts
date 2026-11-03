/** The only theme that says "Back to start", all others say "Home" (from Figma). */
const BACK_TO_START_THEME = "theme-1";

/** From this screen width on, the long confetti strip is shown (widescreen). */
const WIDESCREEN_MEDIA = "(min-width: 1440px)";

/**
 * Returns the text of the button that leads back to the home screen.
 * @param theme - The selected theme folder, e.g. "theme-1".
 * @returns "Back to start" for Code vibes, "Home" for all other themes.
 */
function getHomeButtonText(theme: string): string {
  if (theme === BACK_TO_START_THEME) return "Back to start";
  return "Home";
}

/**
 * Returns the HTML template for the winner screen.
 * @param winner - The winning player: "blue" or "orange".
 * @param theme - The selected theme folder, e.g. "theme-1".
 * @returns The HTML template for the winner screen.
 */
export function getWinnerTemplate(winner: string, theme: string): string {
  return `
    <section class="result" data-winner="${winner}">
      <picture class="result__confetti">
        <source media="${WIDESCREEN_MEDIA}" srcset="/img/icons/confetti-big.svg">
        <img src="/img/icons/confetti-small.svg" alt="">
      </picture>
      <p class="result__subtitle">The winner is</p>
      <h1 class="result__title">${winner} Player</h1>
      <img src="/img/${theme}/winner-${winner}.svg" class="result__icon" alt="Winner icon">
      <button class="result__btn">${getHomeButtonText(theme)}</button>
    </section>
  `;
}

/**
 * Returns the HTML template for the draw screen.
 * @param theme - The selected theme folder, e.g. "theme-1".
 * @returns The HTML template for the draw screen.
 */
export function getDrawTemplate(theme: string): string {
  return `
    <section class="result" data-winner="draw">
      <p class="result__subtitle">It's a</p>
      <h1 class="result__title">Draw</h1>
      <img src="/img/${theme}/draw.svg" class="result__icon" alt="Draw scale">
      <button class="result__btn">${getHomeButtonText(theme)}</button>
    </section>
  `;
}
