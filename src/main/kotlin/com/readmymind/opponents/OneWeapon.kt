package com.readmymind.opponents

import com.readmymind.History
import com.readmymind.Weapon
import com.readmymind.randomUniform

class OneWeapon : Opponent {
    override fun generateWeapon(history: History): Weapon {
        return if (history.isEmpty()) {
            randomUniform()
        } else {
            history.last().p2
        }
    }
}