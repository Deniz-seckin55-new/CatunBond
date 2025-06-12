import { z } from 'zod';
import { ChannelUpdateManyMutationInputObjectSchema } from './objects/ChannelUpdateManyMutationInput.schema';
import { ChannelWhereInputObjectSchema } from './objects/ChannelWhereInput.schema';

export const ChannelUpdateManySchema = z.object({
  data: ChannelUpdateManyMutationInputObjectSchema,
  where: ChannelWhereInputObjectSchema.optional(),
});
