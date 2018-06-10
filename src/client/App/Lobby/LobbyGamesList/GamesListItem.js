import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { prop } from 'ramda';

import { panelCss } from '../../../components/Panel';

import Button from '../../../components/Button';

const Row = styled.div`
  ${panelCss};
  margin: 5px 0;
  display: flex;
  align-items: center;
  border-radius: ${props => props.theme.panel.borderRadius};
`;

const Cell = styled.div`
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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
        width: 70px;
        max-width: 70px;
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
