import { Weapon } from './types';
import { createAction } from 'typesafe-actions';

// ACTIONS
const RESET_STATE = 'resetState';
const RESET_STATE_MODAL = 'resetStateModal';
const BATTLE_OPPONENT = 'battleOpponent';
const CHANGE_OPPONENT = 'changeOpponent';
const INCREMENT_OPPONENT = 'incrementOpponent';
const DECREMENT_OPPONENT = 'decrementOpponent';
const SWITCH_VIEW_TO_BASIC = 'switchViewToBasic';
const SWITCH_VIEW_TO_GAME = 'switchViewToGame';
const SWITCH_VIEW_TO_INTRO = 'switchViewToIntro';
const RESET_OPPONENT = 'resetOpponent';

export const resetState = createAction(RESET_STATE)();
export const resetStateModal = createAction(RESET_STATE_MODAL)();
export const battleOpponent = createAction(BATTLE_OPPONENT)<Weapon>();
export const changeOpponent = createAction(CHANGE_OPPONENT)<number>();
export const incrementOpponent = createAction(INCREMENT_OPPONENT)();
export const decrementOpponent = createAction(DECREMENT_OPPONENT)();
export const switchViewToBasic = createAction(SWITCH_VIEW_TO_BASIC)();
export const switchViewToGame = createAction(SWITCH_VIEW_TO_GAME)<number>();
export const switchViewToIntro = createAction(SWITCH_VIEW_TO_INTRO)();
export const resetOpponent = createAction(RESET_OPPONENT)();
