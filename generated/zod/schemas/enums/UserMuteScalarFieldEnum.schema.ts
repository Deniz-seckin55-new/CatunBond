import { z } from 'zod';

export const UserMuteScalarFieldEnumSchema = z.enum([
  'userId',
  'startedAt',
  'endsAt',
  'mutedIn',
  'mutedInType',
  'muteType',
]);
