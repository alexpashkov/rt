import PropTypes from 'prop-types';

export default {
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
}
