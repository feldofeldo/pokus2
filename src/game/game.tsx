import { fight } from './RPS'
import { addResultToStats, resetCurrentStats } from './stats'
import { NUM_ROUNDS, TOTAL_ROUNDS } from '../constants'
import { BattleHistory, Weapon, Game } from './types'

// HISTORY

export function countHistoryMeWeapons(history: BattleHistory, w: Weapon): number {
  return history.reduce((pv, cv) => pv + (cv.me === w ? 1 : 0), 0)
}

// GAME

export function generateWeapon(game: Game): Weapon {
  return game.opponent.generateWeapon(game.history)
}

export function addBattleToGame(me: Weapon, opponent: Weapon): (game: Game) => Game {
  const result = fight(me, opponent)
  return (game) => {
    const history = [...game.history, { me, opponent, result }]
    const stats = addResultToStats(game.stats, result)
    return { opponent: game.opponent, history, stats }
  }
}

export function isGameFinished(game: Game): boolean {
  return game.history.length >= NUM_ROUNDS || game.stats.rounds >= TOTAL_ROUNDS
}

export function resetGame(game: Game): Game {
  return { ...game, history: [], stats: resetCurrentStats(game.stats) }
}

// GAMES

export function replaceGame(games: Game[], gameId: number, f: (game: Game) => Game): Game[] {
  return games.map((game, i) => (i === gameId ? f(game) : game))
}
