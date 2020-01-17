import { Character } from '../Character'
import { EnsureCharacterPolicy } from './EnsureCharacterPolicy'

describe('EnsureCharacterPolicy', () => {
  describe('Mainland', () => {
    const mainCharacter = new Character({
      world: 'Bona',
      fullVocation: 'Elite Knight',
      level: 100,
      name: 'A Knight',
    })

    it('Should pass policy for level range', () => {
      const character = new Character({
        world: 'Bona',
        fullVocation: 'Elder Druid',
        level: 100,
        name: 'A Druid',
      })

      expect(
        new EnsureCharacterPolicy(mainCharacter).isSatisfiedBy(character),
      ).toEqual(true)
    })

    it('Should not pass policy for smaller level', () => {
      const character = new Character({
        world: 'Bona',
        fullVocation: 'Elder Druid',
        level: 74,
        name: 'A Druid',
      })

      expect(
        new EnsureCharacterPolicy(mainCharacter).isSatisfiedBy(character),
      ).toEqual(false)
    })

    it('Should not pass policy for bigger level', () => {
      const character = new Character({
        world: 'Bona',
        fullVocation: 'Elder Druid',
        level: 126,
        name: 'A Druid',
      })

      expect(
        new EnsureCharacterPolicy(mainCharacter).isSatisfiedBy(character),
      ).toEqual(false)
    })

    it('Should not pass policy for the same vocation', () => {
      const character = new Character({
        world: 'Bona',
        fullVocation: 'Knight',
        level: 100,
        name: 'Invalid Knight',
      })

      expect(
        new EnsureCharacterPolicy(mainCharacter).isSatisfiedBy(character),
      ).toEqual(false)
    })

    it('Should not match rookie characters', () => {
      const character = new Character({
        world: 'Bona',
        fullVocation: 'No Vocation',
        level: 10,
        name: 'Rookie',
      })

      expect(
        new EnsureCharacterPolicy(mainCharacter).isSatisfiedBy(character),
      ).toEqual(false)
    })
  })

  describe('Rookgaard Character', () => {
    const rookieCharacter = new Character({
      world: 'Bona',
      fullVocation: 'No Vocation',
      level: 8,
      name: 'Rookie',
    })

    it('Should pass policy for rookie lookup', () => {
      const character = new Character({
        world: 'Bona',
        fullVocation: 'No Vocation',
        level: 10,
        name: 'Rookie Two',
      })

      expect(
        new EnsureCharacterPolicy(rookieCharacter).isSatisfiedBy(character),
      ).toEqual(true)
    })

    it('Should not match mainland characters', () => {
      const character = new Character({
        world: 'Bona',
        fullVocation: 'Sorcerer',
        level: 10,
        name: 'Sorcerer',
      })

      expect(
        new EnsureCharacterPolicy(rookieCharacter).isSatisfiedBy(character),
      ).toEqual(false)
    })
  })
})
