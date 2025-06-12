import { z } from 'zod';

export const ChannelInfoScalarFieldEnumSchema = z.enum([
  'channelId',
  'name',
  'type',
  'description',
  'slowMode',
  'readOnly',
  'nsfw',
  'pinnedMessages',
]);
