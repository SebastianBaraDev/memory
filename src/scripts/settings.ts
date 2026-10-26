import {GameSettings} from "./types";

const settings: GameSettings = {
    theme: null,
    player: null,
    boardSize: null,
};

export function getSettings(): GameSettings {
  return settings;
}

const SETTING_NAMES: Record<string, string> = {
    "theme-1": "Code vibes",
    "theme-2": "DA Projects",
    blue: "Blue Player",
    orange: "Orange Player",
    16: "Board size 16",
    24: "Board size 24",
    36: "Board size 36",
};

/** * Initializes the settings input elements and adds event listeners to them.
 */
export function initSettingsInputs() :void {
    const radioInputs = document.querySelectorAll<HTMLInputElement>('input[type="radio"]');
  
    radioInputs.forEach(input => {
        input.addEventListener("change", () => {
           updateSettings(input);
    });
});
initThemePreview();
}

/** * Updates the settings object based on the selected input.
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

/** * Updates the summary section of the settings screen based on the current settings. */
function updateSummary(): void {
    updateThemeText();
    updatePlayerText();
    updateBoardSizeText();
    updateStartButtonState();
}

/** * Updates the theme text in the summary section based on the current settings. */
function updateThemeText(): void {
    setText("settings__theme-name", settings.theme ? SETTING_NAMES[settings.theme] || "Theme" : "Theme");
}

/** * Updates the player text in the summary section based on the current settings. */
function updatePlayerText(): void {
    setText("settings__player-name", settings.player ? SETTING_NAMES[settings.player] || "Player" : "Player");
}

/** * Updates the board size text in the summary section based on the current settings. */
function updateBoardSizeText(): void {
    setText("settings__board-size", settings.boardSize ? SETTING_NAMES[settings.boardSize] || "Board Size" : "Board Size");
}

/** * Updates the state of the start button based on the current settings. */
function updateStartButtonState(): void {
    const startButton = document.querySelector(".settings__start-button") as HTMLButtonElement | null;
    if (!startButton) {
        console.error("Start button not found");
        return;
    }
    startButton.disabled = !(settings.theme && settings.player && settings.boardSize);
}   

/** * Sets the inner HTML of an element with the specified ID to the provided text. * @param id - The ID of the element to update.
 * @param text - The text to set as the inner HTML of the element.
 */
function setText(id: string, text: string): void {
    const content = document.getElementById(id);
    if (!content) {
        console.error("No Settings content found");
        return;
    }
    content.textContent = text;
}

/** * Shows the preview image for the selected theme.
 * @param theme - The selected theme.
 */
function showPreview(theme: string): void{
    const previewImage = document.querySelector<HTMLImageElement>(".settings__thumbnail-preview");
    if (!previewImage) {
        console.error("Preview element not found");
        return;
    }
    previewImage.src = `/img/${theme}/thumbnail.svg`;
}

function initThemePreview(): void {
    const themeInputs = document.querySelectorAll<HTMLInputElement>('input[name="theme"]');

    themeInputs.forEach(input => {
        const label = input.parentElement;
        if (!label) return;

    label.addEventListener("mouseenter", () => {
      showPreview(input.value);
    });

    label.addEventListener("mouseleave", () => {
      showPreview(settings.theme || "theme-1");
        });
    });
}