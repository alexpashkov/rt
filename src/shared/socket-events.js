module.exports = {
  client: {
    ROOM_CREATE: 'ROOM_CREATE',
    ROOM_JOIN: 'ROOM_JOIN',
    ROOM_LEAVE: 'ROOM_LEAVE',
    ROOM_CHAT_MESSAGE: 'ROOM_CHAT_MESSAGE',
    ROOMS_UPDATE_REQUEST: 'ROOMS_UPDATE_REQUEST',

    GAME_START: 'GAME_START',
    GAME_PIECE_MOVE: 'GAME_PIECE_MOVE',
    GAME_PIECE_DROP: 'GAME_PIECE_DROP',
    GAME_PIECE_ROTATE: 'GAME_PIECE_ROTATE'
  },
  server: {
    USER_CONNECTED: 'PLAYER_CONNECTED',
    ROOMS_UPDATE: 'ROOMS_UPDATE',
    ROOM_CHAT_MESSAGE: 'ROOM_CHAT_MESSAGE',
    ROOM_INFO_UPDATE: 'ROOM_INFO_UPDATE',
    GAME_STARTED: 'GAME_STARTED',
    GAME_PIECE_CURRENT: 'GAME_PIECE_CURRENT',
    GAME_BOARD_CURRENT: 'GAME_BOARD_CURRENT',
    GAME_PLAYER_DISCONNECTED: 'GAME_PLAYER_DISCONNECTED',
  }
};
