import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateWithoutVoiceChatInputObjectSchema } from './UserUpdateWithoutVoiceChatInput.schema';
import { UserUncheckedUpdateWithoutVoiceChatInputObjectSchema } from './UserUncheckedUpdateWithoutVoiceChatInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutVoiceChatInput> =
  z
    .object({
      where: z.lazy(() => UserWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => UserUpdateWithoutVoiceChatInputObjectSchema),
        z.lazy(() => UserUncheckedUpdateWithoutVoiceChatInputObjectSchema),
      ]),
    })
    .strict();

export const UserUpdateWithWhereUniqueWithoutVoiceChatInputObjectSchema =
  Schema;
