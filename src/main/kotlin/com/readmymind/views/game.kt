package com.readmymind.views

import com.readmymind.*
import pl.treksoft.kvision.core.Container
import pl.treksoft.kvision.html.button
import pl.treksoft.kvision.html.h1
import pl.treksoft.kvision.html.h3
import pl.treksoft.kvision.panel.hPanel
import pl.treksoft.kvision.panel.vPanel
import pl.treksoft.kvision.table.TableType
import pl.treksoft.kvision.table.cell
import pl.treksoft.kvision.table.row
import pl.treksoft.kvision.table.table

fun Container.gameView(state: State) {
    hPanel(spacing = 50) {
        vPanel(spacing = 70) {
            h1("Opponent ${state.activeGameId + 1}")
            hPanel(spacing = 10) {
                button("ROCK", "fas fa-hand-rock", disabled = state.isActiveFinished()) {
                    onClick { store.dispatch(Action.BattleOpponent(Weapon.ROCK)) }
                }
                button("PAPER", "fas fa-hand-paper", disabled = state.isActiveFinished()) {
                    onClick { store.dispatch(Action.BattleOpponent(Weapon.PAPER)) }
                }
                button("SCISSORS", "fas fa-hand-scissors", disabled = state.isActiveFinished()) {
                    onClick { store.dispatch(Action.BattleOpponent(Weapon.SCISSORS)) }
                }
            }
            vPanel(spacing = 30) {
                hPanel(spacing = 30) {
                    button("Previous Opponent", "fas fa-chevron-left") {
                        onClick { store.dispatch(Action.DecrementOpponent) }
                    }
                    button("Next Opponent", "fas fa-chevron-right") {
                        onClick { store.dispatch(Action.IncrementOpponent) }
                    }

                }
                hPanel(spacing = 30) {
                    button("Back", "fas fa-arrow-left") {
                        onClick { store.dispatch(Action.SwitchViewToBasic) }
                    }
                    button("New Game", "fas fa-undo") {
                        onClick { store.dispatch(Action.ResetOpponent(state.activeGameId)) }
                    }
                }
                table(
                        listOf("", "Wins", "Draws", "Losses", "Score"),
                        setOf(TableType.BORDERED)
                ) {
                    val stats = state.activeGame().stats
                    row {
                        cell("Current")
                        cell(stats.wins.toString())
                        cell(stats.draws.toString())
                        cell(stats.losses.toString())
                        cell(stats.score.toString())
                    }
                    row {
                        cell("Best")
                        cell(stats.bestWins.toString())
                        cell(stats.bestDraws.toString())
                        cell(stats.bestLosses.toString())
                        cell(stats.bestScore.toString())
                    }
                }
                h3("Rounds played: ${state.activeGame().rounds}")
            }
        }
        vPanel(spacing = 30) {
            table(
                    listOf("Round", "Me", "Opponent", "Result"),
                    setOf(TableType.SMALL, TableType.BORDERED, TableType.HOVER, TableType.STRIPED)
            ) {
                for (i in 1..NUM_GAMES) {
                    row {
                        cell((i).toString())
                        if (i <= state.activeGame().history.size) {
                            val battle = state.activeGame().history[i - 1]
                            cell(battle.p1.toString())
                            cell(battle.p2.toString())
                            cell(battle.result.toString())
                        } else {
                            cell(" ")
                            cell(" ")
                            cell(" ")
                        }
                    }
                }
            }
        }
    }
}