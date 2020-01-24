export const isPlayerMatchingLevelRanges = (player, minLevel, maxLevel) =>
  player.level >= minLevel && player.level <= maxLevel

export const countLevelRanges = (character, selectedPlayers = []) => {
  const levelBandwidth = selectedPlayers.reduce(
    (range, player) => {
      if (player.level < range.minLevel) {
        range.minLevel = player.level
      }
      if (player.level > range.maxLevel) {
        range.maxLevel = player.level
      }
      return range
    },
    {
      minLevel: character.level,
      maxLevel: character.level,
    },
  )

  return {
    minLevel: Math.ceil((levelBandwidth.maxLevel * 2) / 3),
    maxLevel: Math.ceil(levelBandwidth.minLevel * 1.5),
  }
}
