import { z } from 'zod';
import { UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutVoiceChatInputObjectSchema } from './UserCreateWithoutVoiceChatInput.schema';
import { UserUncheckedCreateWithoutVoiceChatInputObjectSchema } from './UserUncheckedCreateWithoutVoiceChatInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateOrConnectWithoutVoiceChatInput> = z
  .object({
    where: z.lazy(() => UserWhereUniqueInputObjectSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutVoiceChatInputObjectSchema),
      z.lazy(() => UserUncheckedCreateWithoutVoiceChatInputObjectSchema),
    ]),
  })
  .strict();

export const UserCreateOrConnectWithoutVoiceChatInputObjectSchema = Schema;
