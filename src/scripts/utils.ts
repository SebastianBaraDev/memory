/**
 * Renders the provided template into the screen element.
 * @param template - The HTML template to render.
 */
export function renderScreen(template: string): void {
  const screen = document.getElementById("screen");
  if (!screen) {
    console.error("Site not found");
    return;
  }
  screen.innerHTML = template;
}

/** * Sets the inner HTML of an element with the specified ID to the provided text. * @param id - The ID of the element to update.
 * @param text - The text to set as the inner HTML of the element.
 */
export function setText(id: string, text: string): void {
    const content = document.getElementById(id);
    if (!content) {
        console.error(`Element with id "${id}" not found`);
        return;
    }
    content.textContent = text;
}