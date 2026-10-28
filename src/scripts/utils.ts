/** * Sets the inner HTML of an element with the specified ID to the provided text. * @param id - The ID of the element to update.
 * @param text - The text to set as the inner HTML of the element.
 */
export function setText(id: string, text: string): void {
    const content = document.getElementById(id);
    if (!content) {
        console.error("No Settings content found");
        return;
    }
    content.textContent = text;
}