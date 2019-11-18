import React from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { State } from '../game/state'
import { GameStats } from './GameStats'
import { WeaponBar } from './WeaponBar'
import { GameControls } from './GameControls'
import { HistoryTable } from './HistoryTable'

const mapStateToProps = (state: State) => ({
  opponentName: state.games[state.activeGameId].opponent.name,
})

type Props = ReturnType<typeof mapStateToProps>

const _Game: React.FC<Props> = ({ opponentName }) => (
  <Container>
    <Row style={{ justifyContent: 'center' }}>
      <h1>
        {opponentName}
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

)

export const Game = connect(mapStateToProps)(_Game)
