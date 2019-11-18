import React from 'react';
import { connect } from 'react-redux';
import { State } from '../game/state';
import { Game } from './Game';
import { Summary } from './Summary';
import { AppView } from '../game/types';
import { Intro } from './Intro';

const mapStateToProps = (state: State) => ({
  activeView: state.activeView
});

type Props = ReturnType<typeof mapStateToProps>;

const _MainView: React.FC<Props> = ({ activeView }) => {
  switch (activeView) {
    case AppView.Intro:
      return <Intro />;
    case AppView.Basic:
      return <Summary />;
    case AppView.BasicWithModal:
      return <Summary />;
    case AppView.Game:
      return <Game />;
    default:
      throw new Error('Switching enum');
  }
};

export const MainView = connect(mapStateToProps)(_MainView);
