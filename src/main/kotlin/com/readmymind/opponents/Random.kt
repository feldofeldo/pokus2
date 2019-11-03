package com.readmymind.opponents

import com.readmymind.History
import com.readmymind.Weapon
import com.readmymind.randomUniform

class Random : Opponent {
    override fun generateWeapon(history: History): Weapon = randomUniform()
}