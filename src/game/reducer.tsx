import { ActionType, createReducer, Reducer } from 'typesafe-actions';
import * as actions from './actions';
import { State, initialState } from './state';
import {
  generateWeapon,
  replaceGame,
  addBattleToGame,
  resetGame
} from './game';
import { AppView } from './types';

export type RootAction = ActionType<typeof actions>;

export const reducer: Reducer<State, RootAction> = createReducer<
  State,
  RootAction
>(initialState)
  .handleAction(actions.resetState, state => ({ ...initialState }))
  .handleAction(actions.resetStateModal, state => ({
    ...state,
    activeView: AppView.BasicWithModal
  }))
  .handleAction(actions.battleOpponent, (state, action) => {
    const opponent = generateWeapon(state.games[state.activeGameId]);
    const games = replaceGame(
      state.games,
      state.activeGameId,
      addBattleToGame(action.payload, opponent)
    );
    return { ...state, games };
  })
  .handleAction(actions.changeOpponent, (state, action) => ({
    ...state,
    activeGameId: (action.payload + state.games.length) % state.games.length
  }))
  .handleAction(actions.incrementOpponent, state =>
    reducer(state, actions.changeOpponent(state.activeGameId + 1))
  )
  .handleAction(actions.decrementOpponent, state =>
    reducer(state, actions.changeOpponent(state.activeGameId - 1))
  )
  .handleAction(actions.switchViewToBasic, state => ({
    ...state,
    activeView: AppView.Basic
  }))
  .handleAction(actions.switchViewToIntro, state => ({
    ...state,
    activeView: AppView.Intro
  }))
  .handleAction(actions.switchViewToGame, (state, action) => ({
    ...state,
    activeView: AppView.Game,
    activeGameId: action.payload
  }))
  .handleAction(actions.resetOpponent, state => ({
    ...state,
    games: replaceGame(state.games, state.activeGameId, resetGame)
  }));
