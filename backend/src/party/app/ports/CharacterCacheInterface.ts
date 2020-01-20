export interface CharacterCacheInterface {
  findLatestCharacterNamesSearchedByWorld(world: string): Promise<string[]>
  saveLatestCharacterNameSearch(world: string, name: string): Promise<void>
}
