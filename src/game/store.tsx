import { createStore } from 'redux'
import { reducer } from './reducer'
import { initialState } from './state'

export const store = createStore(reducer, initialState)
