import React from 'react';
import PropTypes from 'prop-types';
import { prop } from 'ramda';

import { Row, Cell } from '../../../components/Table';
import Button from '../../../components/Button';

const GamesListItem = ({ id, players, isRunning, handleGameJoin }) => (
  <Row>
    <Cell>Game {id}</Cell>
    <Cell>{isRunning ? 'Running' : 'Waiting for players'}</Cell>
    <Cell>
      {players && players.length
        ? players.map(prop('login')).join(', ')
        : 'No players'}
    </Cell>
    <Cell
      css={`
        width: 1px;
      `}
    >
      <Button size="sm" onClick={() => handleGameJoin(id)}>
        Join
      </Button>
    </Cell>
  </Row>
);

GamesListItem.propTypes = {
  id: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  isRunning: PropTypes.bool,
  handleGameJoin: PropTypes.func.isRequired
};

export default GamesListItem;
