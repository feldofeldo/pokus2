// GAME LOGIC

export enum Weapon {
  Rock = 0,
  Paper = 1,
  Scissors = 2
}

export enum BattleResult {
  Win = 'ResultWin',
  Draw = 'ResultDraw',
  Loss = 'ResultLoss'
}

export type Battle = {
  me: Weapon;
  opponent: Weapon;
  result: BattleResult;
};

export type BasicStats = {
  wins: number;
  draws: number;
  losses: number;
  score: number;
};

export type GameStats = {
  current: BasicStats;
  best: BasicStats;
  rounds: number;
};

export const initialBasicStats: BasicStats = {
  wins: 0,
  draws: 0,
  losses: 0,
  score: 0
};

export const initialStats: GameStats = {
  current: initialBasicStats,
  best: initialBasicStats,
  rounds: 0
};

export type BattleHistory = Battle[];

export interface Opponent {
  name: string;
  generateWeapon: (history: BattleHistory) => Weapon;
  state?: any;
}

export type Game = {
  opponentId: number;
  history: BattleHistory;
  stats: GameStats;
};

export const initGame = (opponentId: number) => ({
  opponentId,
  history: [],
  stats: initialStats
});

// VIEWS

export enum AppView {
  Intro = 'AppViewIntro',
  Basic = 'AppViewBasic',
  BasicWithModal = 'AppViewBasicWithModal',
  Game = 'AppViewGame'
}
