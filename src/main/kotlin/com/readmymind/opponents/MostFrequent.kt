package com.readmymind.opponents

import com.readmymind.*

class MostFrequent : Opponent {
    override fun generateWeapon(history: History): Weapon {
        val rocks = history.count(Weapon.ROCK)
        val papers = history.count(Weapon.PAPER)
        val scissors = history.count(Weapon.SCISSORS)
        return when {
            rocks > papers && rocks > scissors -> Weapon.PAPER
            papers > rocks && papers > scissors -> Weapon.SCISSORS
            scissors > rocks && scissors > papers -> Weapon.ROCK
            rocks == papers && rocks == scissors -> randomUniform()
            rocks == papers -> randomPopulation(0.0, 1.0, 1.0)
            rocks == scissors -> randomPopulation(1.0, 1.0, 0.0)
            else -> randomPopulation(1.0, 0.0, 1.0)
        }
    }
}