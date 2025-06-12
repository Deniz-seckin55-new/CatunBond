import { z } from 'zod';
import { ChannelCreateManyInputObjectSchema } from './objects/ChannelCreateManyInput.schema';

export const ChannelCreateManySchema = z.object({
  data: z.union([
    ChannelCreateManyInputObjectSchema,
    z.array(ChannelCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
