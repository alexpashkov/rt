/* eslint react/prop-types: 0 */ // prop-types are set in the container component
import React from 'react';
import Button from '../../../components/Button';
import PlayersList from './PlayersList';
import GameChat from './GameChat/GameChatContainer';

const GameLobby = ({
  userId,
  currentGameInfo: { id, leaderId, players },
  handleGameStart
}) => (
  <div
    css={`
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-bottom: 10px;
    `}
  >
    <header
      css={`
        flex-shrink: 0;
      `}
    >
      <h1>Welcome to the game {id}!</h1>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <p>Waiting while everybody is ready...</p>
        {userId === leaderId && (
          <Button color="primary" size="lg" onClick={handleGameStart}>
            Start Game
          </Button>
        )}
      </div>
    </header>
    <main
      css={`
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      `}
    >
      <PlayersList players={players} leaderId={leaderId} />
      <GameChat
        css={`
          flex-basis: 30vh;
        `}
      />
    </main>
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
