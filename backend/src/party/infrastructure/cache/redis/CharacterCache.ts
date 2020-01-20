import { CharacterCacheInterface } from '../../../app/ports/CharacterCacheInterface'
import { client } from '../../../../common/infrastructure/cache/redis/client'
import config from '../../../../common/config'

export class CharacterCache implements CharacterCacheInterface {
  private readonly prefix = 'party:lastsearches'

  constructor() {
    console.log(
      'Party search timeout set to',
      config.PARTY_SEARCH_TIMEOUT,
      'seconds',
    )
  }

  public async findLatestCharacterNamesSearchedByWorld(
    world: string,
  ): Promise<string[]> {
    const cacheKey = this.composeKey(world)
    const keys = await client.keys(`${cacheKey}:*`)
    return keys.map((key) => this.extractName(key))
  }

  public async saveLatestCharacterNameSearch(
    world: string,
    name: string,
  ): Promise<void> {
    const cacheKey = `${this.composeKey(world)}:${name}`
    await Promise.all([
      client.set(cacheKey, new Date().toISOString()),
      client.expire(cacheKey, Number(config.PARTY_SEARCH_TIMEOUT)),
    ])
  }

  private composeKey(world: string) {
    return `${this.prefix}:${world}`
  }

  private extractName(key: string) {
    const parts = key.split(':')
    return parts[parts.length - 1]
  }
}
