import { z } from 'zod';
import { UserCreateWithoutVoiceChatInputObjectSchema } from './UserCreateWithoutVoiceChatInput.schema';
import { UserUncheckedCreateWithoutVoiceChatInputObjectSchema } from './UserUncheckedCreateWithoutVoiceChatInput.schema';
import { UserCreateOrConnectWithoutVoiceChatInputObjectSchema } from './UserCreateOrConnectWithoutVoiceChatInput.schema';
import { UserUpsertWithWhereUniqueWithoutVoiceChatInputObjectSchema } from './UserUpsertWithWhereUniqueWithoutVoiceChatInput.schema';
import { UserCreateManyVoiceChatInputEnvelopeObjectSchema } from './UserCreateManyVoiceChatInputEnvelope.schema';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithWhereUniqueWithoutVoiceChatInputObjectSchema } from './UserUpdateWithWhereUniqueWithoutVoiceChatInput.schema';
import { UserUpdateManyWithWhereWithoutVoiceChatInputObjectSchema } from './UserUpdateManyWithWhereWithoutVoiceChatInput.schema';
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutVoiceChatNestedInput> =
  z
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
      upsert: z
        .union([
          z.lazy(
            () => UserUpsertWithWhereUniqueWithoutVoiceChatInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpsertWithWhereUniqueWithoutVoiceChatInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => UserCreateManyVoiceChatInputEnvelopeObjectSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => UserWhereUniqueInputObjectSchema),
          z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => UserWhereUniqueInputObjectSchema),
          z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => UserWhereUniqueInputObjectSchema),
          z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => UserWhereUniqueInputObjectSchema),
          z.lazy(() => UserWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => UserUpdateWithWhereUniqueWithoutVoiceChatInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpdateWithWhereUniqueWithoutVoiceChatInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => UserUpdateManyWithWhereWithoutVoiceChatInputObjectSchema,
          ),
          z
            .lazy(
              () => UserUpdateManyWithWhereWithoutVoiceChatInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => UserScalarWhereInputObjectSchema),
          z.lazy(() => UserScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const UserUncheckedUpdateManyWithoutVoiceChatNestedInputObjectSchema =
  Schema;
