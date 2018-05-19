import io from "socket.io-client";

import { queryString } from "./utils";

const socket = io.connect("", {
  query: queryString({ id: localStorage.getItem("playerId") })
});

window.socket = socket; // for debugging

export default socket;
