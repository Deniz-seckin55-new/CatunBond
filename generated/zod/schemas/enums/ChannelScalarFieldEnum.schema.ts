import { z } from 'zod';

export const ChannelScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'channelType',
  'categoryId',
  'index',
]);
