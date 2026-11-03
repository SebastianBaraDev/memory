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
