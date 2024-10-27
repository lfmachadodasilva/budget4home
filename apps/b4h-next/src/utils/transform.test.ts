import { removeNullAndUndefined } from './transform';

describe('removeNullAndUndefined', () => {
  it('should remove null and undefined values from the object', () => {
    // arrange
    const input = {
      a: 1,
      b: null,
      c: undefined,
      d: 'test',
      e: false
    };
    const expectedOutput = {
      a: 1,
      d: 'test',
      e: false
    };
    // act & assert
    expect(removeNullAndUndefined(input)).toEqual(expectedOutput);
  });

  it('should return an empty object if all values are null or undefined', () => {
    // arrange
    const input = {
      a: null,
      b: undefined
    };
    const expectedOutput = {};
    // act & assert
    expect(removeNullAndUndefined(input)).toEqual(expectedOutput);
  });

  it('should return the same object if there are no null or undefined values', () => {
    // arrange
    const input = {
      a: 1,
      b: 'test',
      c: true
    };
    const expectedOutput = {
      a: 1,
      b: 'test',
      c: true
    };
    // act & assert
    expect(removeNullAndUndefined(input)).toEqual(expectedOutput);
  });
});
