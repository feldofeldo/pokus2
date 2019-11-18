import Table from 'react-bootstrap/Table'
import React from 'react'
import { connect } from 'react-redux'
import { State } from '../game/state'
import { NUM_ROUNDS } from '../constants'
import { range, weaponToString, resultToString } from '../utils'
import { BattleHistory } from '../game/types'


type HistoryTableProps = {
  history: BattleHistory;
}

const _HistoryTable: React.FC<HistoryTableProps> = ({ history }) => (
  <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th>#</th>
        <th>Me</th>
        <th>Opponent</th>
        <th>Result</th>
      </tr>
    </thead>
    <tbody>
      {
        range(NUM_ROUNDS).map((i) => {
          if (i < history.length) {
            return (
              <tr>
                <th>{i + 1}</th>
                <th>{weaponToString(history[i].me)}</th>
                <th>{weaponToString(history[i].opponent)}</th>
                <th>{resultToString(history[i].result)}</th>
              </tr>
            )
          }
          return (
            <tr>
              <th>{i + 1}</th>
              <th> </th>
              <th> </th>
              <th> </th>
            </tr>
          )
        })
      }
    </tbody>
  </Table>
)

const mapStateToProps = (state: State) => ({ history: state.games[state.activeGameId].history })

export const HistoryTable = connect(mapStateToProps)(_HistoryTable)
