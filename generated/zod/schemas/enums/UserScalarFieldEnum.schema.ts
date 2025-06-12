import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'username',
  'avatarUrl',
  'blocked',
  'voiceChatChannelId',
  'variables',
]);
