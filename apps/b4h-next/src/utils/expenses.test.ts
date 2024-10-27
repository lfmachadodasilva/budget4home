import { getDateFromQuery } from './expenses';

describe('utils>expenses', () => {
  describe('getDateFromQuery', () => {
    test('default params', () => {
      // arrange
      const today = new Date();
      // act
      const result = getDateFromQuery();
      // assert
      expect(result.getFullYear()).toBe(today.getFullYear());
      expect(result.getMonth()).toBe(today.getMonth());
    });

    test.each([
      ['2000', '01'],
      ['2001', '06'],
      ['2002', '12']
    ])('with valid params', (year, month) => {
      // act
      const result = getDateFromQuery(year, month);
      // assert
      expect(result.getFullYear()).toBe(+year);
      expect(result.getMonth()).toBe(+month - 1);
    });

    test.each([
      ['test', '01'],
      ['2001', 'test']
    ])('with invalid params', (year, month) => {
      // act & assert
      expect(() => {
        getDateFromQuery(year, month);
      }).toThrow('getDateFromQuery: Invalid date');
    });
  });
});
