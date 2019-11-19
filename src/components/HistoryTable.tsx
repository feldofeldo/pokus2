import Table from 'react-bootstrap/Table';
import React from 'react';
import { connect } from 'react-redux';
import { State } from '../game/state';
import { NUM_ROUNDS } from '../constants';
import { range } from '../utils';
import { BattleHistory } from '../game/types';
import { ColoredWeaponCell } from './ColoredWeaponCell';
import { ColoredResultCell } from './ColoredResultCell';

type HistoryTableProps = {
  history: BattleHistory;
};

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
      {range(NUM_ROUNDS).map(i => {
        if (i < history.length) {
          return (
            <tr>
              <th>{i + 1}</th>
              <ColoredWeaponCell weapon={history[i].me} />
              <ColoredWeaponCell weapon={history[i].opponent} />
              <ColoredResultCell result={history[i].result} />
            </tr>
          );
        }
        return (
          <tr>
            <th>{i + 1}</th>
            <th> </th>
            <th> </th>
            <th> </th>
          </tr>
        );
      })}
    </tbody>
  </Table>
);

const mapStateToProps = (state: State) => ({
  history: state.games[state.activeGameId].history
});

export const HistoryTable = connect(mapStateToProps)(_HistoryTable);
