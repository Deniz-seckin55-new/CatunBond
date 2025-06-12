import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesUpdateWithoutAuthorInputObjectSchema } from './MessagesUpdateWithoutAuthorInput.schema';
import { MessagesUncheckedUpdateWithoutAuthorInputObjectSchema } from './MessagesUncheckedUpdateWithoutAuthorInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpdateWithWhereUniqueWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => MessagesUpdateWithoutAuthorInputObjectSchema),
        z.lazy(() => MessagesUncheckedUpdateWithoutAuthorInputObjectSchema),
      ]),
    })
    .strict();

export const MessagesUpdateWithWhereUniqueWithoutAuthorInputObjectSchema =
  Schema;
