import { z } from 'zod';
import { ChannelWhereUniqueInputObjectSchema } from './objects/ChannelWhereUniqueInput.schema';

export const ChannelDeleteOneSchema = z.object({
  where: ChannelWhereUniqueInputObjectSchema,
});
