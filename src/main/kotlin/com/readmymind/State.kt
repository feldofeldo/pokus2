package com.readmymind

import com.readmymind.opponents.*
import com.readmymind.views.View
import pl.treksoft.kvision.redux.RAction
import pl.treksoft.kvision.redux.createReduxStore

data class State(val games: List<Game>, val activeGameId: Int = 0, val activeView: View = View.Basic)

fun State.isActiveFinished(): Boolean = games.isFinished(activeGameId)
fun State.activeGame(): Game = games[activeGameId]

sealed class Action : RAction {
    data class AddBattle(val p1: Weapon, val p2: Weapon) : Action()
    data class BattleOpponent(val p1: Weapon) : Action()
    data class ChangeOpponent(val newId: Int) : Action()
    object IncrementOpponent : Action()
    object DecrementOpponent : Action()
    object SwitchViewToBasic : Action()
    data class SwitchViewToGame(val gameId: Int) : Action()
    object ResetState : Action()
    data class ResetOpponent(val gameId: Int) : Action()
}

fun reducer(state: State, action: Action): State = when (action) {
    is Action.AddBattle -> {
        state.copy(games = state.games.addBattle(state.activeGameId, action.p1, action.p2))
    }
    is Action.BattleOpponent -> {
        reducer(state, Action.AddBattle(action.p1, state.activeGame().generateWeapon()))
    }
    is Action.ChangeOpponent -> {
        when {
            action.newId < 0 -> reducer(state, Action.ChangeOpponent(action.newId + state.games.size))
            action.newId >= state.games.size -> reducer(state, Action.ChangeOpponent(action.newId - state.games.size))
            else -> state.copy(activeGameId = action.newId)
        }
    }
    is Action.IncrementOpponent -> reducer(state, Action.ChangeOpponent(state.activeGameId + 1))
    is Action.DecrementOpponent -> reducer(state, Action.ChangeOpponent(state.activeGameId - 1))
    is Action.SwitchViewToBasic -> state.copy(activeView = View.Basic)
    is Action.SwitchViewToGame -> reducer(state, Action.ChangeOpponent(action.gameId)).copy(activeView = View.Game)
    is Action.ResetState -> newState()
    is Action.ResetOpponent -> state.copy(games = state.games.resetGame(action.gameId))
}

val allOpponents = listOf(
        OneWeapon(),
        BeatLast(),
        TwoWeapons(),
        BeatBeatLast(),
        MostFrequent(),
        FavoriteWeapon(),
        Alternating(),
        Proportional(),
        Random()
)

fun newState() = State(allOpponents.map { Game(it) })

val store = createReduxStore(::reducer, newState())

