import { randomWeapon, beatenBy, randomWeaponPopulation } from './RPS';
import { Opponent, BattleHistory, Weapon, BattleResult } from './types';
import { countHistoryOpponentWeapons } from './game';
import {
  faDumbbell,
  faHammer,
  faQuestion,
  faCookieBite,
  faGraduationCap,
  faBookDead,
  faGift,
  faGrinSquintTears
} from '@fortawesome/free-solid-svg-icons';

export const oneWeapon: Opponent = {
  name: 'Alan the Almighty',
  icon: faDumbbell,
  generateWeapon: (history: BattleHistory) => {
    if (history.length === 0) {
      return randomWeapon();
    }
    return history[0].opponent;
  }
};

export const beatLast: Opponent = {
  name: 'Beatrice the Brutal',
  icon: faHammer,
  generateWeapon: (history: BattleHistory) => {
    if (history.length === 0) {
      return randomWeapon();
    }
    return beatenBy(history[history.length - 1].me);
  }
};

export const randomAlternate: Opponent = {
  name: 'Cedric the Confused',
  icon: faQuestion,
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
  icon: faCookieBite,
  generateWeapon: (history: BattleHistory) => {
    if (history.length === 0) {
      switch (randomWeapon()) {
        case Weapon.Rock:
          twoWeapons.state = [0, 1, 1];
          break;
        case Weapon.Paper:
          twoWeapons.state = [1, 0, 1];
          break;
        case Weapon.Scissors:
          twoWeapons.state = [1, 1, 0];
          break;
        default:
          break;
      }
    }
    return randomWeaponPopulation(
      twoWeapons.state[0],
      twoWeapons.state[1],
      twoWeapons.state[2]
    );
  },
  state: [0, 0, 0]
};

export const mostWinning: Opponent = {
  name: 'Edward the Educated',
  icon: faGraduationCap,
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

export const randomGuy: Opponent = {
  name: 'Florian the Fallen',
  icon: faBookDead,
  generateWeapon: () => randomWeapon()
};

export const favoriteWeapon: Opponent = {
  name: 'Gregory the Generous',
  icon: faGift,
  generateWeapon: (history: BattleHistory) => {
    if (history.length === 0) {
      switch (randomWeapon()) {
        case Weapon.Rock:
          twoWeapons.state = [2, 1, 1];
          break;
        case Weapon.Paper:
          twoWeapons.state = [1, 2, 1];
          break;
        case Weapon.Scissors:
          twoWeapons.state = [1, 1, 2];
          break;
        default:
          break;
      }
    }
    return randomWeaponPopulation(
      twoWeapons.state[0],
      twoWeapons.state[1],
      twoWeapons.state[2]
    );
  },
  state: [0, 0, 0]
};

export const proportionalBeat: Opponent = {
  name: 'Hugo the Hilarious',
  icon: faGrinSquintTears,
  generateWeapon: (history: BattleHistory) => {
    if (history.length === 0) {
      return randomWeapon();
    }
    const rocks = countHistoryOpponentWeapons(history, Weapon.Rock);
    const papers = countHistoryOpponentWeapons(history, Weapon.Paper);
    const scissors = countHistoryOpponentWeapons(history, Weapon.Scissors);
    return beatenBy(beatenBy(randomWeaponPopulation(rocks, papers, scissors)));
  }
};
