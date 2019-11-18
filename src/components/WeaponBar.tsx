import { Dispatch } from 'redux'
import { action } from 'typesafe-actions'
import React from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import { RootAction } from '../game/reducer'
import { BATTLE_OPPONENT } from '../constants'
import { State } from '../game/state'
import { isGameFinished } from '../game/game'
import { WeaponButton } from './WeaponButton'
import { Weapon } from '../game/types'

const mapStateToProps = (state: State) => ({
  isFinished: isGameFinished(state.games[state.activeGameId]),
})

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  onClick: (weapon: Weapon) => () => dispatch(action(BATTLE_OPPONENT, { me: weapon })),
})

type WeaponBarProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const _WeaponBar: React.FC<WeaponBarProps> = ({ isFinished, onClick }) => (
  <Container>
    <Row style={{ justifyContent: 'center' }}>
      <WeaponButton weapon={Weapon.Rock} onClick={onClick} disabled={isFinished} />
      <WeaponButton weapon={Weapon.Paper} onClick={onClick} disabled={isFinished} />
      <WeaponButton weapon={Weapon.Scissors} onClick={onClick} disabled={isFinished} />
    </Row>
  </Container>
)

export const WeaponBar = connect(mapStateToProps, mapDispatchToProps)(_WeaponBar)
