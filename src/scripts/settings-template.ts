/**
 * Returns the HTML template for the settings screen.
 * @returns The HTML template for the settings screen.
 */
export function getSettingsTemplate(): string {
  return `
    <section class="settings">
      <div class="settings__left">
        <h1 class="settings__title"><span class="settings__marker">Settings</span></h1>

        <fieldset class="settings__group">
          <legend class="settings__question"><img src="/img/icons/palette-favicon.svg" alt="">Game themes</legend>
          <label class="settings__option">
            <input type="radio" class="settings__radio" name="theme" value="theme-1"><span class="settings__option-text">Code vibes theme</span></label>
          <label class="settings__option">
            <input type="radio" class="settings__radio" name="theme" value="theme-3"><span class="settings__option-text">Gaming theme</span></label>
          <label class="settings__option">
            <input type="radio" class="settings__radio" name="theme" value="theme-2"><span class="settings__option-text">DA Projects theme</span></label>
          <label class="settings__option">
            <input type="radio" class="settings__radio" name="theme" value="theme-4"><span class="settings__option-text">Foods theme</span></label>
        </fieldset>

        <fieldset class="settings__group">
          <legend class="settings__question"><img src="/img/icons/chess-pawn-small.svg" alt="">Choose player</legend>
          <label class="settings__option">
            <input type="radio" class="settings__radio" name="player" value="blue"><span class="settings__option-text">Blue</span></label>
          <label class="settings__option">
            <input type="radio" class="settings__radio" name="player" value="orange"><span class="settings__option-text">Orange</span></label>
        </fieldset>

        <fieldset class="settings__group">
          <legend class="settings__question"><img src="/img/icons/board-size.svg" alt="">Board size</legend>
          <label class="settings__option">
            <input type="radio" class="settings__radio" name="board" value="16"><span class="settings__option-text">16 cards</span></label>
          <label class="settings__option">
            <input type="radio" class="settings__radio" name="board" value="24"><span class="settings__option-text">24 cards</span></label>
          <label class="settings__option">
            <input type="radio" class="settings__radio" name="board" value="36"><span class="settings__option-text">36 cards</span></label>
        </fieldset>
      </div>

      <div class="settings__right">
        <img src="/img/theme-1/thumbnail.svg" alt="Preview of the selected theme" class="settings__thumbnail-preview">
        <div class="settings__info">
          <p class="settings__info-text">
            <span id="settings__theme-name">Game themes</span>
            <img src="/img/icons/d-line.svg" alt="">
            <span id="settings__player-name">Player</span>
            <img src="/img/icons/d-line.svg" alt="">
            <span id="settings__board-size">Board size</span>
          </p>
          <button class="settings__start-button" disabled><img src="/img/icons/play.svg" alt="" class="settings__button-img">Start</button>
        </div>
      </div>
    </section>
  `;
}
