import { z } from 'zod';

export const AuthScalarFieldEnumSchema = z.enum([
  'userId',
  'password_hash',
  'salt',
]);
