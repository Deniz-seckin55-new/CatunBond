import { z } from 'zod';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';
import { MessagesCreateWithoutAuthorInputObjectSchema } from './MessagesCreateWithoutAuthorInput.schema';
import { MessagesUncheckedCreateWithoutAuthorInputObjectSchema } from './MessagesUncheckedCreateWithoutAuthorInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateOrConnectWithoutAuthorInput> = z
  .object({
    where: z.lazy(() => MessagesWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => MessagesCreateWithoutAuthorInputObjectSchema),
      z.lazy(() => MessagesUncheckedCreateWithoutAuthorInputObjectSchema),
    ]),
  })
  .strict();

export const MessagesCreateOrConnectWithoutAuthorInputObjectSchema = Schema;
