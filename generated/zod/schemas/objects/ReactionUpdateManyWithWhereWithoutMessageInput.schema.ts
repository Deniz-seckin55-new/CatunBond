import { z } from 'zod';
import { ReactionScalarWhereInputObjectSchema } from './ReactionScalarWhereInput.schema';
import { ReactionUpdateManyMutationInputObjectSchema } from './ReactionUpdateManyMutationInput.schema';
import { ReactionUncheckedUpdateManyWithoutReactionsInputObjectSchema } from './ReactionUncheckedUpdateManyWithoutReactionsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionUpdateManyWithWhereWithoutMessageInput> =
  z
    .object({
      where: z.lazy(() => ReactionScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ReactionUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => ReactionUncheckedUpdateManyWithoutReactionsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ReactionUpdateManyWithWhereWithoutMessageInputObjectSchema =
  Schema;
