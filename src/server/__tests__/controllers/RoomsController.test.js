const RoomsController = require('../../controllers/RoomsController');
const MainController = require('../../controllers/MainController');
const EventEmitter = require('events');

describe('RoomsController', () => {
    it('does not throw', () => {
        require('../../controllers/RoomsController');
    });

   describe('room creation/deletion', () => {
       let roomId;

       beforeEach(() => {
           roomId = RoomsController.createRoom();
       });

       it('successfully creates a room', () => {
           expect(roomId).toBeTruthy();
       });

       it('may retrieve room by ID', () => {
           expect(RoomsController.getRoomById(roomId)).toBeTruthy();
       });

       it('returns undefined for unknown key', () => {
           expect(RoomsController.getRoomById('wtf')).toBeUndefined();
       });

       it('destroys the room by ID', () => {
           RoomsController.deleteRoom(roomId);
           expect(RoomsController.getRoomById(roomId)).toBeFalsy();
       });

       it('does not throw deleting unknown room', () => {
           RoomsController.deleteRoom('wtf');
       });

       it('gives you relevant information about all the rooms', () => {
           expect(RoomsController.getRooms().filter(room => room.id === roomId)).toHaveLength(1);
           RoomsController.deleteRoom(roomId);
           expect(RoomsController.getRooms().filter(room => room.id === roomId)).toHaveLength(0);
       });
   });

   describe('player interaction', () => {
        let roomId,
            mockPlayerList,
            eventEmitterMocks;

        beforeEach(() => {
            roomId = RoomsController.createRoom();
            eventEmitterMocks = [1, 2, 3, 4, 5].map(() => new EventEmitter());
            mockPlayerList = eventEmitterMocks.map((emitter, i) =>
                new MainController(emitter, `${i}`));
        });

        afterEach(() => {
            eventEmitterMocks.map(emitter => emitter.removeAllListeners());
        });

        it('allows single user to join the room', () => {
            expect(RoomsController.joinRoom(roomId, mockPlayerList[0])).toBe(true);
        });

        it('allows multiple users to join the same room', () => {
            expect(RoomsController.joinRoom(roomId, mockPlayerList[0])).toBe(true);
            expect(RoomsController.joinRoom(roomId, mockPlayerList[1])).toBe(true);
            expect(RoomsController.joinRoom(roomId, mockPlayerList[2])).toBe(true);
            expect(RoomsController.joinRoom(roomId, mockPlayerList[3])).toBe(true);
            expect(RoomsController.joinRoom(roomId, mockPlayerList[4])).toBe(true);
        });

        it('allows single user to leave the room he joined before', () => {
            expect(RoomsController.joinRoom(roomId, mockPlayerList[0])).toBe(true);
            expect(RoomsController.leaveRoom(roomId, mockPlayerList[0].id)).toBe(true);
        });

        it('allows multiple users to leave the room they joined before', () => {
            expect(RoomsController.joinRoom(roomId, mockPlayerList[0])).toBe(true);
            expect(RoomsController.joinRoom(roomId, mockPlayerList[1])).toBe(true);
            expect(RoomsController.joinRoom(roomId, mockPlayerList[2])).toBe(true);
            expect(RoomsController.joinRoom(roomId, mockPlayerList[3])).toBe(true);
            expect(RoomsController.joinRoom(roomId, mockPlayerList[4])).toBe(true);

            expect(RoomsController.leaveRoom(roomId, mockPlayerList[0].id)).toBe(true);
            expect(RoomsController.leaveRoom(roomId, mockPlayerList[1].id)).toBe(true);
            expect(RoomsController.leaveRoom(roomId, mockPlayerList[2].id)).toBe(true);
            expect(RoomsController.leaveRoom(roomId, mockPlayerList[3].id)).toBe(true);
            expect(RoomsController.leaveRoom(roomId, mockPlayerList[4].id)).toBe(true);
        });

        it('does not allow to join the non-existent room', () => {
            expect(RoomsController.joinRoom('wtf', mockPlayerList[0])).toBe(false);
        });

        it('does not allow to join the room if the player is already in it', () => {
            expect(RoomsController.joinRoom(roomId, mockPlayerList[0])).toBe(true);
            expect(RoomsController.joinRoom(roomId, mockPlayerList[0])).toBe(false);
        });

        it('does not allow to leave the non-existent room', () => {
            expect(RoomsController.leaveRoom('wtf', mockPlayerList[0].id)).toBe(false);
        });

        it('does not allow to leave the room that player didn\'t join', () => {
            expect(RoomsController.leaveRoom(roomId, mockPlayerList[0].id)).toBe(false);
        });

       it('does not throw sending a chat message', () => {
           expect(RoomsController.joinRoom(roomId, mockPlayerList[0])).toBe(true);
           RoomsController.chatMessageSend(roomId, {message: 'ok', login: mockPlayerList.id});
       });

        describe('update subscription', () => {
            let subscriber;

            beforeEach(() => {
                subscriber = jest.fn();
                RoomsController.subscribeOnUpdates(subscriber);
            });

            it('updates subscriber at the moment of subscription', () => {
                expect(subscriber).toHaveBeenCalledTimes(1);
            });

            it('successfully unsubs subscriber', () => {
                expect(subscriber).toHaveBeenCalledTimes(1);

                RoomsController.unsubscribeOnUpdates(subscriber);
                expect(RoomsController.joinRoom(roomId, mockPlayerList[0])).toBe(true);
                expect(RoomsController.leaveRoom(roomId, mockPlayerList[0].id))
                expect(subscriber).toHaveBeenCalledTimes(1);
            });

            it('notifies subscribers when someone joins the room', () => {
                expect(RoomsController.joinRoom(roomId, mockPlayerList[0])).toBe(true);
                expect(subscriber).toHaveBeenCalledTimes(2);
            });

            it('notifies subscribers when someone leaves the room', () => {
                expect(RoomsController.joinRoom(roomId, mockPlayerList[0])).toBe(true);
                expect(RoomsController.leaveRoom(roomId, mockPlayerList[0].id)).toBe(true);
                expect(subscriber).toHaveBeenCalledTimes(3);
            });
        });
   });

});