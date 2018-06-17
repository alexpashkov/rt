/* eslint react/prop-types: 0 */ // prop-actionTypes are set in the container component
import React from 'react';
import styled from 'react-emotion';

import Button from '../../../components/Button';
import PlayersList from './PlayersList';
import GameChat from './GameChat/GameChatContainer';
import { PanelWrapper, panelCss } from '../../../components/Panel';

const Header = styled.header`
  ${panelCss};
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  flex-shrink: 0;
`;

const Main = styled.main`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Wrapper = styled.section`
  ${panelCss};
  flex-grow: 1;
`;
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
        {userId === leaderId && (
          <Button color="primary" size="lg" onClick={handleGameStart}>
            Start Game
          </Button>
        )}
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
