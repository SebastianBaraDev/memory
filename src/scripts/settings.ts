import { GameSettings } from "./types";
import { setText } from "./utils";

const DEFAULT_PREVIEW_THEME = "theme-1";

const settings: GameSettings = {
  theme: null,
  player: null,
  boardSize: null,
};

const SETTING_NAMES: Record<string, string> = {
  "theme-1": "Code vibes theme",
  "theme-2": "DA Projects theme",
  "theme-3": "Gaming theme",
  "theme-4": "Foods theme",
  blue: "Blue Player",
  orange: "Orange Player",
  16: "16 cards",
  24: "24 cards",
  36: "36 cards",
};

/**
 * Returns the current game settings.
 * @returns The settings object with theme, player and board size.
 */
export function getSettings(): GameSettings {
  return settings;
}

/**
 * Resets all settings to null, so a new game starts without preselection.
 */
export function resetSettings(): void {
  settings.theme = null;
  settings.player = null;
  settings.boardSize = null;
}

/**
 * Initializes the settings input elements and adds event listeners to them.
 */
export function initSettingsInputs(): void {
  const radioInputs = document.querySelectorAll<HTMLInputElement>(
    'input[type="radio"]',
  );

  radioInputs.forEach((input) => {
    input.addEventListener("change", () => {
      updateSettings(input);
    });
  });
  initThemePreview();
  restoreSelection();
}

/**
 * Checks the inputs of the last game again (after leaving it with the exit button).
 * After a page reload all settings are null, so nothing is checked.
 */
function restoreSelection(): void {
  checkInput("theme", settings.theme);
  checkInput("player", settings.player);
  checkInput("board", settings.boardSize);
  showPreview(settings.theme || DEFAULT_PREVIEW_THEME);
  updateSummary();
}

/**
 * Checks the radio input with the given name and value.
 * @param name - The name of the input group, e.g. "theme".
 * @param value - The saved value, or null if nothing is selected.
 */
function checkInput(name: string, value: string | number | null): void {
  if (value === null) return;
  const input = document.querySelector<HTMLInputElement>(
    `input[name="${name}"][value="${value}"]`,
  );
  if (input) input.checked = true;
}

/**
 * Updates the settings object based on the selected input.
 * @param input - The input element that triggered the change event.
 */
function updateSettings(input: HTMLInputElement): void {
  switch (input.name) {
    case "theme":
      settings.theme = input.value;
      break;
    case "player":
      settings.player = input.value;
      break;
    case "board":
      settings.boardSize = parseInt(input.value, 10);
      break;
    default:
      console.error(`Unknown input name: ${input.name}`);
  }
  updateSummary();
}

/**
 * Updates the summary bar of the settings screen based on the current settings.
 */
function updateSummary(): void {
  setText("settings__theme-name", getSettingName(settings.theme, "Game themes"));
  setText("settings__player-name", getSettingName(settings.player, "Player"));
  setText("settings__board-size", getSettingName(settings.boardSize, "Board size"));
  updateStartButtonState();
}

/**
 * Returns the readable name of a setting, or the placeholder if nothing is selected.
 * @param value - The selected value, e.g. "theme-1", "blue" or 16.
 * @param placeholder - The text shown while nothing is selected.
 * @returns The readable name or the placeholder.
 */
function getSettingName(value: string | number | null, placeholder: string): string {
  if (value === null) return placeholder;
  return SETTING_NAMES[value] || placeholder;
}

/**
 * Enables the start button only when theme, player and board size are selected.
 */
function updateStartButtonState(): void {
  const startButton = document.querySelector<HTMLButtonElement>(
    ".settings__start-button",
  );
  if (!startButton) {
    console.error("Start button not found");
    return;
  }
  startButton.disabled = !(
    settings.theme &&
    settings.player &&
    settings.boardSize
  );
}

/**
 * Shows the preview image for the given theme.
 * @param theme - The theme folder, e.g. "theme-1".
 */
function showPreview(theme: string): void {
  const previewImage = document.querySelector<HTMLImageElement>(
    ".settings__thumbnail-preview",
  );
  if (!previewImage) {
    console.error("Preview element not found");
    return;
  }
  previewImage.src = `/img/${theme}/thumbnail.svg`;
}

/**
 * Changes the preview image while the mouse is over a theme option.
 */
function initThemePreview(): void {
  const themeInputs = document.querySelectorAll<HTMLInputElement>(
    'input[name="theme"]',
  );
  themeInputs.forEach((input) => {
    initPreviewHover(input);
  });
}

/**
 * Shows the hovered theme as preview and goes back to the selected theme on mouse leave.
 * @param input - The radio input of one theme option.
 */
function initPreviewHover(input: HTMLInputElement): void {
  const label = input.parentElement;
  if (!label) return;
  label.addEventListener("mouseenter", () => {
    showPreview(input.value);
  });
  label.addEventListener("mouseleave", () => {
    showPreview(settings.theme || DEFAULT_PREVIEW_THEME);
  });
}
