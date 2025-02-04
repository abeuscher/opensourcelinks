import { validateFediverseUsername, validateSourceUrl } from '../utils/validation';

describe('URL Validation', () => {
  test('validates Facebook URLs', () => {
    expect(validateSourceUrl('facebook', 'https://facebook.com/username').isValid).toBe(true);
    expect(validateSourceUrl('facebook', 'https://fb.com/username').isValid).toBe(true);
    expect(validateSourceUrl('facebook', 'not-a-url').isValid).toBe(false);
  });

  test('validates Twitter URLs', () => {
    expect(validateSourceUrl('twitter', 'https://twitter.com/username').isValid).toBe(true);
    expect(validateSourceUrl('twitter', 'https://twitter.com/user_name').isValid).toBe(true);
    expect(validateSourceUrl('twitter', 'https://twitter.com/user.name').isValid).toBe(false);
  });

  test('validates unknown platform URLs', () => {
    expect(validateSourceUrl('unknown', 'https://example.com/valid-url').isValid).toBe(true);
  });
});

describe('Fediverse Username Validation', () => {
  test('validates usernames', () => {
    expect(validateFediverseUsername('validuser').isValid).toBe(true);
    expect(validateFediverseUsername('valid_user_123').isValid).toBe(true);
    expect(validateFediverseUsername('').isValid).toBe(false);
    expect(validateFediverseUsername('invalid user').isValid).toBe(false);
  });
});