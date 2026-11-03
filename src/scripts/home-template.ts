/**
 * Returns the HTML template for the home screen.
 * @returns The HTML template for the home screen.
 */
export function getHomeTemplate(): string {
  return `
    <section class="home">
      <hgroup class="home__heading">
        <p class="home__subtitle">It's play time.</p>
        <h1 class="home__title">Ready to play?</h1>
      </hgroup>

      <button class="home__play-button">
        <img src="/img/icons/controller-small.svg" alt="" class="home__button-img">
        Play
        <img src="/img/icons/arrow.svg" alt="" class="home__button-arrow">
      </button>

      <img src="/img/icons/controller-big.svg" alt="" class="home__controller-big">
    </section>
  `;
}
