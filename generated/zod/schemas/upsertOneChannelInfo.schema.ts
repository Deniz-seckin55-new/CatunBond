import { z } from 'zod';
import { ChannelInfoWhereUniqueInputObjectSchema } from './objects/ChannelInfoWhereUniqueInput.schema';
import { ChannelInfoCreateInputObjectSchema } from './objects/ChannelInfoCreateInput.schema';
import { ChannelInfoUncheckedCreateInputObjectSchema } from './objects/ChannelInfoUncheckedCreateInput.schema';
import { ChannelInfoUpdateInputObjectSchema } from './objects/ChannelInfoUpdateInput.schema';
import { ChannelInfoUncheckedUpdateInputObjectSchema } from './objects/ChannelInfoUncheckedUpdateInput.schema';

export const ChannelInfoUpsertSchema = z.object({
  where: ChannelInfoWhereUniqueInputObjectSchema,
  create: z.union([
    ChannelInfoCreateInputObjectSchema,
    ChannelInfoUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ChannelInfoUpdateInputObjectSchema,
    ChannelInfoUncheckedUpdateInputObjectSchema,
  ]),
});
