import { z } from 'zod';
import { ReactionWhereUniqueInputObjectSchema } from './ReactionWhereUniqueInput.schema';
import { ReactionUpdateWithoutMessageInputObjectSchema } from './ReactionUpdateWithoutMessageInput.schema';
import { ReactionUncheckedUpdateWithoutMessageInputObjectSchema } from './ReactionUncheckedUpdateWithoutMessageInput.schema';
import { ReactionCreateWithoutMessageInputObjectSchema } from './ReactionCreateWithoutMessageInput.schema';
import { ReactionUncheckedCreateWithoutMessageInputObjectSchema } from './ReactionUncheckedCreateWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionUpsertWithWhereUniqueWithoutMessageInput> =
  z
    .object({
      where: z.lazy(() => ReactionWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ReactionUpdateWithoutMessageInputObjectSchema),
        z.lazy(() => ReactionUncheckedUpdateWithoutMessageInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ReactionCreateWithoutMessageInputObjectSchema),
        z.lazy(() => ReactionUncheckedCreateWithoutMessageInputObjectSchema),
      ]),
    })
    .strict();

export const ReactionUpsertWithWhereUniqueWithoutMessageInputObjectSchema =
  Schema;
