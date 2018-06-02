import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const StyledWrapper = styled.div`
  display: flex;
  background-color: red;
`;

const GamesListItem = ({ id, players, isRunning }) => (
  <StyledWrapper>
    {id}
    {players && players.length ? players : 'No players'}
    {isRunning}
  </StyledWrapper>
);

GamesListItem.propTypes = {
  id: PropTypes.string.isRequired,
  players: PropTypes.array.isRequired,
  isRunning: PropTypes.bool
};

export default GamesListItem;
