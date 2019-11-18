import React from 'react'
import Button from 'react-bootstrap/Button'
import CSS from 'csstype'
import { RootAction } from '../game/reducer'
import { weaponToString } from '../utils'
import { Weapon } from '../game/types'

const buttonStyle: CSS.Properties = {
  margin: '10px',
}

type Props = {
  weapon: Weapon;
  onClick: (weapon: Weapon) => () => RootAction;
  disabled: boolean;
}

export const WeaponButton: React.FC<Props> = ({ weapon, onClick, disabled }) => (
  <Button style={buttonStyle} variant="primary" size="lg" onClick={onClick(weapon)} disabled={disabled}>{weaponToString(weapon)}</Button>
)
