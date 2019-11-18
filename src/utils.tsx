import { Weapon, BattleResult } from './game/types'

export function range(end: number): number[] {
  return Array.from({ length: end }).map((_, i) => i)
}

export function weaponToString(w: Weapon): string {
  switch (w) {
    case Weapon.Rock:
      return 'Rock'
    case Weapon.Paper:
      return 'Paper'
    case Weapon.Scissors:
      return 'Scissors'
    default:
      throw new Error('Switching enum')
  }
}

export function resultToString(r: BattleResult): string {
  switch (r) {
    case BattleResult.Win:
      return 'Win'
    case BattleResult.Loss:
      return 'Loss'
    case BattleResult.Draw:
      return 'Draw'
    default:
      throw new Error('Switching enum')
  }
}
