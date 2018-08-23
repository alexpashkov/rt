const MainController = require('../../controllers/MainController');
const EventEmitter = require('events');
const events = require('../../../shared/socket-events');

describe('MainController', () => {

   let MainControllerMock;
   const socketMock = new EventEmitter();

   it('instantiates successfully', () => {
       MainControllerMock = new MainController(socketMock, '1');
   });

   describe("MainController behavior", () => {

       it('has a method for successful response', () => {
           expect(MainControllerMock._respondSuccess(null)).toMatchObject({status: 'success'});
       });

       it('has a method for error response', () => {
           expect(MainControllerMock._respondError(null)).toMatchObject({status: 'error'});
       });

       it('setups event handlers', () => {
           MainControllerMock.setupEventHandlers();
       });

       it('creates room successfully', () => {
           const callback = jest.fn();
           MainControllerMock.onRoomCreate(callback);

           expect(callback.mock.calls.length).toBe(1);
           expect(callback.mock.calls[0][0]).toMatchObject({status: 'success'});
           expect(typeof callback.mock.calls[0][0].roomId).toBe('string');
       });

       it('should not create room while in game', () => {
           const callback = jest.fn();
           MainControllerMock.inGame = true;
           MainControllerMock.onRoomCreate(callback);

           expect(callback.mock.calls.length).toBe(1);
           expect(callback.mock.calls[0][0]).toMatchObject({status: 'error'});
           MainControllerMock.inGame = false;
       });

       it('should not create room while in one', () => {
           const callback = jest.fn();
           MainControllerMock.roomId = "ayy";
           MainControllerMock.onRoomCreate(callback);

           expect(callback.mock.calls.length).toBe(1);
           expect(callback.mock.calls[0][0]).toMatchObject({status: 'error'});
           MainControllerMock.roomId = null;
       });

       it('should successfully join an existing room', () => {
           const createCallback = jest.fn();
           const callback = jest.fn();
           MainControllerMock.onRoomCreate(createCallback);

           const roomId = createCallback.mock.calls[0][0].roomId;

           MainControllerMock.onRoomJoin({ id: roomId }, callback);

           expect(callback.mock.calls.length).toBe(1);
           expect(callback.mock.calls[0][0]).toMatchObject({status: 'success'});
           expect(callback.mock.calls[0][0].roomInfo).toBeTruthy();
           expect(typeof callback.mock.calls[0][0].roomInfo).toBe('object');
           expect(MainControllerMock.roomId).toBe(roomId);
           MainControllerMock.onRoomLeave({id: MainControllerMock.roomId});
       });

       it('should not join a non-existent room', () => {
           const callback = jest.fn();
           MainControllerMock.onRoomJoin({id: 'invalid'}, callback);
           expect(callback.mock.calls.length).toBe(1);
           expect(callback.mock.calls[0][0]).toMatchObject({status: 'error'});
       });

       it('should not join a room while in one already', () => {
           const createCallback = jest.fn();
           const callback = jest.fn();
           MainControllerMock.onRoomCreate(createCallback);
           const roomId = createCallback.mock.calls[0][0].roomId;


           MainControllerMock.roomId = "yes";
           MainControllerMock.onRoomJoin({ id: roomId }, callback);
           expect(callback.mock.calls.length).toBe(1);
           expect(callback.mock.calls[0][0]).toMatchObject({status: 'error'});
           MainControllerMock.roomId = null;
       });

       it('should not join a room while in game', () => {
           const createCallback = jest.fn();
           const callback = jest.fn();
           MainControllerMock.onRoomCreate(createCallback);
           const roomId = createCallback.mock.calls[0][0].roomId;


           MainControllerMock.inGame = true;
           MainControllerMock.onRoomJoin({id: roomId}, callback);
           expect(callback.mock.calls.length).toBe(1);
           expect(callback.mock.calls[0][0]).toMatchObject({status: 'error'});
           MainControllerMock.inGame = false;
       });

       it('should successfully leave a room previously joined', () => {
           const createCallback = jest.fn();
           const callback = jest.fn();
           MainControllerMock.onRoomCreate(createCallback);

           const roomId = createCallback.mock.calls[0][0].roomId;

           MainControllerMock.onRoomJoin({ id: roomId }, () => {});
           MainControllerMock.onRoomLeave({id: roomId}, callback);
           expect(callback.mock.calls.length).toBe(1);
           expect(callback.mock.calls[0][0]).toMatchObject({status: 'success'});
           expect(MainControllerMock.roomId).toBeFalsy();
       });

       it('should not leave a room while not in one', () => {
           const callback = jest.fn();

           MainControllerMock.onRoomLeave({id: 'yes'}, callback);
           expect(callback.mock.calls.length).toBe(1);
           expect(callback.mock.calls[0][0]).toMatchObject({status: 'error'});
       });

       it('should not leave a room that it doesn\'t belong to', () => {
           const createCallback = jest.fn();
           const callback = jest.fn();
           MainControllerMock.onRoomCreate(createCallback);

           const roomId = createCallback.mock.calls[0][0].roomId;

           MainControllerMock.onRoomJoin({ id: roomId }, () => {});
           MainControllerMock.onRoomLeave({id: `not${roomId}`}, callback);
           expect(callback.mock.calls.length).toBe(1);
           expect(callback.mock.calls[0][0]).toMatchObject({status: 'error'});

           MainControllerMock.onRoomLeave({id: roomId}, () => {});
       });

       it('should successfully ')

       describe('MainController\'s responses to events', () => {

           let initialHandlers = {};
           const handlerNames = ["onRoomCreate", "onRoomJoin", "onRoomLeave",
               "onRoomsUpdateRequest", "onChatMessageSend",
               "onGameStartRequest", "onGamePieceMove",
               "onGamePieceRotate", "onGamePieceDrop", "onGameLeave"];

           beforeAll(() => {
               handlerNames.forEach(handlerName => {
                   initialHandlers[handlerName] = MainControllerMock[handlerName];
                   MainControllerMock[handlerName] = jest.fn();
               });
               MainControllerMock.socket.removeAllListeners();
               MainControllerMock.setupEventHandlers();
           });

           it('responds to ROOM_CREATE event', () => {
               socketMock.emit(events.client.ROOM_CREATE);
               expect(MainControllerMock.onRoomCreate).toBeCalled();
           });

           it('responds to ROOM_JOIN event', () => {
               socketMock.emit(events.client.ROOM_JOIN);
               expect(MainControllerMock.onRoomJoin).toBeCalled();
           });

           it('responds to ROOM_LEAVE event', () => {
               socketMock.emit(events.client.ROOM_LEAVE);
               expect(MainControllerMock.onRoomLeave).toBeCalled();
           });

           it('responds to ROOMS_UPDATE_REQUEST event', () => {
               socketMock.emit(events.client.ROOMS_UPDATE_REQUEST);
               expect(MainControllerMock.onRoomsUpdateRequest).toBeCalled();
           });

           it('responds to ROOM_CHAT_MESSAGE event', () => {
               socketMock.emit(events.client.ROOM_CHAT_MESSAGE);
               expect(MainControllerMock.onChatMessageSend).toBeCalled();
           });

           it('responds to GAME_START event', () => {
               socketMock.emit(events.client.GAME_START);
               expect(MainControllerMock.onGameStartRequest).toBeCalled();
           });

           it('responds to GAME_PIECE_MOVE event', () => {
               socketMock.emit(events.client.GAME_PIECE_MOVE);
               expect(MainControllerMock.onGamePieceMove).toBeCalled();
           });

           it('responds to GAME_PIECE_ROTATE event', () => {
               socketMock.emit(events.client.GAME_PIECE_ROTATE);
               expect(MainControllerMock.onGamePieceRotate).toBeCalled();
           });

           it('responds to GAME_PIECE_DROP event', () => {
               socketMock.emit(events.client.GAME_PIECE_DROP);
               expect(MainControllerMock.onGamePieceDrop).toBeCalled();
           });

           it('responds to GAME_LEAVE event', () => {
               socketMock.emit(events.client.GAME_LEAVE);
               expect(MainControllerMock.onGameLeave).toBeCalled();
           });

           afterAll(() => {
               handlerNames.forEach(handlerName => {
                   MainControllerMock[handlerName] =
                       initialHandlers[handlerName].bind(MainControllerMock);
               });
               MainControllerMock.socket.removeAllListeners();
               MainControllerMock.setupEventHandlers();
           });
       });

   });
});