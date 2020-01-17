import { Character } from '../Character'

export class EnsureCharacterPolicy {
  constructor(private readonly mainCharacter: Character) {}

  public isSatisfiedBy(character: Character) {
    if (!this.fitsInLevelRange(character)) {
      return false
    }

    if (this.isTheSameCharacter(character)) {
      return false
    }

    if (this.mainCharacter.isRookie()) {
      if (character.isRookie()) {
        return true
      } else {
        return false
      }
    }

    if (this.isSameVocation(character)) {
      return false
    }

    return true
  }

  private fitsInLevelRange(character: Character) {
    return (
      character.level >= this.mainCharacter.level * 0.75 &&
      character.level <= this.mainCharacter.level * 1.25
    )
  }

  private isSameVocation(character: Character) {
    return this.mainCharacter.vocation === character.vocation
  }

  private isTheSameCharacter(character: Character) {
    return this.mainCharacter.name === character.name
  }
}
