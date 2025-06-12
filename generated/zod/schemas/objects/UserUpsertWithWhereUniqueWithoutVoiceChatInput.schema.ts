import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutVoiceChatInputObjectSchema } from './UserUpdateWithoutVoiceChatInput.schema';
import { UserUncheckedUpdateWithoutVoiceChatInputObjectSchema } from './UserUncheckedUpdateWithoutVoiceChatInput.schema';
import { UserCreateWithoutVoiceChatInputObjectSchema } from './UserCreateWithoutVoiceChatInput.schema';
import { UserUncheckedCreateWithoutVoiceChatInputObjectSchema } from './UserUncheckedCreateWithoutVoiceChatInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutVoiceChatInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => UserUpdateWithoutVoiceChatInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutVoiceChatInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => UserCreateWithoutVoiceChatInputObjectSchema),
        z.lazy(() => UserUncheckedCreateWithoutVoiceChatInputObjectSchema),
      ]),
    })
    .strict();

export const UserUpsertWithWhereUniqueWithoutVoiceChatInputObjectSchema =
  Schema;
