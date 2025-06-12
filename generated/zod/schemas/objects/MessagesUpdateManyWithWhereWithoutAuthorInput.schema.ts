import { z } from 'zod';
import { MessagesScalarWhereInputObjectSchema } from './MessagesScalarWhereInput.schema';
import { MessagesUpdateManyMutationInputObjectSchema } from './MessagesUpdateManyMutationInput.schema';
import { MessagesUncheckedUpdateManyWithoutMessagesInputObjectSchema } from './MessagesUncheckedUpdateManyWithoutMessagesInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUpdateManyWithWhereWithoutAuthorInput> =
  z
    .object({
      where: z.lazy(() => MessagesScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => MessagesUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => MessagesUncheckedUpdateManyWithoutMessagesInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const MessagesUpdateManyWithWhereWithoutAuthorInputObjectSchema = Schema;
