import { z } from 'zod';

export const VoiceChatScalarFieldEnumSchema = z.enum([
  'channelId',
  'serverId',
  'createdAt',
]);
