/**
 * Builds the game over screen with the final scores.
 * @param blueScore - Final score of the blue player.
 * @param orangeScore - Final score of the orange player.
 * @returns The HTML of the game over screen.
 */
export function getGameOverTemplate(blueScore: number, orangeScore: number): string {
  return `
    <section class="game-over">
      <h1 class="game-over__title">GAME OVER</h1>
      <p class="game-over__subtitle">Final Score</p>
      <section class="game-over__score-board">
        <div class="game-over__player-score">
          <img src="/img/theme-1/blue-player-icon.svg" alt="">
          <p class="game-over__blue-player-score">Blue <span>${blueScore}</span></p>
        </div>
        <div class="game-over__player-score">
          <img src="/img/theme-1/orange-player-icon.svg" alt="">
          <p class="game-over__orange-player-score">Orange <span>${orangeScore}</span></p>
        </div>
      </section>
    </section>
  `;
}
