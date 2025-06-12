import { z } from 'zod';
import { ReactionWhereUniqueInputObjectSchema } from './ReactionWhereUniqueInput.schema';
import { ReactionCreateWithoutMessageInputObjectSchema } from './ReactionCreateWithoutMessageInput.schema';
import { ReactionUncheckedCreateWithoutMessageInputObjectSchema } from './ReactionUncheckedCreateWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionCreateOrConnectWithoutMessageInput> = z
  .object({
    where: z.lazy(() => ReactionWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => ReactionCreateWithoutMessageInputObjectSchema),
      z.lazy(() => ReactionUncheckedCreateWithoutMessageInputObjectSchema),
    ]),
  })
  .strict();

export const ReactionCreateOrConnectWithoutMessageInputObjectSchema = Schema;
