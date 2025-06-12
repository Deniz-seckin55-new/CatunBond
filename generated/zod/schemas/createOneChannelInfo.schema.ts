import { z } from 'zod';
import { ChannelInfoCreateInputObjectSchema } from './objects/ChannelInfoCreateInput.schema';
import { ChannelInfoUncheckedCreateInputObjectSchema } from './objects/ChannelInfoUncheckedCreateInput.schema';

export const ChannelInfoCreateOneSchema = z.object({
  data: z.union([
    ChannelInfoCreateInputObjectSchema,
    ChannelInfoUncheckedCreateInputObjectSchema,
  ]),
});
