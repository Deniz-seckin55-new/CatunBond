import { z } from 'zod';
import { ChannelWhereInputObjectSchema } from './objects/ChannelWhereInput.schema';

export const ChannelDeleteManySchema = z.object({
  where: ChannelWhereInputObjectSchema.optional(),
});
