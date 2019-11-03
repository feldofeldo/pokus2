package com.readmymind.opponents

import com.readmymind.History
import com.readmymind.Weapon
import com.readmymind.beatenBy
import com.readmymind.randomUniform

class BeatBeatLast : Opponent {
    override fun generateWeapon(history: History): Weapon {
        return if (history.isEmpty()) {
            randomUniform()
        } else {
            history.last().p1.beatenBy().beatenBy()
        }
    }
}