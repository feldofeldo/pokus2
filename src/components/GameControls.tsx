import React, { Dispatch } from 'react'
import { action } from 'typesafe-actions'
import CSS from 'csstype'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { RootAction } from '../game/reducer'
import {
  INCREMENT_OPPONENT,
  DECREMENT_OPPONENT,
  RESET_OPPONENT,
  SWITCH_VIEW_TO_BASIC,
} from '../constants'

const buttonStyle: CSS.Properties = {
  margin: '10px',
}

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  onClickNext: () => dispatch(action(INCREMENT_OPPONENT)),
  onClickPrevious: () => dispatch(action(DECREMENT_OPPONENT)),
  onClickReset: () => dispatch(action(RESET_OPPONENT)),
  onClickBack: () => dispatch(action(SWITCH_VIEW_TO_BASIC)),
})

type GameControlProps = ReturnType<typeof mapDispatchToProps>

const _GameControls: React.FC<GameControlProps> = ({
  onClickNext,
  onClickBack,
  onClickPrevious,
  onClickReset,
}) => (
  <Container>
    <Row style={{ justifyContent: 'center' }}>
      <Button style={buttonStyle} variant="secondary" onClick={onClickPrevious}>
        Previous Opponent
      </Button>
      <Button style={buttonStyle} variant="secondary" onClick={onClickNext}>
        Next Opponent
      </Button>
    </Row>
    <Row style={{ justifyContent: 'center' }}>
      <Button style={buttonStyle} variant="info" onClick={onClickReset}>
        Reset Game
      </Button>
      <Button style={buttonStyle} variant="info" onClick={onClickBack}>
        Back to summary
      </Button>
    </Row>
  </Container>
)

export const GameControls = connect(null, mapDispatchToProps)(_GameControls)
