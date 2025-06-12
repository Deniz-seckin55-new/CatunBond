import { z } from 'zod';
import { ChannelInfoWhereUniqueInputObjectSchema } from './objects/ChannelInfoWhereUniqueInput.schema';

export const ChannelInfoFindUniqueSchema = z.object({
  where: ChannelInfoWhereUniqueInputObjectSchema,
});
