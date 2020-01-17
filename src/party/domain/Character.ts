export type Vocation = 'knight' | 'druid' | 'sorcerer' | 'paladin' | 'unknown'

export const matchVocation = (fullVocation: string): Vocation => {
  switch (fullVocation) {
    case 'Druid':
    case 'Elder Druid':
      return 'druid'
    case 'Knight':
    case 'Elite Knight':
      return 'knight'
    case 'Paladin':
    case 'Royal Paladin':
      return 'paladin'
    case 'Sorcerer':
    case 'Master Sorcerer':
      return 'sorcerer'
    default:
      return 'unknown'
  }
}

interface CharacterData {
  name: string
  fullVocation: string
  level: number
  world?: string
}

export class Character {
  public readonly name: string
  public readonly vocation: Vocation
  public readonly fullVocation: string
  public readonly level: number
  public readonly world?: string

  constructor(characterData: CharacterData) {
    this.name = characterData.name
    this.vocation = matchVocation(characterData.fullVocation)
    this.fullVocation = characterData.fullVocation
    this.level = characterData.level
    this.world = characterData.world
  }

  public isRookie() {
    return this.vocation === 'unknown'
  }
}
