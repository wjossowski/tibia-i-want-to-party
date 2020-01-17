import { Character } from '../domain/Character'
import { CharacterRepositoryInterface } from './ports/CharacterRepositoryInterface'
import { WorldRepositoryInterface } from './ports/WorldRepositoryInterface'
import { EnsureCharacterPolicy } from '../domain/specification/EnsureCharacterPolicy'
import { applicationErrors } from 'src/common/applicationErrors'

export class PartyService {
  constructor(
    private readonly characterRepository: CharacterRepositoryInterface,
    private readonly worldRepository: WorldRepositoryInterface,
  ) {}

  public async findPartyMembersForPlayer(
    playerName: string,
  ): Promise<Character[]> {
    const character = await this.characterRepository.findOne(playerName)
    if (!character.world) {
      throw applicationErrors.notFound('Cannot find character')
    }

    const loggedCharacters = await this.worldRepository.findOnlineUsers(
      character.world,
    )
    const ensureCharacterPolicy = new EnsureCharacterPolicy(character)
    return loggedCharacters.filter((character) =>
      ensureCharacterPolicy.isSatisfiedBy(character),
    )
  }
}
