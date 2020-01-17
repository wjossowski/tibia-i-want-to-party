import { WorldRepositoryInterface } from '../../../app/ports/WorldRepositoryInterface'
import { Character } from '../../../domain/Character'
import root from '../../../presenters/rest/root'

interface CharacterEntry {
  level: number
  name: string
  vocation: string
}

interface WorldRecordData {
  world: {
    players_online: CharacterEntry[]
  }
}

export class WorldRepository implements WorldRepositoryInterface {
  public async findOnlineUsers(worldName: string): Promise<Character[]> {
    const worldRecord = await root.requester.get(`/world/${worldName}.json`)
    const data = worldRecord.data as WorldRecordData
    return data.world.players_online.map(
      (entry) =>
        new Character({
          fullVocation: entry.vocation,
          level: entry.level,
          name: entry.name,
        }),
    )
  }
}
