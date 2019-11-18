import { Weapon, BattleResult } from './types'

export function fight(me: Weapon, opponent: Weapon): BattleResult {
  switch ((me - opponent + 3) % 3) {
    case 0:
      return BattleResult.Draw
    case 1:
      return BattleResult.Win
    case 2:
      return BattleResult.Loss
    default:
      throw Error('WRONG REMAINDER')
  }
}

export function beatenBy(w: Weapon): Weapon {
  switch (w) {
    case Weapon.Rock:
      return Weapon.Paper
    case Weapon.Paper:
      return Weapon.Scissors
    case Weapon.Scissors:
      return Weapon.Rock
    default:
      throw new Error('Enum switch')
  }
}

export function randomWeaponPopulation(rocks: number, papers: number, scissors: number): Weapon {
  const sum = rocks + papers + scissors
  const rand = Math.random() * sum
  if (rand < rocks) {
    return Weapon.Rock
  } if (rand < rocks + papers) {
    return Weapon.Paper
  }
  return Weapon.Scissors
}

export function randomWeapon(): Weapon {
  return randomWeaponPopulation(1, 1, 1)
}
