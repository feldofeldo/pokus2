import {
  oneWeapon,
  beatLast,
  randomAlternate,
  twoWeapons,
  mostWinning
} from './opponents';
import { Game, AppView, initGame } from './types';

// STATE

export type State = {
  games: Game[];
  activeGameId: number;
  activeView: AppView;
};

export const allOpponents = [
  oneWeapon,
  beatLast,
  randomAlternate,
  twoWeapons,
  mostWinning
];

export const initialState: State = {
  games: allOpponents.map(op => initGame(op)),
  activeGameId: 0,
  activeView: AppView.Intro
};
