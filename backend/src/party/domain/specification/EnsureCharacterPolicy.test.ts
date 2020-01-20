import { Character } from '../Character'
import { EnsureCharacterPolicy } from './EnsureCharacterPolicy'

describe('EnsureCharacterPolicy', () => {
  describe('Mainland', () => {
    const mainCharacter = new Character({
      fullVocation: 'Elite Knight',
      level: 100,
      name: 'A Knight',
    })

    it('Should pass policy for level range', () => {
      const character = new Character({
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
        fullVocation: 'Elder Druid',
        level: 65,
        name: 'A Druid',
      })

      expect(
        new EnsureCharacterPolicy(mainCharacter).isSatisfiedBy(character),
      ).toEqual(false)
    })

    it('Should not pass policy for bigger level', () => {
      const character = new Character({
        fullVocation: 'Elder Druid',
        level: 151,
        name: 'A Druid',
      })

      expect(
        new EnsureCharacterPolicy(mainCharacter).isSatisfiedBy(character),
      ).toEqual(false)
    })

    it('Should not match rookie characters', () => {
      const character = new Character({
        fullVocation: 'No Vocation',
        level: 10,
        name: 'Rookie',
      })

      expect(
        new EnsureCharacterPolicy(mainCharacter).isSatisfiedBy(character),
      ).toEqual(false)
    })
  })

  describe('Edge cases', () => {
    it('Should fail for smaller than minimum values', () => {
      const character = new Character({
        fullVocation: 'Elite Knight',
        level: 139,
        name: 'Foo',
      })

      const level92 = new Character({
        fullVocation: 'Elite Knight',
        level: 92,
        name: 'Bar',
      })

      expect(
        new EnsureCharacterPolicy(character).isSatisfiedBy(level92),
      ).toEqual(false)
    })

    it('Should fail for higher than maximum values', () => {
      const character = new Character({
        fullVocation: 'Elite Knight',
        level: 139,
        name: 'Foo',
      })

      const level92 = new Character({
        fullVocation: 'Elite Knight',
        level: 210,
        name: 'Bar',
      })

      expect(
        new EnsureCharacterPolicy(character).isSatisfiedBy(level92),
      ).toEqual(false)
    })

    it('Should pass for equal minimum values', () => {
      const main = new Character({
        fullVocation: 'Elite Knight',
        level: 139,
        name: 'Foo',
      })

      const level93 = new Character({
        fullVocation: 'Elite Knight',
        level: 93,
        name: 'Bar',
      })

      expect(new EnsureCharacterPolicy(main).isSatisfiedBy(level93)).toEqual(
        true,
      )
    })

    it('Should pass for equal maximum values', () => {
      const main = new Character({
        fullVocation: 'Elite Knight',
        level: 139,
        name: 'Foo',
      })

      const level93 = new Character({
        fullVocation: 'Elite Knight',
        level: 209,
        name: 'Bar',
      })

      expect(new EnsureCharacterPolicy(main).isSatisfiedBy(level93)).toEqual(
        true,
      )
    })
  })

  describe('Rookgaard Character', () => {
    const rookieCharacter = new Character({
      fullVocation: 'No Vocation',
      level: 8,
      name: 'Rookie',
    })

    it('Should pass policy for rookie lookup', () => {
      const character = new Character({
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
