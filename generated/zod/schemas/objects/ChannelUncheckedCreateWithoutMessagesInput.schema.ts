import { z } from 'zod';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { UserUncheckedCreateNestedManyWithoutDirectMsgsInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutDirectMsgsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUncheckedCreateWithoutMessagesInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    channelType: z.lazy(() => ChannelTypeSchema).optional(),
    categoryId: z.string().optional().nullable(),
    index: z.number().optional(),
    directMsgFor: z
      .lazy(
        () => UserUncheckedCreateNestedManyWithoutDirectMsgsInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ChannelUncheckedCreateWithoutMessagesInputObjectSchema = Schema;
