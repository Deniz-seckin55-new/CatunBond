import { z } from 'zod';
import { VoiceChatWhereInputObjectSchema } from './VoiceChatWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.VoiceChatRelationFilter> = z
  .object({
    is: z
      .lazy(() => VoiceChatWhereInputObjectSchema)
      .optional()
      .nullable(),
    isNot: z
      .lazy(() => VoiceChatWhereInputObjectSchema)
      .optional()
      .nullable(),
  })
  .strict();

export const VoiceChatRelationFilterObjectSchema = Schema;
