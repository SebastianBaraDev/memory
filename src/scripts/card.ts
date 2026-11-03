/**
 * One memory card on the board. Wraps the card element, so the game logic
 * does not have to work with CSS classes and data attributes directly.
 */
export class Card {
  private readonly element: HTMLElement;
  readonly motif: string;

  /**
   * Creates a card from its HTML element.
   * @param element - The card element with a data-motif attribute.
   */
  constructor(element: HTMLElement) {
    this.element = element;
    this.motif = element.dataset.motif ?? "";
  }

  /**
   * Runs the given function when the card is clicked.
   * @param callback - The function to run on click.
   */
  onClick(callback: () => void): void {
    this.element.addEventListener("click", callback);
  }

  /**
   * Turns the card face up.
   */
  flip(): void {
    this.element.classList.add("is-flipped");
  }

  /**
   * Turns the card face down again.
   */
  flipBack(): void {
    this.element.classList.remove("is-flipped");
  }

  /**
   * Marks the card as part of a found pair.
   */
  markMatched(): void {
    this.element.classList.add("is-matched");
  }

  /**
   * Checks if the card is face up.
   * @returns true if the card is flipped.
   */
  isFlipped(): boolean {
    return this.element.classList.contains("is-flipped");
  }

  /**
   * Checks if this card shows the same motif as another card.
   * @param otherCard - The card to compare with.
   * @returns true if both cards have the same motif.
   */
  matches(otherCard: Card): boolean {
    return this.motif === otherCard.motif;
  }
}
