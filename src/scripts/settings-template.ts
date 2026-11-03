/**
 * Returns the HTML template for the settings screen.
 * @returns The HTML template for the settings screen.
 */
export function getSettingsTemplate(): string {
  return `
    <section class="settings">
      <div class="settings__left">
        <h1 class="settings__title">Settings</h1>

        <fieldset class="settings__group">
          <legend class="settings__question"><img src="/icons/palette-favicon.svg" alt="">Game themes</legend>
          <label class="settings__option">
            <input type="radio" name="theme" value="theme-1">Code vibes theme</label>
          <label class="settings__option">
            <input type="radio" name="theme" value="theme-3">Gaming theme</label>
          <label class="settings__option">
            <input type="radio" name="theme" value="theme-2">DA Projects theme</label>
          <label class="settings__option">
            <input type="radio" name="theme" value="theme-4">Foods theme</label>
        </fieldset>

        <fieldset class="settings__group">
          <legend class="settings__question"><img src="/icons/chess-pawn-small.svg" alt="">Choose player</legend>
          <label class="settings__option">
            <input type="radio" name="player" value="blue">Blue</label>
          <label class="settings__option">
            <input type="radio" name="player" value="orange">Orange</label>
        </fieldset>

        <fieldset class="settings__group">
          <legend class="settings__question"><img src="/icons/board-size.svg" alt="">Board size</legend>
          <label class="settings__option">
            <input type="radio" name="board" value="16">16 cards</label>
          <label class="settings__option">
            <input type="radio" name="board" value="24">24 cards</label>
          <label class="settings__option">
            <input type="radio" name="board" value="36">36 cards</label>
        </fieldset>
      </div>

      <div class="settings__right">
        <img src="/img/theme-1/thumbnail.svg" alt="Preview of the selected theme" class="settings__thumbnail-preview">
        <div class="settings__info">
          <p class="settings__info-text">
            <span id="settings__theme-name">Game themes</span>
            <img src="/icons/d-line.svg" alt="">
            <span id="settings__player-name">Player</span>
            <img src="/icons/d-line.svg" alt="">
            <span id="settings__board-size">Board size</span>
          </p>
          <button class="settings__start-button" disabled><img src="/icons/play.svg" alt="" class="settings__button-img">Start</button>
        </div>
      </div>
    </section>
  `;
}
