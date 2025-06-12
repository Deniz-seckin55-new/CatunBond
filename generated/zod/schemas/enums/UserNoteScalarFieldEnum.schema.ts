import { z } from 'zod';

export const UserNoteScalarFieldEnumSchema = z.enum([
  'userId',
  'otherUserId',
  'note',
]);
