import React from 'react'
import Table from 'react-bootstrap/Table'
import { connect } from 'react-redux'
import { State } from '../game/state'
import { NUM_ROUNDS } from '../constants'

const mapStateToProps = (state: State) => ({
  stats: state.games[state.activeGameId].stats,
})

type GameStatsProps = ReturnType<typeof mapStateToProps>

export const _GameStats: React.FC<GameStatsProps> = ({ stats }) => (
  <Table bordered hover>
    <thead>
      <tr>
        <th>
          Total Rounds:
          {' '}
          {stats.rounds}
          {' '}
        </th>
        <th>Wins</th>
        <th>Losses</th>
        <th>Draws</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th><b>Current</b></th>
        <th>{stats.current.wins}</th>
        <th>{stats.current.losses}</th>
        <th>{stats.current.draws}</th>
        <th>
          {stats.current.score}
          {' '}
/
          {' '}
          {NUM_ROUNDS}
        </th>
      </tr>
      <tr>
        <th><b>Best</b></th>
        <th>{stats.best.wins}</th>
        <th>{stats.best.losses}</th>
        <th>{stats.best.draws}</th>
        <th>
          {stats.best.score}
          {' '}
/
          {' '}
          {NUM_ROUNDS}
        </th>
      </tr>
    </tbody>
  </Table>
)

export const GameStats = connect(mapStateToProps)(_GameStats)
