import { z } from 'zod';
import { ChannelInfoUpdateManyMutationInputObjectSchema } from './objects/ChannelInfoUpdateManyMutationInput.schema';
import { ChannelInfoWhereInputObjectSchema } from './objects/ChannelInfoWhereInput.schema';

export const ChannelInfoUpdateManySchema = z.object({
  data: ChannelInfoUpdateManyMutationInputObjectSchema,
  where: ChannelInfoWhereInputObjectSchema.optional(),
});
