import { generateRandomName, generateRandomOccupation } from "@/shared/utils"

export class AutoGenerateSheetHandler {
  editableData: ISheet

  constructor(editableData: ISheet) {
    this.editableData = editableData
  }

  private rollDice(sides: number, rolls: number): number {
    return Array.from(
      { length: rolls },
      () => Math.floor(Math.random() * sides) + 1
    ).reduce((a, b) => a + b, 0)
  }

  private distributePointsRandomly(skills: any[], totalPoints: number) {
    let remainingPoints = totalPoints
    while (remainingPoints > 0) {
      const skillIndex = Math.floor(Math.random() * skills.length)
      const pointsToAdd = Math.min(
        5 + Math.floor(Math.random() * 10),
        remainingPoints
      )
      skills[skillIndex].currentValue += pointsToAdd
      remainingPoints -= pointsToAdd
    }
    return skills
  }

  private initializeSkills(
    attributes: any,
    skills: any[],
    occupationalPoints: number,
    freePoints: number
  ) {
    let updatedSkills = skills.map((skill) => ({
      ...skill,
      currentValue:
        skill.baseValue === "half DEX"
          ? Math.floor(attributes.dexterity / 2)
          : skill.baseValue === "EDU"
          ? attributes.education
          : skill.baseValue,
    }))
    updatedSkills = this.distributePointsRandomly(
      updatedSkills,
      occupationalPoints
    )
    updatedSkills = this.distributePointsRandomly(updatedSkills, freePoints)
    return updatedSkills
  }

  public autoGenerate(): ISheet {
    const attributes = {
      strength: this.rollDice(6, 3) * 5,
      dexterity: this.rollDice(6, 3) * 5,
      intelligence: (this.rollDice(6, 2) + 6) * 5,
      power: this.rollDice(6, 3) * 5,
      constitution: this.rollDice(6, 3) * 5,
      appearance: this.rollDice(6, 3) * 5,
      size: (this.rollDice(6, 2) + 6) * 5,
      education: (this.rollDice(6, 2) + 6) * 5,
      luck: this.rollDice(6, 3) * 5,
    }
    const hitPoints = Math.floor(
      (attributes.constitution + attributes.size) / 10
    )
    const magicPoints = Math.floor(attributes.power / 5)
    const sanity = attributes.power
    const occupationalPoints = attributes.education * 4
    const freePoints = attributes.intelligence * 2
    const randomCharacter = generateRandomName()
    return {
      ...this.editableData,
      infos: {
        ...this.editableData.infos,
        name: randomCharacter.name,
        sex: randomCharacter.sex as Gender,
        occupation: generateRandomOccupation(),
        maxHitPoints: hitPoints,
        maxMagicPoints: magicPoints,
        maxSanity: sanity,
        hitPoints,
        magicPoints,
        sanity,
      },
      attributes: attributes,
      skills: this.initializeSkills(
        attributes,
        this.editableData.skills,
        occupationalPoints,
        freePoints
      ),
    }
  }
}
