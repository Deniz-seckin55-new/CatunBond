import { z } from 'zod';
import { MessagesCreateWithoutAuthorInputObjectSchema } from './MessagesCreateWithoutAuthorInput.schema';
import { MessagesUncheckedCreateWithoutAuthorInputObjectSchema } from './MessagesUncheckedCreateWithoutAuthorInput.schema';
import { MessagesCreateOrConnectWithoutAuthorInputObjectSchema } from './MessagesCreateOrConnectWithoutAuthorInput.schema';
import { MessagesCreateManyAuthorInputEnvelopeObjectSchema } from './MessagesCreateManyAuthorInputEnvelope.schema';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesUncheckedCreateNestedManyWithoutAuthorInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MessagesCreateWithoutAuthorInputObjectSchema),
          z.lazy(() => MessagesCreateWithoutAuthorInputObjectSchema).array(),
          z.lazy(() => MessagesUncheckedCreateWithoutAuthorInputObjectSchema),
          z
            .lazy(() => MessagesUncheckedCreateWithoutAuthorInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => MessagesCreateOrConnectWithoutAuthorInputObjectSchema),
          z
            .lazy(() => MessagesCreateOrConnectWithoutAuthorInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => MessagesCreateManyAuthorInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => MessagesWhereUniqueInputObjectSchema),
          z.lazy(() => MessagesWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const MessagesUncheckedCreateNestedManyWithoutAuthorInputObjectSchema =
  Schema;
