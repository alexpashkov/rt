/* eslint react/prop-types: 0 */ // prop-types are set in the container component
import React from 'react';
import Button from '../../../components/Button';
import PlayersList from './PlayersList';

const GameLobby = ({
  userId,
  currentGameInfo: { id, leaderId, players },
  handleGameStart
}) => (
  <div
    css={`
      width: 100%;
    `}
  >
    <header>
      <h1>Welcome to the game {id}!</h1>
      <div
        css={`
          display: flex;
          justify-content: space-between;
        `}
      >
        <p>Waiting while everybody is ready...</p>
        {userId === leaderId && (
          <Button color="primary" onClick={handleGameStart}>
            Start Game
          </Button>
        )}
      </div>
    </header>
    <PlayersList players={players} leaderId={leaderId} />
  </div>
);

/*
{
  "id": "5olczw219qji1wokyp",
    "isRunning": false,
    "leaderId": "5olczw219qji1wojfl",
    "players": [
    {
      "login": "5olczw219qji1wojfl"
    }
  ],
    "chatHistory": []
}
*/

export default GameLobby;
