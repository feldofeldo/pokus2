package com.readmymind.opponents

import com.readmymind.*

class Proportional : Opponent {
    override fun generateWeapon(history: History): Weapon {
        val rocks = history.count(Weapon.ROCK)
        val papers = history.count(Weapon.PAPER)
        val scissors = history.count(Weapon.SCISSORS)
        return randomPopulation(rocks.toDouble(), papers.toDouble(), scissors.toDouble()).beatenBy()
    }
}