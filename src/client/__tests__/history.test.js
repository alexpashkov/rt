import history from '../history';

describe('history', () => {
  it('exports a history object', () => {
    expect(typeof history).toBe('object');
  });

  it('has required methods', () => {
    expect(typeof history.push).toBe('function');
    expect(typeof history.replace).toBe('function');
    expect(typeof history.go).toBe('function');
  });
});
