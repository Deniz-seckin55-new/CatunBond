import { z } from 'zod';
import { ChannelCreateWithoutCategoryInputObjectSchema } from './ChannelCreateWithoutCategoryInput.schema';
import { ChannelUncheckedCreateWithoutCategoryInputObjectSchema } from './ChannelUncheckedCreateWithoutCategoryInput.schema';
import { ChannelCreateOrConnectWithoutCategoryInputObjectSchema } from './ChannelCreateOrConnectWithoutCategoryInput.schema';
import { ChannelCreateManyCategoryInputEnvelopeObjectSchema } from './ChannelCreateManyCategoryInputEnvelope.schema';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUncheckedCreateNestedManyWithoutCategoryInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ChannelCreateWithoutCategoryInputObjectSchema),
          z.lazy(() => ChannelCreateWithoutCategoryInputObjectSchema).array(),
          z.lazy(() => ChannelUncheckedCreateWithoutCategoryInputObjectSchema),
          z
            .lazy(() => ChannelUncheckedCreateWithoutCategoryInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ChannelCreateOrConnectWithoutCategoryInputObjectSchema),
          z
            .lazy(() => ChannelCreateOrConnectWithoutCategoryInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ChannelCreateManyCategoryInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ChannelWhereUniqueInputObjectSchema),
          z.lazy(() => ChannelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ChannelUncheckedCreateNestedManyWithoutCategoryInputObjectSchema =
  Schema;
