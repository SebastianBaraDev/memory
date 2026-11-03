/**
 * Builds the game over screen with the final scores.
 * @param blueScore - Final score of the blue player.
 * @param orangeScore - Final score of the orange player.
 * @param theme - The selected theme folder, e.g. "theme-1".
 * @returns The HTML of the game over screen.
 */
export function getGameOverTemplate(blueScore: number, orangeScore: number, theme: string): string {
  return `
    <section class="game-over">
      <h1 class="game-over__title">Game over</h1>
      <p class="game-over__subtitle">Final Score</p>
      <section class="game-over__score-board">
        <div class="game-over__player-score">
          <img src="/img/${theme}/blue-player-icon.svg" alt="">
          <p class="game-over__blue-player-score"><span class="game-over__player-name">Blue </span><span>${blueScore}</span></p>
        </div>
        <div class="game-over__player-score">
          <img src="/img/${theme}/orange-player-icon.svg" alt="">
          <p class="game-over__orange-player-score"><span class="game-over__player-name">Orange </span><span>${orangeScore}</span></p>
        </div>
      </section>
    </section>
  `;
}
