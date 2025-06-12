import { z } from 'zod';
import { ChannelInfoUpdateInputObjectSchema } from './objects/ChannelInfoUpdateInput.schema';
import { ChannelInfoUncheckedUpdateInputObjectSchema } from './objects/ChannelInfoUncheckedUpdateInput.schema';
import { ChannelInfoWhereUniqueInputObjectSchema } from './objects/ChannelInfoWhereUniqueInput.schema';

export const ChannelInfoUpdateOneSchema = z.object({
  data: z.union([
    ChannelInfoUpdateInputObjectSchema,
    ChannelInfoUncheckedUpdateInputObjectSchema,
  ]),
  where: ChannelInfoWhereUniqueInputObjectSchema,
});
