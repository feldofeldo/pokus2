import React from 'react';
import { BattleResult } from '../game/types';
import { resultToString } from '../utils';

type Props = {
  result: BattleResult;
};

export const ColoredResultCell: React.FC<Props> = ({ result }) => {
  const color =
    result === BattleResult.Win
      ? 'LightGreen'
      : result === BattleResult.Draw
      ? 'PaleGoldenRod'
      : 'Tomato';
  return <th style={{ backgroundColor: color }}>{resultToString(result)}</th>;
};
