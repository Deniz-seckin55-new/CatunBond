import { z } from 'zod';

export const MessagesScalarFieldEnumSchema = z.enum([
  'id',
  'content',
  'timestamp',
  'authorId',
  'channelId',
  'repliedToId',
  'attachments',
  'mentions',
]);
