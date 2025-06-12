import { z } from 'zod';

export const ServerScalarFieldEnumSchema = z.enum([
  'id',
  'iconUrl',
  'name',
  'ownerId',
  'invites',
]);
