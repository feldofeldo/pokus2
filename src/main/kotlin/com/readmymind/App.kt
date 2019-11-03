package com.readmymind

import com.readmymind.views.View
import com.readmymind.views.basicView
import com.readmymind.views.gameView
import pl.treksoft.kvision.Application
import pl.treksoft.kvision.panel.root
import pl.treksoft.kvision.panel.simplePanel
import pl.treksoft.kvision.startApplication
import pl.treksoft.kvision.state.stateBinding

class App : Application() {

    override fun start() {
        root("root") {
            simplePanel().stateBinding(store) {state ->
                when (state.activeView) {
                    View.Basic -> basicView(state)
                    View.Game -> gameView(state)
                }
            }
        }
    }
}

fun main() {
    startApplication(::App)
}
