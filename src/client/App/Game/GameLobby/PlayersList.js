import React from 'react';
import PropTypes from 'prop-types';
import { Table, Head, Body, Row, Cell } from '../../../components/Table';

const PlayersList = ({ players = [], leaderId }) => (
  <Table
    css={`
      width: 100%;
    `}
  >
    <Head>
      <Row>
        <Cell colspan={2}>Players</Cell>
        <Cell />
      </Row>
    </Head>
    <Body>
      {players.map(({ login }) => (
        <Row key={login}>
          <Cell>{login}</Cell>
          <Cell>{login === leaderId && 'L'}</Cell>
        </Row>
      ))}
    </Body>
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
