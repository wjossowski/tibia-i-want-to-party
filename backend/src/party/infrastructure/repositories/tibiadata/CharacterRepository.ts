import { Character } from '@party/domain/Character'
import root from '@party/presenters/rest/root'
import { CharacterRepositoryInterface } from '@party/app/ports/CharacterRepositoryInterface'

interface CharacterEntry {
  level: number
  name: string
  vocation: string
  world: string
}

interface CharacterRecordData {
  characters: {
    data: CharacterEntry
  }
}

export class CharacterRepository implements CharacterRepositoryInterface {
  public async findOne(name: string): Promise<Character> {
    const characterRecord = await root.requester.get(`/characters/${name}.json`)
    const data = characterRecord.data as CharacterRecordData
    const characterEntry = data.characters.data

    return new Character({
      fullVocation: characterEntry.vocation,
      level: characterEntry.level,
      name: characterEntry.name,
      world: characterEntry.world,
    })
  }
}
