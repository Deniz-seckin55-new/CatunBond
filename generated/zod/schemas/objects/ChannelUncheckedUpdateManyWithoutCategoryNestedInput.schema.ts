import { z } from 'zod';
import { ChannelCreateWithoutCategoryInputObjectSchema } from './ChannelCreateWithoutCategoryInput.schema';
import { ChannelUncheckedCreateWithoutCategoryInputObjectSchema } from './ChannelUncheckedCreateWithoutCategoryInput.schema';
import { ChannelCreateOrConnectWithoutCategoryInputObjectSchema } from './ChannelCreateOrConnectWithoutCategoryInput.schema';
import { ChannelUpsertWithWhereUniqueWithoutCategoryInputObjectSchema } from './ChannelUpsertWithWhereUniqueWithoutCategoryInput.schema';
import { ChannelCreateManyCategoryInputEnvelopeObjectSchema } from './ChannelCreateManyCategoryInputEnvelope.schema';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';
import { ChannelUpdateWithWhereUniqueWithoutCategoryInputObjectSchema } from './ChannelUpdateWithWhereUniqueWithoutCategoryInput.schema';
import { ChannelUpdateManyWithWhereWithoutCategoryInputObjectSchema } from './ChannelUpdateManyWithWhereWithoutCategoryInput.schema';
import { ChannelScalarWhereInputObjectSchema } from './ChannelScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUncheckedUpdateManyWithoutCategoryNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () => ChannelUpsertWithWhereUniqueWithoutCategoryInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ChannelUpsertWithWhereUniqueWithoutCategoryInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ChannelCreateManyCategoryInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ChannelWhereUniqueInputObjectSchema),
          z.lazy(() => ChannelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ChannelWhereUniqueInputObjectSchema),
          z.lazy(() => ChannelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ChannelWhereUniqueInputObjectSchema),
          z.lazy(() => ChannelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ChannelWhereUniqueInputObjectSchema),
          z.lazy(() => ChannelWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ChannelUpdateWithWhereUniqueWithoutCategoryInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ChannelUpdateWithWhereUniqueWithoutCategoryInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ChannelUpdateManyWithWhereWithoutCategoryInputObjectSchema,
          ),
          z
            .lazy(
              () => ChannelUpdateManyWithWhereWithoutCategoryInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ChannelScalarWhereInputObjectSchema),
          z.lazy(() => ChannelScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ChannelUncheckedUpdateManyWithoutCategoryNestedInputObjectSchema =
  Schema;
