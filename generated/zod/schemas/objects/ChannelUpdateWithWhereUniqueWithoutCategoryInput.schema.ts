import { z } from 'zod';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';
import { ChannelUpdateWithoutCategoryInputObjectSchema } from './ChannelUpdateWithoutCategoryInput.schema';
import { ChannelUncheckedUpdateWithoutCategoryInputObjectSchema } from './ChannelUncheckedUpdateWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUpdateWithWhereUniqueWithoutCategoryInput> =
  z
    .object({
      where: z.lazy(() => ChannelWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ChannelUpdateWithoutCategoryInputObjectSchema),
        z.lazy(() => ChannelUncheckedUpdateWithoutCategoryInputObjectSchema),
      ]),
    })
    .strict();

export const ChannelUpdateWithWhereUniqueWithoutCategoryInputObjectSchema =
  Schema;
