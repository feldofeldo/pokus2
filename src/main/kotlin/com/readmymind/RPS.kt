package com.readmymind

import com.readmymind.opponents.Opponent
import kotlin.random.Random

enum class Weapon(val value: Int) {
    ROCK(0),
    PAPER(1),
    SCISSORS(2)
}

fun randomUniform(): Weapon = Weapon.values()[Random.nextInt(3)]
fun randomPopulation(rocks: Number, papers: Number, scissors: Number): Weapon {
    val sum = rocks.toDouble() + papers.toDouble() + scissors.toDouble()
    val rand = Random.nextDouble() * sum
    return when {
        rand < rocks.toDouble() -> Weapon.ROCK
        rand < rocks.toDouble() + papers.toDouble() -> Weapon.PAPER
        else -> Weapon.SCISSORS
    }
}

enum class Result {
    WIN, LOSS, DRAW
}

fun Weapon.fight(op: Weapon): Result {
    return when ((this.value - op.value + 3) % 3) {
        0 -> Result.DRAW
        1 -> Result.WIN
        2 -> Result.LOSS
        else -> throw ArithmeticException("Too many remainders. ${this} ${this.value} $op ${op.value}")
    }
}

fun Weapon.beatenBy(): Weapon {
    return when (this) {
        Weapon.ROCK -> Weapon.PAPER
        Weapon.PAPER -> Weapon.SCISSORS
        Weapon.SCISSORS -> Weapon.ROCK
    }
}

data class Battle(val p1: Weapon, val p2: Weapon, val result: Result)
typealias History = List<Battle>

fun History.count(w: Weapon) = fold(0) { sum, battle -> sum + if (battle.p1 == w) 1 else 0 }

fun History.addResult(p1: Weapon, p2: Weapon) = this + listOf(Battle(p1, p2, p1.fight(p2)))

const val NUM_GAMES = 20

data class Stats(
        val wins: Int = 0,
        val draws: Int = 0,
        val losses: Int = 0,
        val score: Double = 0.0,
        val bestWins: Int = 0,
        val bestDraws: Int = 0,
        val bestLosses: Int = 0,
        val bestScore: Double = 0.0
) {
    fun addResult(r: Result): Stats {
        return when (r) {
            Result.WIN -> copy(wins = wins + 1, score = score + 1)
            Result.DRAW -> copy(draws = draws + 1, score = score + 0.5)
            Result.LOSS -> copy(losses = losses + 1)
        }
    }

    fun checkBest(): Stats {
        return if (bestScore < score) {
            Stats(wins, draws, losses, score, wins, draws, losses, score)
        } else {
            this
        }
    }

    fun resetLast(): Stats = Stats(
            bestWins = bestWins, bestDraws = bestDraws, bestLosses = bestLosses, bestScore = bestScore)
}

data class Game(val opponent: Opponent, val history: History = listOf(), val rounds: Int = 0, val stats: Stats =
        Stats()) {
    fun generateWeapon(): Weapon = opponent.generateWeapon(history)
    fun addResult(p1: Weapon, p2: Weapon): Game {
        val newHistory = history.addResult(p1, p2)
        val result = newHistory.last().result
        return copy(history = newHistory, rounds = rounds + 1, stats = stats.addResult(result))
    }

    fun isFinished(): Boolean = history.size >= NUM_GAMES
    fun checkBest(): Game = copy(stats = stats.checkBest())
    fun reset(): Game = Game(opponent.also { it.reset() }, stats = stats.resetLast(), rounds = rounds)
}


typealias Games = List<Game>

fun Games.replaceGame(gameId: Int, func: (Game) -> Game) = mapIndexed { i, game ->
    if (i == gameId) func(game) else game
}

fun Games.addBattle(gameId: Int, p1: Weapon, p2: Weapon) = replaceGame(gameId) {it.addResult(p1, p2).checkBest()}

fun Games.isFinished(gameId: Int) = this[gameId].isFinished()

fun Games.resetGame(gameId: Int) = replaceGame(gameId) { it.reset() }
