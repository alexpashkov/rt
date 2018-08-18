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