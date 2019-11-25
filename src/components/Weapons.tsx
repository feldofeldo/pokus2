import { Weapon } from '../game/types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHandRock,
  faHandPaper,
  faHandScissors
} from '@fortawesome/free-solid-svg-icons';
import { weaponToString } from '../utils';

type Props = {
  weapon: Weapon;
};

export const WeaponSpan: React.FC<Props> = ({ weapon }) => {
  const icon =
    weapon === Weapon.Rock
      ? faHandRock
      : weapon === Weapon.Paper
      ? faHandPaper
      : faHandScissors;
  return (
    <span>
      <FontAwesomeIcon icon={icon} /> {weaponToString(weapon)}
    </span>
  );
};
