package com.readmymind.opponents

import com.readmymind.History
import com.readmymind.Weapon

interface Opponent {
    fun generateWeapon(history: History) : Weapon
    fun reset() {}
}