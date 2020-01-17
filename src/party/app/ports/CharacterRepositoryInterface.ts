import { Character } from '../../domain/Character'

export interface CharacterRepositoryInterface {
  findOne(name: string): Promise<Character>
}
