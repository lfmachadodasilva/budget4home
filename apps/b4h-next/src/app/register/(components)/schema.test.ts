import { FORM_MAX_LENGTH, FORM_MIN_LENGTH } from '../../../utils/constants';
import { registerFormSchema } from './schema';

describe('registerFormSchema', () => {
  test('should validate a correct form', () => {
    const validData = {
      email: 'test@example.com',
      password1: 'validpassword',
      password2: 'validpassword'
    };

    expect(() => registerFormSchema.parse(validData)).not.toThrow();
  });

  test('should throw an error if email is missing', () => {
    const invalidData = {
      password1: 'validpassword',
      password2: 'validpassword'
    };

    expect(() => registerFormSchema.parse(invalidData)).toThrow('email is required');
  });

  test('should throw an error if passwords do not match', () => {
    const invalidData = {
      email: 'test@example.com',
      password1: 'validpassword',
      password2: 'differentpassword'
    };

    expect(() => registerFormSchema.parse(invalidData)).toThrow('passwords must match');
  });

  test('should throw an error if email is too long', () => {
    const invalidData = {
      email: 'a'.repeat(FORM_MAX_LENGTH + 1) + '@example.com',
      password1: 'validpassword',
      password2: 'validpassword'
    };

    expect(() => registerFormSchema.parse(invalidData)).toThrow(
      `name is too long, max ${FORM_MAX_LENGTH} characters`
    );
  });

  test('should throw an error if password is too short', () => {
    const invalidData = {
      email: 'test@example.com',
      password1: 'x',
      password2: 'x'
    };

    expect(() => registerFormSchema.parse(invalidData)).toThrow(
      `name is too short, min ${FORM_MIN_LENGTH} characters`
    );
  });

  test('should throw an error if password is too long', () => {
    const invalidData = {
      email: 'test@example.com',
      password1: 'a'.repeat(FORM_MAX_LENGTH + 1),
      password2: 'a'.repeat(FORM_MAX_LENGTH + 1)
    };

    expect(() => registerFormSchema.parse(invalidData)).toThrow(
      `name is too long, max ${FORM_MAX_LENGTH} characters`
    );
  });

  test('should throw an error if password does not match', () => {
    const invalidData = {
      email: 'test@example.com',
      password1: 'password1',
      password2: 'password2'
    };

    expect(() => registerFormSchema.parse(invalidData)).toThrow(`passwords must match`);
  });
});
