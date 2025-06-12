import { z } from 'zod';
import { ChannelWhereUniqueInputObjectSchema } from './objects/ChannelWhereUniqueInput.schema';
import { ChannelCreateInputObjectSchema } from './objects/ChannelCreateInput.schema';
import { ChannelUncheckedCreateInputObjectSchema } from './objects/ChannelUncheckedCreateInput.schema';
import { ChannelUpdateInputObjectSchema } from './objects/ChannelUpdateInput.schema';
import { ChannelUncheckedUpdateInputObjectSchema } from './objects/ChannelUncheckedUpdateInput.schema';

export const ChannelUpsertSchema = z.object({
  where: ChannelWhereUniqueInputObjectSchema,
  create: z.union([
    ChannelCreateInputObjectSchema,
    ChannelUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    ChannelUpdateInputObjectSchema,
    ChannelUncheckedUpdateInputObjectSchema,
  ]),
});
