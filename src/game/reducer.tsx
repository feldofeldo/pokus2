import { ActionType, Reducer } from 'typesafe-actions';
import * as actions from './actions';
import { State, initialState } from './state';
import {
  generateWeapon,
  replaceGame,
  addBattleToGame,
  resetGame
} from './game';
import {
  RESET_STATE,
  BATTLE_OPPONENT,
  CHANGE_OPPONENT,
  INCREMENT_OPPONENT,
  DECREMENT_OPPONENT,
  SWITCH_VIEW_TO_GAME,
  SWITCH_VIEW_TO_BASIC,
  RESET_OPPONENT,
  RESET_STATE_MODAL,
  SWITCH_VIEW_TO_INTRO
} from '../constants';
import { AppView } from './types';

export type RootAction = ActionType<typeof actions>;

export const reducer: Reducer<State, RootAction> = (
  state: State = initialState,
  action: RootAction
) => {
  switch (action.type) {
    case RESET_STATE:
      return { ...initialState, activeView: AppView.Basic };

    case RESET_STATE_MODAL:
      return { ...state, activeView: AppView.BasicWithModal };

    case BATTLE_OPPONENT: {
      const opponent = generateWeapon(state.games[state.activeGameId]);
      const games = replaceGame(
        state.games,
        state.activeGameId,
        addBattleToGame(action.payload.me, opponent)
      );
      return { ...state, games };
    }
    case CHANGE_OPPONENT:
      return {
        ...state,
        activeGameId:
          (action.payload.newId + state.games.length) % state.games.length
      };

    case INCREMENT_OPPONENT:
      return reducer(state, actions.changeOpponent(state.activeGameId + 1));

    case DECREMENT_OPPONENT:
      return reducer(state, actions.changeOpponent(state.activeGameId - 1));

    case SWITCH_VIEW_TO_BASIC:
      return { ...state, activeView: AppView.Basic };

    case SWITCH_VIEW_TO_INTRO:
      return { ...state, activeView: AppView.Intro };

    case SWITCH_VIEW_TO_GAME:
      return {
        ...state,
        activeView: AppView.Game,
        activeGameId: action.payload.gameId
      };

    case RESET_OPPONENT:
      return {
        ...state,
        games: replaceGame(state.games, state.activeGameId, resetGame)
      };
    default:
      return state;
  }
};
