import { action } from 'typesafe-actions';
import {
  RESET_STATE,
  BATTLE_OPPONENT,
  CHANGE_OPPONENT,
  INCREMENT_OPPONENT,
  DECREMENT_OPPONENT,
  SWITCH_VIEW_TO_BASIC,
  SWITCH_VIEW_TO_GAME,
  RESET_OPPONENT,
  RESET_STATE_MODAL,
  SWITCH_VIEW_TO_INTRO
} from '../constants';
import { Weapon } from './types';

export const resetState = () => action(RESET_STATE);
export const resetStateModal = () => action(RESET_STATE_MODAL);
export const battleOpponent = (me: Weapon) => action(BATTLE_OPPONENT, { me });
export const changeOpponent = (newId: number) =>
  action(CHANGE_OPPONENT, { newId });
export const incrementOpponent = () => action(INCREMENT_OPPONENT);
export const decrementOpponent = () => action(DECREMENT_OPPONENT);
export const switchViewToBasic = () => action(SWITCH_VIEW_TO_BASIC);
export const switchViewToGame = (gameId: number) =>
  action(SWITCH_VIEW_TO_GAME, { gameId });
export const switchViewToIntro = () => action(SWITCH_VIEW_TO_INTRO);
export const resetOpponent = () => action(RESET_OPPONENT);
