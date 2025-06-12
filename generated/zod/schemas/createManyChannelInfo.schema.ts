import { z } from 'zod';
import { ChannelInfoCreateManyInputObjectSchema } from './objects/ChannelInfoCreateManyInput.schema';

export const ChannelInfoCreateManySchema = z.object({
  data: z.union([
    ChannelInfoCreateManyInputObjectSchema,
    z.array(ChannelInfoCreateManyInputObjectSchema),
  ]),
  skipDuplicates: z.boolean().optional(),
});
