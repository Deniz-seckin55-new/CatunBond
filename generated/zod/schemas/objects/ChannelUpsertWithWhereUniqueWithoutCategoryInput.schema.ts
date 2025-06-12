import { z } from 'zod';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';
import { ChannelUpdateWithoutCategoryInputObjectSchema } from './ChannelUpdateWithoutCategoryInput.schema';
import { ChannelUncheckedUpdateWithoutCategoryInputObjectSchema } from './ChannelUncheckedUpdateWithoutCategoryInput.schema';
import { ChannelCreateWithoutCategoryInputObjectSchema } from './ChannelCreateWithoutCategoryInput.schema';
import { ChannelUncheckedCreateWithoutCategoryInputObjectSchema } from './ChannelUncheckedCreateWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUpsertWithWhereUniqueWithoutCategoryInput> =
  z
    .object({
      where: z.lazy(() => ChannelWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ChannelUpdateWithoutCategoryInputObjectSchema),
        z.lazy(() => ChannelUncheckedUpdateWithoutCategoryInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ChannelCreateWithoutCategoryInputObjectSchema),
        z.lazy(() => ChannelUncheckedCreateWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict();

export const ChannelUpsertWithWhereUniqueWithoutCategoryInputObjectSchema =
  Schema;
