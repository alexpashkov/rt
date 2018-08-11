import store from '../store';

describe('store', () => {
  describe('creates Redux store', () => {
    it('contains required methods', () => {
      const requiredMethods = 'dispatch getState subscribe'.split(' ');
      requiredMethods.forEach(method =>
        expect(typeof store[method]).toBe('function')
      );
    });
    it('getState returns an object', () => {
      expect(typeof store.getState()).toBe('object');
    });
    it('subsriber is called on dispatch', () => {
      const spy = jest.fn();
      const action = {
        type: 'TEST_ACTION'
      };

      store.subscribe(spy);
      store.dispatch(action);
      expect(spy).toHaveBeenCalled();
    });
  });
});
