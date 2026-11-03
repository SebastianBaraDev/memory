/**
 * Starts timers and remembers them, so all of them can be stopped at once
 * (e.g. when the player leaves the game while a card is flipping back).
 */
export class TimerManager {
  private timerIds: number[] = [];

  /**
   * Starts a timer and remembers its id.
   * @param callback - The function to run after the delay.
   * @param delay - The delay in milliseconds.
   */
  start(callback: () => void, delay: number): void {
    const timerId = window.setTimeout(callback, delay);
    this.timerIds.push(timerId);
  }

  /**
   * Stops all timers that were started and not finished yet.
   */
  stopAll(): void {
    this.timerIds.forEach((timerId) => {
      clearTimeout(timerId);
    });
    this.timerIds = [];
  }
}
