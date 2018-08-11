import socket from '../socket';

it('expotrs socket', () => {
  'emit on'.split(' ').forEach(mehtod => {
    expect(typeof socket[mehtod]).toBe('function');
  });
});
