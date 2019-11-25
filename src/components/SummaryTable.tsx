import Table from 'react-bootstrap/Table';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Dispatch } from 'redux';
import { action } from 'typesafe-actions';
import { connect } from 'react-redux';
import { RootAction } from '../game/reducer';
import {
  SWITCH_VIEW_TO_GAME,
  TOTAL_ROUNDS,
  RESET_STATE,
  RESET_STATE_MODAL,
  SWITCH_VIEW_TO_BASIC,
  NUM_ROUNDS
} from '../constants';
import { State } from '../game/state';
import { AppView } from '../game/types';
import { getOpponent } from '../game/utils';
import { OpponentSpan } from './OpponentSpan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ScoreCell } from './ScoreCell';

const mapStateToProps = (state: State) => ({
  allStats: state.games.map(game => game.stats),
  allOpponents: state.games.map(game => getOpponent(game.opponentId)),
  showModal: state.activeView === AppView.BasicWithModal
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  onClickPlay: (i: number) => () =>
    dispatch(action(SWITCH_VIEW_TO_GAME, { gameId: i })),
  onClickModal: () => dispatch(action(RESET_STATE_MODAL)),
  onClickReset: () => dispatch(action(RESET_STATE)),
  onHide: () => dispatch(action(SWITCH_VIEW_TO_BASIC))
});

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

const _SummaryTable: React.FC<Props> = ({
  allStats,
  allOpponents,
  onClickPlay,
  onClickReset,
  onClickModal,
  showModal,
  onHide
}) => (
  <>
    <Table bordered striped hover>
      <thead>
        <tr>
          <th>Opponent</th>
          <th>Best Wins</th>
          <th>Best Losses</th>
          <th>Best Draws</th>
          <th>Best Score</th>
          <th>Total Rounds</th>
          <th>
            <Button
              variant="danger"
              onClick={onClickModal}
              style={{ margin: 'auto', display: 'block' }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>
        {allStats.map((stats, i) => (
          <tr>
            <th>
              <OpponentSpan opponent={allOpponents[i]} />
            </th>
            <th>{stats.best.wins}</th>
            <th>{stats.best.losses}</th>
            <th>{stats.best.draws}</th>
            <ScoreCell
              par={allOpponents[i].par}
              score={stats.best.score}
              total={NUM_ROUNDS}
            />
            <th>
              {stats.rounds} / {TOTAL_ROUNDS}
            </th>
            <th>
              <Button
                style={{ margin: 'auto', display: 'block' }}
                variant="primary"
                onClick={onClickPlay(i)}
                disabled={stats.rounds >= TOTAL_ROUNDS}
              >
                <FontAwesomeIcon icon={faPlay} />
              </Button>
            </th>
          </tr>
        ))}
        <tr style={{ backgroundColor: 'PaleTurquoise' }}>
          <th>
            <b>Sum</b>
          </th>
          <th>
            <b>{allStats.reduce((pv, cv) => cv.best.wins + pv, 0)}</b>
          </th>
          <th>
            <b>{allStats.reduce((pv, cv) => cv.best.losses + pv, 0)}</b>
          </th>
          <th>
            <b>{allStats.reduce((pv, cv) => cv.best.draws + pv, 0)}</b>
          </th>
          <ScoreCell
            score={allStats.reduce((pv, cv) => cv.best.score + pv, 0)}
            total={NUM_ROUNDS * allStats.length}
            par={allOpponents.reduce((pv, cv) => cv.par + pv, 0)}
          />

          <th>
            <b>
              {allStats.reduce((pv, cv) => cv.rounds + pv, 0)} /{' '}
              {TOTAL_ROUNDS * allStats.length}
            </b>
          </th>
          <th />
        </tr>
      </tbody>
    </Table>

    <Modal show={showModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Reset game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This will reset your whole progress and start a new game, are you sure
        you want to proceed?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onClickReset}>
          Reset Game
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);

export const SummaryTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(_SummaryTable);
