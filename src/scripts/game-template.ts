/**
 * Returns the HTML template for the game screen.
 * @returns {string} The HTML template for the game screen.
 */
export function getGameTemplate():string{
    return `
        <header class="gameboard-header">
            <section class="gameboard-header__score-board">
                <div class="gameboard-header__player-score">
                    <img src="/img/theme-1/blue-player-icon.svg" alt="">
                    <p class="gameboard-header__blue-player-score">Blue <span id="player-blue">0</span></p>
                </div>
                <div class="gameboard-header__player-score">
                    <img src="/img/theme-1/orange-player-icon.svg" alt="">
                    <p class="gameboard-header__orange-player-score">Orange <span id="player-orange">0</span></p>              
                </div>
            </section>
            <section class="gameboard-header__current-player">
                <p>Current Player: </p><img src="/img/theme-1/blue-player-icon.svg" class="gameboard-header__current-player-icon" alt="Blue Player">
            </section>
            <button class="gameboard-header__exit-btn"><img src="/icons/exit-item.svg" class="gameboard-header__btn-exit-icon">Exit game</button>
        </header>

        <section class="board" id="board">
        </section>
    `
}

export function getCardTemplate(motif: number, theme: string): string {
    return `
        <div class="card" data-motif="${motif}">
            <img src="/img/${theme}/card-back.svg" alt="card back" class="card__back-face card__image">
            <img src="/img/${theme}/card-${motif}.svg" alt="card front" class="card__front-face card__image">
        </div>
    `
}