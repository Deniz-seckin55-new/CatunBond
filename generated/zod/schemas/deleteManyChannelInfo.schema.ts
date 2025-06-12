import { z } from 'zod';
import { ChannelInfoWhereInputObjectSchema } from './objects/ChannelInfoWhereInput.schema';

export const ChannelInfoDeleteManySchema = z.object({
  where: ChannelInfoWhereInputObjectSchema.optional(),
});
