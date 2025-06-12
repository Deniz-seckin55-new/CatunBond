import { z } from 'zod';
import { MessagesCreateWithoutRepliedToInputObjectSchema } from './MessagesCreateWithoutRepliedToInput.schema';
import { MessagesUncheckedCreateWithoutRepliedToInputObjectSchema } from './MessagesUncheckedCreateWithoutRepliedToInput.schema';
import { MessagesCreateOrConnectWithoutRepliedToInputObjectSchema } from './MessagesCreateOrConnectWithoutRepliedToInput.schema';
import { MessagesCreateManyRepliedToInputEnvelopeObjectSchema } from './MessagesCreateManyRepliedToInputEnvelope.schema';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateNestedManyWithoutRepliedToInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MessagesCreateWithoutRepliedToInputObjectSchema),
          z.lazy(() => MessagesCreateWithoutRepliedToInputObjectSchema).array(),
          z.lazy(
            () => MessagesUncheckedCreateWithoutRepliedToInputObjectSchema,
          ),
          z
            .lazy(
              () => MessagesUncheckedCreateWithoutRepliedToInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () => MessagesCreateOrConnectWithoutRepliedToInputObjectSchema,
          ),
          z
            .lazy(
              () => MessagesCreateOrConnectWithoutRepliedToInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MessagesCreateManyRepliedToInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MessagesWhereUniqueInputObjectSchema),
          z.lazy(() => MessagesWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MessagesCreateNestedManyWithoutRepliedToInputObjectSchema = Schema;
