import React from 'react';
import Table from 'react-bootstrap/Table';
import { connect } from 'react-redux';
import { State } from '../game/state';
import { getActiveGame, getActiveOpponent } from '../game/utils';
import { ScoreCell } from './ScoreCell';
import { NUM_ROUNDS } from '../constants';

const mapStateToProps = (state: State) => ({
  stats: getActiveGame(state).stats,
  par: getActiveOpponent(state).par
});

type GameStatsProps = ReturnType<typeof mapStateToProps>;

export const _GameStats: React.FC<GameStatsProps> = ({ stats, par }) => (
  <Table bordered hover>
    <thead>
      <tr>
        <th>Total Rounds: {stats.rounds} </th>
        <th>Wins</th>
        <th>Losses</th>
        <th>Draws</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>
          <b>Current</b>
        </th>
        <th>{stats.current.wins}</th>
        <th>{stats.current.losses}</th>
        <th>{stats.current.draws}</th>
        <ScoreCell par={par} score={stats.current.score} total={NUM_ROUNDS} />
      </tr>
      <tr>
        <th>
          <b>Best</b>
        </th>
        <th>{stats.best.wins}</th>
        <th>{stats.best.losses}</th>
        <th>{stats.best.draws}</th>
        <ScoreCell par={par} score={stats.best.score} total={NUM_ROUNDS} />
      </tr>
    </tbody>
  </Table>
);

export const GameStats = connect(mapStateToProps)(_GameStats);
