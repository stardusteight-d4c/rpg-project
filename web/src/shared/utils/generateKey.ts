export function generateKey(): number[] {
  const numbers: number[] = []

  for (let i = 0; i < 6; i++) {
    const number = Math.floor(Math.random() * 10)
    numbers.push(number)
  }

  return numbers
}
