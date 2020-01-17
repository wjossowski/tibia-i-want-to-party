import { CharacterJSON } from '../domain/Character'
import { CharacterRepositoryInterface } from './ports/CharacterRepositoryInterface'
import { WorldRepositoryInterface } from './ports/WorldRepositoryInterface'
import { EnsureCharacterPolicy } from '../domain/specification/EnsureCharacterPolicy'
import { applicationErrors } from 'backend/src/common/applicationErrors'

export interface PartyDto {
  character: CharacterJSON
  availableCharacters: CharacterJSON[]
}

export class PartyService {
  constructor(
    private readonly characterRepository: CharacterRepositoryInterface,
    private readonly worldRepository: WorldRepositoryInterface,
  ) {}

  public async findPartyMembersForPlayer(
    playerName: string,
  ): Promise<PartyDto> {
    const character = await this.characterRepository.findOne(playerName)
    if (!character.world) {
      throw applicationErrors.notFound(`Cannot find character '${playerName}'`)
    }

    const loggedCharacters = await this.worldRepository.findOnlineUsers(
      character.world,
    )
    const ensureCharacterPolicy = new EnsureCharacterPolicy(character)
    const availableCharacters = loggedCharacters.filter((character) =>
      ensureCharacterPolicy.isSatisfiedBy(character),
    )

    return {
      character: character.toJson(),
      availableCharacters: availableCharacters.map((character) =>
        character.toJson(),
      ),
    }
  }
}
