import {compose, lifecycle, withHandlers} from "recompose";

import socketEvents from "../../../shared/types";
import socket from "../../socket";
import Lobby from "./Lobby";

export default compose(
    lifecycle({
        componentDidMount() {
            socket.on(socketEvents.server.GAMES_UPDATE, console.log);
        },
        componentWillUnmount() {
            socket.off(socketEvents.server.GAMES_UPDATE);
        }
    }),
    withHandlers({
        requestGameStart: () => () => socket.emit(socketEvents.client.GAME_START)
    })
)(Lobby);
