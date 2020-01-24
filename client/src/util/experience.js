export const calculateExpBoost = (selectedPlayers, characterVocation) => {
  const vocations = selectedPlayers.reduce(
    (vocations, { vocation }) => {
      if (!vocations.includes(vocation)) {
        vocations.push(vocation)
      }
      return vocations
    },
    [characterVocation],
  )

  if (selectedPlayers.length === 0) {
    return 0
  }

  switch (vocations.length) {
    case 1:
      return 20
    case 2:
      return 30
    case 3:
      return 60
    case 4:
    default:
      return 100
  }
}
