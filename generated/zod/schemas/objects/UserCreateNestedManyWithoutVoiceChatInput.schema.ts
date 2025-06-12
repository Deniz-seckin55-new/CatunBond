import { z } from 'zod';
import { UserCreateWithoutVoiceChatInputObjectSchema } from './UserCreateWithoutVoiceChatInput.schema';
import { UserUncheckedCreateWithoutVoiceChatInputObjectSchema } from './UserUncheckedCreateWithoutVoiceChatInput.schema';
import { UserCreateOrConnectWithoutVoiceChatInputObjectSchema } from './UserCreateOrConnectWithoutVoiceChatInput.schema';
import { UserCreateManyVoiceChatInputEnvelopeObjectSchema } from './UserCreateManyVoiceChatInputEnvelope.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateNestedManyWithoutVoiceChatInput> = z
  .object({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutVoiceChatInputObjectSchema),
        z.lazy(() => UserCreateWithoutVoiceChatInputObjectSchema).array(),
        z.lazy(() => UserUncheckedCreateWithoutVoiceChatInputObjectSchema),
        z
          .lazy(() => UserUncheckedCreateWithoutVoiceChatInputObjectSchema)
          .array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => UserCreateOrConnectWithoutVoiceChatInputObjectSchema),
        z
          .lazy(() => UserCreateOrConnectWithoutVoiceChatInputObjectSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => UserCreateManyVoiceChatInputEnvelopeObjectSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => UserWhereUniqueInputObjectSchema),
        z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const UserCreateNestedManyWithoutVoiceChatInputObjectSchema = Schema;
