import { format } from 'date-fns';
import { DATE_FORMAT } from './constants';
import { expensesByDate, expensesByLabel, formatValue, getDateFromQuery } from './expenses';

describe('utils>expenses', () => {
  describe('getDateFromQuery', () => {
    test('should return date with specified year and month', () => {
      // arrange
      const year = '2023';
      const month = '10';
      // act
      const date = getDateFromQuery(year, month);
      // assert
      expect(date.getFullYear()).toBe(2023);
      expect(date.getMonth()).toBe(9); // Months are 0-indexed in JavaScript
      expect(date.getDate()).toBe(1);
    });

    test('should return date with specified year only', () => {
      // arrange
      const year = '2023';
      const month = null;
      // act
      const date = getDateFromQuery(year, month);
      // assert
      expect(date.getFullYear()).toBe(2023);
      expect(date.getMonth()).toBe(new Date().getMonth());
      expect(date.getDate()).toBe(1);
    });

    test('should return date with specified month only', () => {
      // arrange
      const year = null;
      const month = '10';
      // act
      const date = getDateFromQuery(year, month);
      // assert
      expect(date.getFullYear()).toBe(new Date().getFullYear());
      expect(date.getMonth()).toBe(9); // months are 0-indexed in JavaScript
      expect(date.getDate()).toBe(1);
    });

    test('should return current date when no year and month are specified', () => {
      // arrange
      const year = null;
      const month = null;
      // act
      const date = getDateFromQuery(year, month);
      // assert
      const currentDate = new Date();
      expect(date.getFullYear()).toBe(currentDate.getFullYear());
      expect(date.getMonth()).toBe(currentDate.getMonth());
      expect(date.getDate()).toBe(1);
    });

    test('should throw error for invalid year', () => {
      // arrange
      const year = 'invalid';
      const month = '10';
      // act & assert
      expect(() => getDateFromQuery(year, month)).toThrow('getDateFromQuery: Invalid date');
    });

    test('should throw error for invalid month', () => {
      // arrange
      const year = '2023';
      const month = 'invalid';
      // act & assert
      expect(() => getDateFromQuery(year, month)).toThrow('getDateFromQuery: Invalid date');
    });
  });

  describe('formatValue', () => {
    test('formats whole number correctly', () => {
      expect(formatValue(500)).toBe('5');
    });

    test('formats decimal number correctly', () => {
      expect(formatValue(1234)).toBe('12.34');
    });

    test('removes trailing .00', () => {
      expect(formatValue(1000)).toBe('10');
    });

    test('formats zero correctly', () => {
      expect(formatValue(0)).toBe('0');
    });
  });

  describe('expensesByDate', () => {
    test('should return an empty object for an empty array', () => {
      // act
      const result = expensesByDate([]);
      // assert
      expect(result).toEqual({});
    });

    test('should group expenses by the same date', () => {
      // arrange
      const expenses = [
        { date: new Date('2023-10-01'), amount: 50, description: 'Groceries' },
        { date: new Date('2023-10-01'), amount: 20, description: 'Transport' }
      ];
      // act
      const result = expensesByDate(expenses);
      // assert
      const formattedDate = format(new Date('2023-10-01'), DATE_FORMAT);
      expect(result).toEqual({
        [formattedDate]: [
          { date: new Date('2023-10-01'), amount: 50, description: 'Groceries' },
          { date: new Date('2023-10-01'), amount: 20, description: 'Transport' }
        ]
      });
    });

    test('should group expenses by different dates', () => {
      // arrange
      const expenses = [
        { date: new Date('2023-10-01'), amount: 50, description: 'Groceries' },
        { date: new Date('2023-10-02'), amount: 20, description: 'Transport' }
      ];
      // act
      const result = expensesByDate(expenses);
      // assert
      const formattedDate1 = format(new Date('2023-10-01'), DATE_FORMAT);
      const formattedDate2 = format(new Date('2023-10-02'), DATE_FORMAT);
      expect(result).toEqual({
        [formattedDate1]: [{ date: new Date('2023-10-01'), amount: 50, description: 'Groceries' }],
        [formattedDate2]: [{ date: new Date('2023-10-02'), amount: 20, description: 'Transport' }]
      });
    });

    test('should handle expenses with different date formats', () => {
      // arrange
      const expenses = [
        { date: new Date('2023-10-01T00:00:00Z'), amount: 50, description: 'Groceries' },
        { date: new Date('2023-10-01T12:00:00Z'), amount: 20, description: 'Transport' }
      ];
      // act
      const result = expensesByDate(expenses);
      // assert
      const formattedDate = format(new Date('2023-10-01'), DATE_FORMAT);
      expect(result).toEqual({
        [formattedDate]: [
          { date: new Date('2023-10-01T00:00:00Z'), amount: 50, description: 'Groceries' },
          { date: new Date('2023-10-01T12:00:00Z'), amount: 20, description: 'Transport' }
        ]
      });
    });
  });

  describe('expensesByLabel', () => {
    test('should return an empty object when no expenses are provided', () => {
      // arrange
      const expenses = [];
      const labels = {};
      // act
      const result = expensesByLabel(expenses, labels);
      // assert
      expect(result).toEqual({});
    });

    test('should group expenses by label', () => {
      // arrage
      const expenses = [
        { id: 1, label: '1', value: 100 },
        { id: 2, label: '2', value: 200 },
        { id: 3, label: '1', value: 50 }
      ];
      const labels = {
        '1': { id: '1', name: 'Food', icon: '🍔' },
        '2': { id: '2', name: 'Transport', icon: '🚗' }
      };
      // act
      const result = expensesByLabel(expenses, labels);
      // assert
      expect(result).toEqual({
        '🍔 Food': [
          { id: 1, label: '1', value: 100 },
          { id: 3, label: '1', value: 50 }
        ],
        '🚗 Transport': [{ id: 2, label: '2', value: 200 }]
      });
    });

    test('should sort labels by the sum of expense values', () => {
      // arrange
      const expenses = [
        { id: 1, label: '1', value: 100 },
        { id: 2, label: '2', value: 200 },
        { id: 3, label: '1', value: 50 },
        { id: 4, label: '3', value: 300 }
      ];
      const labels = {
        '1': { id: '1', name: 'Food', icon: '🍔' },
        '2': { id: '2', name: 'Transport', icon: '🚗' },
        '3': { id: '3', name: 'Entertainment', icon: '🎉' }
      };
      // act
      const result = expensesByLabel(expenses, labels);
      // assert
      expect(result).toBeDefined();
      expect(Object.keys(result ?? [])).toEqual(['🍔 Food', '🚗 Transport', '🎉 Entertainment']);
    });
  });
});
