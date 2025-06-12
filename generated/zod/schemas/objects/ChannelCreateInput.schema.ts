import { z } from 'zod';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { CategoryCreateNestedOneWithoutChannelsInputObjectSchema } from './CategoryCreateNestedOneWithoutChannelsInput.schema';
import { MessagesCreateNestedManyWithoutChannelInputObjectSchema } from './MessagesCreateNestedManyWithoutChannelInput.schema';
import { UserCreateNestedManyWithoutDirectMsgsInputObjectSchema } from './UserCreateNestedManyWithoutDirectMsgsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    channelType: z.lazy(() => ChannelTypeSchema).optional(),
    index: z.number().optional(),
    category: z
      .lazy(() => CategoryCreateNestedOneWithoutChannelsInputObjectSchema)
      .optional(),
    messages: z
      .lazy(() => MessagesCreateNestedManyWithoutChannelInputObjectSchema)
      .optional(),
    directMsgFor: z
      .lazy(() => UserCreateNestedManyWithoutDirectMsgsInputObjectSchema)
      .optional(),
  })
  .strict();

export const ChannelCreateInputObjectSchema = Schema;
