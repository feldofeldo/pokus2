import React from 'react';
import { Weapon } from '../game/types';
import { weaponToString } from '../utils';

type Props = {
  weapon: Weapon;
};

export const ColoredWeaponCell: React.FC<Props> = ({ weapon }) => {
  const color =
    weapon === Weapon.Rock ? 'red' : weapon === Weapon.Paper ? 'green' : 'blue';
  return <th style={{ color }}>{weaponToString(weapon)}</th>;
};
