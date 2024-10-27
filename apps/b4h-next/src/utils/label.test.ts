import { labelsById, selectLabelByExpenseName } from './label';

describe('utils>expenses', () => {
  describe('labelsById', () => {
    test('should return an empty object for an empty array', () => {
      // arrange
      const labels = [];
      // act
      const result = labelsById(labels);
      // assert
      expect(result).toEqual({});
    });

    test('should return an object with one label', () => {
      // arrange
      const labels = [{ id: '1', name: 'Label 1' }];
      // act
      const result = labelsById(labels);
      // assert
      expect(result).toEqual({
        '1': { id: '1', name: 'Label 1' }
      });
    });

    test('should return an object with multiple labels', () => {
      // arrange
      const labels = [
        { id: '1', name: 'Label 1' },
        { id: '2', name: 'Label 2' },
        { id: '3', name: 'Label 3' }
      ];
      // act
      const result = labelsById(labels);
      // assert
      expect(result).toEqual({
        '1': { id: '1', name: 'Label 1' },
        '2': { id: '2', name: 'Label 2' },
        '3': { id: '3', name: 'Label 3' }
      });
    });
  });

  describe('selectLabelByExpenseName', () => {
    test('should return undefined for no labels', () => {
      // arrange
      const labels = [];
      const name = 'expense';
      // act
      const result = selectLabelByExpenseName(labels, name);
      // assert
      expect(result).toBeUndefined();
    });

    test('should return undefined for no matching label', () => {
      // arrange
      const labels = [{ id: '1', name: 'Label 1', keys: 'food,groceries' }];
      const name = 'rent';
      // act
      const result = selectLabelByExpenseName(labels, name);
      // assert
      expect(result).toBeUndefined();
    });

    test('should return matching label by exact key', () => {
      // arrange
      const labels = [{ id: '1', name: 'Label 1', keys: 'food,groceries' }];
      const name = 'food';
      // act
      const result = selectLabelByExpenseName(labels, name);
      // assert
      expect(result).toEqual({ id: '1', name: 'Label 1', keys: 'food,groceries' });
    });

    test('should return matching label by partial key', () => {
      // arrange
      const labels = [{ id: '1', name: 'Label 1', keys: 'food,groceries' }];
      const name = 'groceries shopping';
      // act
      const result = selectLabelByExpenseName(labels, name);
      // assert
      expect(result).toEqual({ id: '1', name: 'Label 1', keys: 'food,groceries' });
    });

    test('should return the first matching label when multiple labels match', () => {
      // arrange
      const labels = [
        { id: '1', name: 'Label 1', keys: 'food,groceries' },
        { id: '2', name: 'Label 2', keys: 'rent,utilities' }
      ];
      const name = 'rent payment';
      // act
      const result = selectLabelByExpenseName(labels, name);
      // assert
      expect(result).toEqual({ id: '2', name: 'Label 2', keys: 'rent,utilities' });
    });
  });
});
