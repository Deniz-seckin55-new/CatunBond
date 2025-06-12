import { z } from 'zod';
import { MessagesScalarWhereInputObjectSchema } from './MessagesScalarWhereInput.schema';
import { MessagesUpdateManyMutationInputObjectSchema } from './MessagesUpdateManyMutationInput.schema';
import { MessagesUncheckedUpdateManyWithoutRepliesInputObjectSchema } from './MessagesUncheckedUpdateManyWithoutRepliesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpdateManyWithWhereWithoutRepliedToInput> =
  z
    .object({
      where: z.lazy(() => MessagesScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => MessagesUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => MessagesUncheckedUpdateManyWithoutRepliesInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const MessagesUpdateManyWithWhereWithoutRepliedToInputObjectSchema =
  Schema;
