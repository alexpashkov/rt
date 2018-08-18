const GamesController = require('../../controllers/GamesController');
const MainController = require('../../controllers/MainController');
const EventEmitter = require('events');

describe('GamesController', () => {
   it('does not throw', () => {
       require('../../controllers/GamesController');
   });

   describe('workflow', () => {
       let mockPlayer,
           game;

       beforeEach(() => {
           mockPlayer = new MainController(new EventEmitter(), 'a');
           game = GamesController.createGame('ok', [mockPlayer]);
       });

       it('successfully creates a game', () => {
           expect(game).toBeTruthy();
       });

       it('may create uniqid for the game if not specified', () => {
           expect(GamesController.createGame(undefined, [mockPlayer])).toBeTruthy();
       });

       it('accepts custom configuration', () => {
           expect(GamesController.createGame('oo', [mockPlayer], { method: () => true })).toBeTruthy();
       });

       it('may retrieve game by ID', () => {
           expect(GamesController.getGameById(game)).toBeTruthy();
       });

       it('returns undefined for unknown key', () => {
           expect(GamesController.getGameById('wtf')).toBeUndefined();
       });

       it('destroys the game by ID', () => {
           GamesController.deleteGame(game);
           expect(GamesController.getGameById(game)).toBeFalsy();
       });

       it('does not throw deleting unknown game', () => {
           GamesController.deleteGame('wtf');
       });
   });
});