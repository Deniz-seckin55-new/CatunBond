import { z } from 'zod';
import { ReactionCreateWithoutMessageInputObjectSchema } from './ReactionCreateWithoutMessageInput.schema';
import { ReactionUncheckedCreateWithoutMessageInputObjectSchema } from './ReactionUncheckedCreateWithoutMessageInput.schema';
import { ReactionCreateOrConnectWithoutMessageInputObjectSchema } from './ReactionCreateOrConnectWithoutMessageInput.schema';
import { ReactionCreateManyMessageInputEnvelopeObjectSchema } from './ReactionCreateManyMessageInputEnvelope.schema';
import { ReactionWhereUniqueInputObjectSchema } from './ReactionWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ReactionUncheckedCreateNestedManyWithoutMessageInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ReactionCreateWithoutMessageInputObjectSchema),
          z.lazy(() => ReactionCreateWithoutMessageInputObjectSchema).array(),
          z.lazy(() => ReactionUncheckedCreateWithoutMessageInputObjectSchema),
          z
            .lazy(() => ReactionUncheckedCreateWithoutMessageInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ReactionCreateOrConnectWithoutMessageInputObjectSchema),
          z
            .lazy(() => ReactionCreateOrConnectWithoutMessageInputObjectSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ReactionCreateManyMessageInputEnvelopeObjectSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ReactionWhereUniqueInputObjectSchema),
          z.lazy(() => ReactionWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ReactionUncheckedCreateNestedManyWithoutMessageInputObjectSchema =
  Schema;
