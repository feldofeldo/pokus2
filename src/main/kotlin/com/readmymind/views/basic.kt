package com.readmymind.views

import com.readmymind.*
import pl.treksoft.kvision.core.Container
import pl.treksoft.kvision.html.ButtonStyle
import pl.treksoft.kvision.html.button
import pl.treksoft.kvision.html.h1
import pl.treksoft.kvision.panel.FlexAlignItems
import pl.treksoft.kvision.panel.vPanel
import pl.treksoft.kvision.table.TableType
import pl.treksoft.kvision.table.cell
import pl.treksoft.kvision.table.row
import pl.treksoft.kvision.table.table

fun Container.basicView(state: State) {
    vPanel(spacing = 20, alignItems = FlexAlignItems.CENTER) {
        h1("Summary")
        table(
                listOf("Opponent", "Last Wins", "Last Draws", "Last Losses", "Last Score", "Best Wins",
                        "Best Draws", "Best Losses", "Best Score", "Rounds Played", ""),
                setOf(TableType.HOVER, TableType.STRIPED)
        ) {
            state.games.forEachIndexed { i, game ->
                row {
                    cell((i + 1).toString())
                    cell(game.stats.wins.toString())
                    cell(game.stats.draws.toString())
                    cell(game.stats.losses.toString())
                    cell("${game.stats.score}/$NUM_GAMES")
                    cell(game.stats.bestWins.toString())
                    cell(game.stats.bestDraws.toString())
                    cell(game.stats.bestLosses.toString())
                    cell("${game.stats.bestScore}/$NUM_GAMES")
                    cell(game.rounds.toString())
                    cell {
                        button("", "fas fa-arrow-right") {
                            onClick { store.dispatch(Action.SwitchViewToGame(i)) }
                        }
                    }
                }
            }
        }
    }
}