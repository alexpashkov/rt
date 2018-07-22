/* eslint react/prop-types: 0 */ // prop-actionTypes are set in the container component
import React from 'react';
import { PanelWrapper } from '../../../components/Panel';
import { Header, Main, Wrapper, ButtonsWrapper } from "./styled"

import Button from '../../../components/Button';
import PlayersList from './PlayersList';
import GameChat from './GameChat/GameChatContainer';

const GameLobby = ({
  userId,
  currentGameInfo: { id, leaderId, players },
  handleGameStart,
  goToLobby
}) => (
  <div
    css={`
      display: flex;
      flex-direction: column;
      width: 100%;
    `}
  >
    <Header>
      <h1>Welcome to the game {id}!</h1>
      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <p>Waiting while everybody is ready...</p>
        <ButtonsWrapper>
            <Button size="lg" onClick={goToLobby}>Go Back</Button>
            {userId === leaderId && (
                <Button color="primary" size="lg" onClick={handleGameStart}>
                  Start Game
                </Button>
            )}
        </ButtonsWrapper>
      </div>
    </Header>
    <Main>
      <PanelWrapper
        css={`
          flex-grow: 1;
          margin-bottom: 10px;
        `}
      >
        <PlayersList players={players} leaderId={leaderId} />
      </PanelWrapper>
      <PanelWrapper
        css={`
          margin-bottom: 10px;
        `}
      >
        <GameChat />
      </PanelWrapper>
    </Main>
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
