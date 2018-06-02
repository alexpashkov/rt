import React from "react";

import socket from "../../socket";

import LobbyHeader from "./LobbyHeader";
import LobbyGamesList from "./LobbyGamesList";
import { CLIENT_EVENTS } from "../../../shared/types";

const Lobby = () => (
  <React.Fragment>
    <LobbyHeader
      handleGameStartRequest={() =>
        socket.emit(CLIENT_EVENTS.GAME_START_REQUEST)
      }
    />
    <LobbyGamesList />
  </React.Fragment>
);

export default Lobby;
