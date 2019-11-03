package com.readmymind.opponents

import com.readmymind.History
import com.readmymind.Weapon
import com.readmymind.randomPopulation
import com.readmymind.randomUniform

class Alternating : Opponent {
    override fun generateWeapon(history: History): Weapon {
        return if (history.isEmpty()) {
            randomUniform()
        } else {
            when (history.last().p2) {
                Weapon.ROCK -> randomPopulation(0, 1, 1)
                Weapon.PAPER -> randomPopulation(1, 0, 1)
                Weapon.SCISSORS -> randomPopulation(1, 1, 0)
            }
        }
    }
}