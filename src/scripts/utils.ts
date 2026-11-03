import { DialogTexts } from "./types";

/** Default button texts of the exit dialog. */
const DEFAULT_DIALOG_TEXTS: DialogTexts = { back: "Back to game", exit: "Exit game" };

/** Themes with their own button texts in the exit dialog (from Figma). */
const THEME_DIALOG_TEXTS: Record<string, DialogTexts> = {
  "theme-3": { back: "No, back to game", exit: "Yes, quit game" },
  "theme-4": { back: "No, back to game", exit: "Exit game" },
};

/** The only theme that says "Back to start", all others say "Home" (from Figma). */
const BACK_TO_START_THEME = "theme-1";

/**
 * Renders the provided template into the screen element.
 * @param template - The HTML template to render.
 */
export function renderScreen(template: string): void {
  const screen = document.getElementById("screen");
  if (!screen) {
    console.error("Screen element not found");
    return;
  }
  screen.innerHTML = template;
}

/**
 * Sets the text content of the element with the given id.
 * @param id - The id of the element to update.
 * @param text - The text to show in the element.
 */
export function setText(id: string, text: string): void {
  const content = document.getElementById(id);
  if (!content) {
    console.error(`Element with id "${id}" not found`);
    return;
  }
  content.textContent = text;
}

/**
 * Returns the button texts of the exit dialog for the selected theme.
 * @param theme - The selected theme folder, e.g. "theme-1".
 * @returns The texts for the back button and the exit button.
 */
export function getDialogTexts(theme: string): DialogTexts {
  return THEME_DIALOG_TEXTS[theme] || DEFAULT_DIALOG_TEXTS;
}

/**
 * Returns the text of the button that leads back to the home screen.
 * @param theme - The selected theme folder, e.g. "theme-1".
 * @returns "Back to start" for Code vibes, "Home" for all other themes.
 */
export function getHomeButtonText(theme: string): string {
  if (theme === BACK_TO_START_THEME) return "Back to start";
  return "Home";
}
