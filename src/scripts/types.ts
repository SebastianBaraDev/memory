export interface GameSettings {
    theme: string | null;
    player: string | null;
    boardSize: number | null;
}

export interface GameState {
  flippedCards: HTMLElement[];        // list of currently open cards (max 2)
  isBoardLocked: boolean;             // true = no clicks allowed
  currentPlayer: string;              // "blue" or "orange"
  scores: Record<string, number>;
}