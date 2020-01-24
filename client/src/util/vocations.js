export const matchVocations = (players, characterLevel) => {
  const playersByVocation = players.reduce((playersByCategory, player) => {
    if (playersByCategory[player.vocation]) {
      playersByCategory[player.vocation].push(player)
    } else {
      playersByCategory[player.vocation] = [player]
    }

    return playersByCategory
  }, {})

  for (let vocation of Object.keys(playersByVocation)) {
    playersByVocation[vocation] = playersByVocation[vocation].sort((p1, p2) => {
      const diff1 = Math.abs(p1.level - characterLevel)
      const diff2 = Math.abs(p2.level - characterLevel)

      return diff1 - diff2
    })
  }

  return playersByVocation
}
