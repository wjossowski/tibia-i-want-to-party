import { Character } from '../../domain/Character'

export interface WorldRepositoryInterface {
  findOnlineUsers(worldName: string): Promise<Character[]>
}
