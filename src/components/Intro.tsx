import Container from 'react-bootstrap/Container';
import React, { Dispatch } from 'react';
import Row from 'react-bootstrap/Row';
import { TOTAL_ROUNDS, NUM_ROUNDS, SWITCH_VIEW_TO_BASIC } from '../constants';
import { RootAction } from '../game/reducer';
import { action } from 'typesafe-actions';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => ({
  onClick: () => dispatch(action(SWITCH_VIEW_TO_BASIC))
});

type IntroProps = ReturnType<typeof mapDispatchToProps>;

const _Intro: React.FC<IntroProps> = ({ onClick }) => (
  <Container>
    <Row style={{ justifyContent: 'center' }}>
      <h1 style={{ fontSize: 40 }}>Read My Mind</h1>
    </Row>
    <Row style={{ justifyContent: 'center' }}>
      <p>
        Welcome to a little game we call <b>Read My Mind</b>. You will be
        playing a classic game of rock-paper-scissors against multiple
        opponents. You can play up to {TOTAL_ROUNDS} rounds against each of the
        opponents. Your goal is to get the best possible score in a match
        consisting of {NUM_ROUNDS} single games against each of these opponents.{' '}
      </p>
      <p>
        Each opponent has its own strategy, which is only using the previous
        rounds of your current match and also randomness. Pay close attention to
        what they are doing, as only by fully understanding their strategy you
        will be able to get the best possible scores.
      </p>
    </Row>
    <Row>
      <p>
        Now, let us proceed to the summary screen, from where you will be able
        to control the whole game.
      </p>
    </Row>
    <Row style={{ justifyContent: 'center' }}>
      <Button onClick={onClick}>I AM READY!</Button>
    </Row>
  </Container>
);

export const Intro = connect(null, mapDispatchToProps)(_Intro);
