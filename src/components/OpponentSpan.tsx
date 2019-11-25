import { Opponent } from '../game/types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  opponent: Opponent;
};

export const OpponentSpan: React.FC<Props> = ({ opponent }) => {
  return (
    <span>
      <FontAwesomeIcon icon={opponent.icon} /> {opponent.name}
    </span>
  );
};
