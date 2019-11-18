import { randomWeapon, beatenBy, randomWeaponPopulation } from './RPS';
import { Opponent, BattleHistory, Weapon, BattleResult } from './types';

export const oneWeapon: Opponent = {
  name: 'Alan the Almighty',
  generateWeapon: (history: BattleHistory) => {
    if (history.length === 0) {
      return randomWeapon();
    }
    return history[0].opponent;
  }
};

export const beatLast: Opponent = {
  name: 'Beatrice the Brutal',
  generateWeapon: (history: BattleHistory) => {
    if (history.length === 0) {
      return randomWeapon();
    }
    return beatenBy(history[history.length - 1].me);
  }
};

export const randomAlternate: Opponent = {
  name: 'Cedric the Confused',
  generateWeapon: (history: BattleHistory) => {
    if (history.length === 0) {
      return randomWeapon();
    }
    const { opponent } = history[history.length - 1];
    switch (opponent) {
      case Weapon.Rock:
        return randomWeaponPopulation(0, 1, 1);
      case Weapon.Paper:
        return randomWeaponPopulation(1, 0, 1);
      case Weapon.Scissors:
        return randomWeaponPopulation(1, 1, 0);
      default:
        throw new Error('Switching enum');
    }
  }
};

export const twoWeapons: Opponent = {
  name: 'Damian the Delicious',
  generateWeapon: (history: BattleHistory) => {
    const weapons = new Set(history.map(battle => battle.opponent));
    if (weapons.size <= 1) {
      return randomWeapon();
    }
    if (!weapons.has(Weapon.Rock)) {
      return randomWeaponPopulation(0, 1, 1);
    }
    if (!weapons.has(Weapon.Paper)) {
      return randomWeaponPopulation(1, 0, 1);
    }
    return randomWeaponPopulation(1, 1, 0);
  }
};

export const mostWinning: Opponent = {
  name: 'Edward the Educated',
  generateWeapon: (history: BattleHistory) => {
    const wins = history.reduce(
      (pv, battle) => {
        switch (battle.result) {
          case BattleResult.Draw:
            return pv;
          case BattleResult.Win:
            return { ...pv, [battle.me]: pv[battle.me] + 1 };
          case BattleResult.Loss:
            return { ...pv, [battle.opponent]: pv[battle.opponent] + 1 };
          default:
            throw new Error('Switching enum');
        }
      },
      { [Weapon.Rock]: 0, [Weapon.Paper]: 0, [Weapon.Scissors]: 0 }
    );
    const maxWins = Math.max(...Object.values(wins));
    if (maxWins === 0) {
      return randomWeapon();
    }
    const threshold = (num: number) => (num === maxWins ? maxWins : 0);
    return randomWeaponPopulation(
      threshold(wins[Weapon.Rock]),
      threshold(wins[Weapon.Paper]),
      threshold(wins[Weapon.Scissors])
    );
  }
};
