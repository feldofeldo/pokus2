package com.readmymind.opponents

import com.readmymind.History
import com.readmymind.Weapon
import com.readmymind.randomPopulation
import com.readmymind.randomUniform

class TwoWeapons : Opponent {
    private fun initChosenWeapons() = when (randomUniform()) {
        Weapon.ROCK -> listOf(1, 1, 0)
        Weapon.SCISSORS -> listOf(1, 0, 1)
        Weapon.PAPER -> listOf(0, 1, 1)
    }
    private var chosenWeapons = initChosenWeapons()
    override fun generateWeapon(history: History): Weapon {
        return randomPopulation(chosenWeapons[0], chosenWeapons[1], chosenWeapons[2])
    }

    override fun reset() {
        chosenWeapons = initChosenWeapons()
    }
}