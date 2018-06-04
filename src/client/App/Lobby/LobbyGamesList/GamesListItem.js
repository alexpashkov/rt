import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Button from '../../../components/Button';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: red;
`;

const Cell = styled.div`
  &:not(:empty) {
    padding: 5px;
  }
`;

const GamesListItem = ({ id, players, isRunning }) => (
  <Wrapper>
    <Cell>Game {id}</Cell>
    <Cell>{isRunning ? 'Running' : 'Waiting for players'}</Cell>
    <Cell>{players && players.length ? players : 'No players'}</Cell>
    <Cell>
      <Button size="sm">Join</Button>
    </Cell>
  </Wrapper>
);

GamesListItem.propTypes = {
  id: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  isRunning: PropTypes.bool
};

export default GamesListItem;
