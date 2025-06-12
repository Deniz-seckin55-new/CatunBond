import { z } from 'zod';
import { ChannelCreateInputObjectSchema } from './objects/ChannelCreateInput.schema';
import { ChannelUncheckedCreateInputObjectSchema } from './objects/ChannelUncheckedCreateInput.schema';

export const ChannelCreateOneSchema = z.object({
  data: z.union([
    ChannelCreateInputObjectSchema,
    ChannelUncheckedCreateInputObjectSchema,
  ]),
});
