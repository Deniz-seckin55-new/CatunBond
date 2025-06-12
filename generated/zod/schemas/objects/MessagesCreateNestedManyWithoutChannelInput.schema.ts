import { z } from 'zod';
import { MessagesCreateWithoutChannelInputObjectSchema } from './MessagesCreateWithoutChannelInput.schema';
import { MessagesUncheckedCreateWithoutChannelInputObjectSchema } from './MessagesUncheckedCreateWithoutChannelInput.schema';
import { MessagesCreateOrConnectWithoutChannelInputObjectSchema } from './MessagesCreateOrConnectWithoutChannelInput.schema';
import { MessagesCreateManyChannelInputEnvelopeObjectSchema } from './MessagesCreateManyChannelInputEnvelope.schema';
import { MessagesWhereUniqueInputObjectSchema } from './MessagesWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.MessagesCreateNestedManyWithoutChannelInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => MessagesCreateWithoutChannelInputObjectSchema),
        z.lazy(() => MessagesCreateWithoutChannelInputObjectSchema).array(),
        z.lazy(() => MessagesUncheckedCreateWithoutChannelInputObjectSchema),
        z
          .lazy(() => MessagesUncheckedCreateWithoutChannelInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => MessagesCreateOrConnectWithoutChannelInputObjectSchema),
        z
          .lazy(() => MessagesCreateOrConnectWithoutChannelInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => MessagesCreateManyChannelInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => MessagesWhereUniqueInputObjectSchema),
        z.lazy(() => MessagesWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const MessagesCreateNestedManyWithoutChannelInputObjectSchema = Schema;
