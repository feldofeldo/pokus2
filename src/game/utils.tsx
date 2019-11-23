import { State, allOpponents } from './state';

export function getOpponent(opponentId: number) {
  return allOpponents[opponentId];
}

export function getActiveGame(state: State) {
  return state.games[state.activeGameId];
}

export function getActiveOpponent(state: State) {
  return getOpponent(getActiveGame(state).opponentId);
}
