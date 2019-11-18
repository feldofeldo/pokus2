import { BasicStats, BattleResult, GameStats } from './types'

const baseStats: BasicStats = {
  wins: 0, draws: 0, losses: 0, score: 0,
}

export function addResultToBasicStats(stats: BasicStats, result: BattleResult): BasicStats {
  switch (result) {
    case BattleResult.Win:
      return { ...stats, wins: stats.wins + 1, score: stats.score + 1 }
    case BattleResult.Draw:
      return { ...stats, draws: stats.draws + 1, score: stats.score + 0.5 }
    case BattleResult.Loss:
      return { ...stats, losses: stats.losses + 1 }
    default:
      throw new Error('Switching enum')
  }
}

export function checkBestStats(stats: GameStats): GameStats {
  if (stats.best.score < stats.current.score) {
    return { ...stats, best: { ...stats.current } }
  }
  return stats
}

export function addResultToStats(stats: GameStats, result: BattleResult): GameStats {
  const current = addResultToBasicStats(stats.current, result)
  return checkBestStats({ ...stats, current, rounds: stats.rounds + 1 })
}

export function resetCurrentStats(stats: GameStats): GameStats {
  return { ...stats, current: baseStats }
}
