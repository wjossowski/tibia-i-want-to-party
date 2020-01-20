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

    return true
  }

  private fitsInLevelRange(character: Character) {
    return (
      character.level >= Math.ceil((this.mainCharacter.level * 2) / 3) &&
      character.level <= Math.ceil(this.mainCharacter.level * 1.5)
    )
  }

  private isTheSameCharacter(character: Character) {
    return this.mainCharacter.name === character.name
  }
}
