import { z } from 'zod';
import { ReactionWhereUniqueInputObjectSchema } from './ReactionWhereUniqueInput.schema';
import { ReactionUpdateWithoutMessageInputObjectSchema } from './ReactionUpdateWithoutMessageInput.schema';
import { ReactionUncheckedUpdateWithoutMessageInputObjectSchema } from './ReactionUncheckedUpdateWithoutMessageInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionUpdateWithWhereUniqueWithoutMessageInput> =
  z
    .object({
      where: z.lazy(() => ReactionWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ReactionUpdateWithoutMessageInputObjectSchema),
        z.lazy(() => ReactionUncheckedUpdateWithoutMessageInputObjectSchema),
      ]),
    })
    .strict();

export const ReactionUpdateWithWhereUniqueWithoutMessageInputObjectSchema =
  Schema;
