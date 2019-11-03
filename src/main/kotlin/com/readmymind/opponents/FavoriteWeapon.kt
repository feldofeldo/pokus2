package com.readmymind.opponents

import com.readmymind.History
import com.readmymind.Weapon
import com.readmymind.randomPopulation
import com.readmymind.randomUniform

class FavoriteWeapon : Opponent {
    private fun initChosenWeapons() = when (randomUniform()) {
        Weapon.ROCK -> listOf(2, 1, 1)
        Weapon.SCISSORS -> listOf(1, 1, 2)
        Weapon.PAPER -> listOf(1, 2, 1)
    }
    private var chosenWeapons = initChosenWeapons()
    override fun generateWeapon(history: History): Weapon {
        return randomPopulation(chosenWeapons[0], chosenWeapons[1], chosenWeapons[2])
    }

    override fun reset() {
        chosenWeapons = initChosenWeapons()
    }
}