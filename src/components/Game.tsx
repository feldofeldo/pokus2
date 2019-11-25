import React from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { State } from '../game/state';
import { GameStats } from './GameStats';
import { WeaponBar } from './WeaponBar';
import { GameControls } from './GameControls';
import { HistoryTable } from './HistoryTable';
import { getActiveOpponent } from '../game/utils';
import { OpponentSpan } from './OpponentSpan';

const mapStateToProps = (state: State) => ({
  opponent: getActiveOpponent(state)
});

type Props = ReturnType<typeof mapStateToProps>;

const _Game: React.FC<Props> = ({ opponent }) => (
  <Container>
    <Row style={{ justifyContent: 'center' }}>
      <h1>
        <OpponentSpan opponent={opponent} />
      </h1>
    </Row>
    <Row>
      <Col>
        <GameStats />
        <GameControls />
        <hr />
        <WeaponBar />
      </Col>
      <Col>
        <HistoryTable />
      </Col>
    </Row>
  </Container>
);

export const Game = connect(mapStateToProps)(_Game);
