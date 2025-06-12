import { z } from 'zod';
import { UserCreateManyVoiceChatInputObjectSchema } from './UserCreateManyVoiceChatInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserCreateManyVoiceChatInputEnvelope> = z
  .object({
    data: z.union([
      z.lazy(() => UserCreateManyVoiceChatInputObjectSchema),
      z.lazy(() => UserCreateManyVoiceChatInputObjectSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UserCreateManyVoiceChatInputEnvelopeObjectSchema = Schema;
