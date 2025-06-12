import { z } from 'zod';
import { ChannelWhereUniqueInputObjectSchema } from './ChannelWhereUniqueInput.schema';
import { ChannelCreateWithoutCategoryInputObjectSchema } from './ChannelCreateWithoutCategoryInput.schema';
import { ChannelUncheckedCreateWithoutCategoryInputObjectSchema } from './ChannelUncheckedCreateWithoutCategoryInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelCreateOrConnectWithoutCategoryInput> = z
  .object({
    where: z.lazy(() => ChannelWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ChannelCreateWithoutCategoryInputObjectSchema),
      z.lazy(() => ChannelUncheckedCreateWithoutCategoryInputObjectSchema),
    ]),
  })
  .strict();

export const ChannelCreateOrConnectWithoutCategoryInputObjectSchema = Schema;
