import { z } from 'zod';
import { ChannelWhereUniqueInputObjectSchema } from './objects/ChannelWhereUniqueInput.schema';

export const ChannelFindUniqueSchema = z.object({
  where: ChannelWhereUniqueInputObjectSchema,
});
