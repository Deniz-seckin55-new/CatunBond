import { z } from 'zod';
import { ChannelInfoWhereUniqueInputObjectSchema } from './objects/ChannelInfoWhereUniqueInput.schema';

export const ChannelInfoDeleteOneSchema = z.object({
  where: ChannelInfoWhereUniqueInputObjectSchema,
});
