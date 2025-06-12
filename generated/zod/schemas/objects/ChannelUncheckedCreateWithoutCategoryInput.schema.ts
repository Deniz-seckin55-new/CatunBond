import { z } from 'zod';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { MessagesUncheckedCreateNestedManyWithoutChannelInputObjectSchema } from './MessagesUncheckedCreateNestedManyWithoutChannelInput.schema';
import { UserUncheckedCreateNestedManyWithoutDirectMsgsInputObjectSchema } from './UserUncheckedCreateNestedManyWithoutDirectMsgsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUncheckedCreateWithoutCategoryInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    channelType: z.lazy(() => ChannelTypeSchema).optional(),
    index: z.number().optional(),
    messages: z
      .lazy(
        () => MessagesUncheckedCreateNestedManyWithoutChannelInputObjectSchema,
      )
      .optional(),
    directMsgFor: z
      .lazy(
        () => UserUncheckedCreateNestedManyWithoutDirectMsgsInputObjectSchema,
      )
      .optional(),
  })
  .strict();

export const ChannelUncheckedCreateWithoutCategoryInputObjectSchema = Schema;
