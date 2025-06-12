import { z } from 'zod';

export const UserInfoScalarFieldEnumSchema = z.enum([
  'userId',
  'biography',
  'usernameColor',
  'mainLink',
  'shortDescription',
]);
