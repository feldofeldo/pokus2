import React from 'react';

type Props = {
  par: number;
  score: number;
  total: number;
};

export const ScoreCell: React.FC<Props> = ({ par, score, total }) => {
  const style = score >= par ? { backgroundColor: 'LightGreen' } : {};
  return (
    <th style={style}>
      {score} / {total}
    </th>
  );
};
