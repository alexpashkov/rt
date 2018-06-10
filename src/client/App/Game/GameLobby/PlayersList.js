import React from 'react';
import PropTypes from 'prop-types';
import { Table, Row, Cell } from '../../../components/Table';

const PlayersList = ({ players = [], leaderId }) => (
  <Table
    css={`
      width: 100%;
    `}
  >
    {players.map(({ login }) => (
      <Row key={login}>
        <Cell>{login}</Cell>
        <Cell>{login === leaderId && 'L'}</Cell>
      </Row>
    ))}
  </Table>
);

PlayersList.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      login: PropTypes.string
    })
  ),
  leaderId: PropTypes.string
};

export default PlayersList;
