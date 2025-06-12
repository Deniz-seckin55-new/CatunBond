import { z } from 'zod';
import { ChannelUpdateInputObjectSchema } from './objects/ChannelUpdateInput.schema';
import { ChannelUncheckedUpdateInputObjectSchema } from './objects/ChannelUncheckedUpdateInput.schema';
import { ChannelWhereUniqueInputObjectSchema } from './objects/ChannelWhereUniqueInput.schema';

export const ChannelUpdateOneSchema = z.object({
  data: z.union([
    ChannelUpdateInputObjectSchema,
    ChannelUncheckedUpdateInputObjectSchema,
  ]),
  where: ChannelWhereUniqueInputObjectSchema,
});
