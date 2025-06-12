import { z } from 'zod';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { MessagesUncheckedCreateNestedManyWithoutChannelInputObjectSchema } from './MessagesUncheckedCreateNestedManyWithoutChannelInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUncheckedCreateWithoutDirectMsgForInput> =
  z
    .object({
      id: z.string().optional(),
      name: z.string(),
      channelType: z.lazy(() => ChannelTypeSchema).optional(),
      categoryId: z.string().optional().nullable(),
      index: z.number().optional(),
      messages: z
        .lazy(
          () =>
            MessagesUncheckedCreateNestedManyWithoutChannelInputObjectSchema,
        )
        .optional(),
    })
    .strict();

export const ChannelUncheckedCreateWithoutDirectMsgForInputObjectSchema =
  Schema;
