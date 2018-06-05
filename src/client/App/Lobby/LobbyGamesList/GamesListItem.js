import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { prop } from 'ramda';

import Button from '../../../components/Button';

const Wrapper = styled.div`
  display: table-row;
  background-color: red;
`;

const Cell = styled.div`
  display: table-cell;
  padding: 5px 10px;
`;

const GamesListItem = ({ id, players, isRunning, handleGameJoin }) => (
  <Wrapper>
    <Cell>Game {id}</Cell>
    <Cell>{isRunning ? 'Running' : 'Waiting for players'}</Cell>
    <Cell>
      {players && players.length
        ? players.map(prop('login')).join(', ')
        : 'No players'}
    </Cell>
    <Cell css={`width: 1px`}>
      <Button size="sm" onClick={() => handleGameJoin(id)}>
        Join
      </Button>
    </Cell>
  </Wrapper>
);

GamesListItem.propTypes = {
  id: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  isRunning: PropTypes.bool,
  handleGameJoin: PropTypes.func.isRequired
};

export default GamesListItem;
