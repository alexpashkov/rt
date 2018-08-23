const User = require('../../models/User');

describe("User", () => {
    it('can be instantiated', () => {
        const user = new User('ayy');

        expect(user).toBeTruthy();
    });

    it('saves the id', () => {
        const user = new User('ayy');

        expect(user.id).toEqual('ayy');
    });

    it('allows to get login', () => {
        const user = new User('ayy');

        expect(user.getLogin()).toEqual('ayy');
    });

    it('allows to set login', () => {
        const user = new User('ayy');

        user.setLogin('lmao');
        expect(user.getLogin()).toEqual('lmao');
    });

    it('does not allow to set non-string login', () => {
        const user = new User('ayy');

        user.setLogin('login');
        expect(user.getLogin()).toEqual('login');
        user.setLogin(2);
        expect(user.getLogin()).toEqual('login');
    });

    it('returns id if login is not set', () => {
        const user = new User('id');

        user.setLogin('');
        expect(user.getLogin()).toEqual('id');
        user.setLogin('login');
        expect(user.getLogin()).toEqual('login');
    });

});