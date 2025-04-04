export function clickElement(elementId: string) {
  const fileInput = document.getElementById(elementId) as HTMLInputElement
  if (fileInput) {
    fileInput.click()
  }
}
