import PropTypes from 'prop-types';

export default {
  userId: PropTypes.string,
  userBoard: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  currentPiece: PropTypes.shape({
    code: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  }),
  currentGameInfo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isRunning: PropTypes.bool.isRequired,
    leaderId: PropTypes.string.isRequired,
    players: PropTypes.arrayOf(
      PropTypes.shape({
        login: PropTypes.string.isRequired
      })
    ).isRequired,
    chatHistory: PropTypes.array.isRequired
  }),
  gameId: PropTypes.string.isRequired
};
