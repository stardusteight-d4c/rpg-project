export function getNameInitials(fullName: string): string {
  const parts = fullName.trim().split(" ")
  if (parts.length < 2) return fullName.charAt(0).toUpperCase() // Se não tiver sobrenome, retorna só a primeira letra do nome

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() // Primeira letra do primeiro e último nome
}
