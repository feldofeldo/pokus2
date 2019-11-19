import React from 'react';
import Button from 'react-bootstrap/Button';
import CSS from 'csstype';
import { RootAction } from '../game/reducer';
import { weaponToString } from '../utils';
import { Weapon } from '../game/types';

const buttonStyle: CSS.Properties = {
  margin: '10px'
};

type Props = {
  weapon: Weapon;
  onClick: (weapon: Weapon) => () => RootAction;
  disabled: boolean;
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'link'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-dark'
    | 'outline-light';
};

export const WeaponButton: React.FC<Props> = ({
  weapon,
  onClick,
  disabled,
  variant
}) => (
  <Button
    style={buttonStyle}
    variant={variant}
    size="lg"
    onClick={onClick(weapon)}
    disabled={disabled}
  >
    {weaponToString(weapon)}
  </Button>
);
