import { z } from 'zod';

export const ReactionScalarFieldEnumSchema = z.enum([
  'id',
  'userId',
  'emojiName',
  'messageId',
  'channelId',
]);
