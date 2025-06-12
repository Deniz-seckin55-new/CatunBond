import { z } from 'zod';
import { ChannelInfoOrderByWithRelationInputObjectSchema } from './objects/ChannelInfoOrderByWithRelationInput.schema';
import { ChannelInfoWhereInputObjectSchema } from './objects/ChannelInfoWhereInput.schema';
import { ChannelInfoWhereUniqueInputObjectSchema } from './objects/ChannelInfoWhereUniqueInput.schema';
import { ChannelInfoScalarFieldEnumSchema } from './enums/ChannelInfoScalarFieldEnum.schema';

export const ChannelInfoFindManySchema = z.object({
  orderBy: z
    .union([
      ChannelInfoOrderByWithRelationInputObjectSchema,
      ChannelInfoOrderByWithRelationInputObjectSchema.array(),
    ])
    .optional(),
  where: ChannelInfoWhereInputObjectSchema.optional(),
  cursor: ChannelInfoWhereUniqueInputObjectSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.array(ChannelInfoScalarFieldEnumSchema).optional(),
});
