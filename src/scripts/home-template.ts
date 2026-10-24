/**
 * 
 * @returns the template for the Start / Home Screen
 */

export function getHomeTemplate():string{
    return `        
        <section class="home">
            <hgroup class="home__heading">
                <p class="home__subtitle">It's play time.</p>
                <h1 class="home__title">Ready to play?</h1>
            </hgroup>
            
            <button class="home__play-button" initPlayButton()>
                <img src="/icons/controller-small.svg" alt="" class="home__button-img">
                Play
                <img src="/icons/arrow.svg" alt="" class="home__button-arrow">
            </button>

            <img src="/icons/controller-big.svg" alt="" class="home__controller-big">
        </section>`;
}