const UserService = require('../../services/UserService');

describe('UserService', () => {
    it('does not throw', () => {
        expect(UserService).toBeTruthy();
    });

    it('initializes users list', () => {
        expect(UserService.users).toMatchObject({});
    });

    it('successfully creates user', () => {
        const userId = UserService.createUser();

        expect(userId).toBeTruthy();
        expect(typeof userId).toBe('string');
    });

    it('creates users with unique ids', () => {
        const users = Array(15).fill(0).map(_ => UserService.createUser());
        const uniqueOnly = users.filter(
            (val, idx, self) => self.indexOf(val) === idx);

        expect(users.length).toEqual(uniqueOnly.length);
    });

    it('allows to get users by id', () => {
        const userId = UserService.createUser();

        expect(UserService.getUserById(userId)).toBeTruthy();
    });

    it('successfully deletes users', () => {
        const userId = UserService.createUser();

        expect(UserService.getUserById(userId)).toBeTruthy();
        UserService.deleteUser(userId);
        expect(UserService.getUserById(userId)).toBeFalsy();
    });

    it('does nothing if unknown user is trying to be deleted', () => {
        const userId = UserService.createUser();

        UserService.deleteUser(`gibberish_${userId}`);
        expect(UserService.getUserById(userId)).toBeTruthy();
    });
});