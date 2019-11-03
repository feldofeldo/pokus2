package test.com.readmymind

import com.readmymind.Result
import com.readmymind.Weapon
import com.readmymind.fight
import pl.treksoft.kvision.test.SimpleSpec
import kotlin.test.Test
import kotlin.test.assertEquals

class RPS : SimpleSpec {

    @Test
    fun fight() {
        run {
            assertEquals(Weapon.ROCK.fight(Weapon.SCISSORS), Result.WIN)
            assertEquals(Weapon.ROCK.fight(Weapon.ROCK), Result.DRAW)
            assertEquals(Weapon.ROCK.fight(Weapon.PAPER), Result.LOSS)
            assertEquals(Weapon.PAPER.fight(Weapon.SCISSORS), Result.LOSS)
            assertEquals(Weapon.PAPER.fight(Weapon.ROCK), Result.WIN)
            assertEquals(Weapon.PAPER.fight(Weapon.PAPER), Result.DRAW)
            assertEquals(Weapon.SCISSORS.fight(Weapon.SCISSORS), Result.DRAW)
            assertEquals(Weapon.SCISSORS.fight(Weapon.ROCK), Result.LOSS)
            assertEquals(Weapon.SCISSORS.fight(Weapon.PAPER), Result.WIN)
        }
    }
}