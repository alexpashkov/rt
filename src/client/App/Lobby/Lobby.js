import React from "react";
import PropTypes from "prop-types";
import LobbyHeader from "./LobbyHeader";
import LobbyGamesList from "./LobbyGamesList";

const Lobby = ({
    requestGameStart
               }) => (
    <React.Fragment>
        <LobbyHeader
            onGameStartRequest={requestGameStart}
        />
        <LobbyGamesList/>
    </React.Fragment>
);

Lobby.propTypes = {
    requestGameStart: PropTypes.func.isRequired
}

export default Lobby;

