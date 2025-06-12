import { z } from 'zod';
import { ChannelTypeSchema } from '../enums/ChannelType.schema';
import { CategoryCreateNestedOneWithoutChannelsInputObjectSchema } from './CategoryCreateNestedOneWithoutChannelsInput.schema';
import { UserCreateNestedManyWithoutDirectMsgsInputObjectSchema } from './UserCreateNestedManyWithoutDirectMsgsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelCreateWithoutMessagesInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    channelType: z.lazy(() => ChannelTypeSchema).optional(),
    index: z.number().optional(),
    category: z
      .lazy(() => CategoryCreateNestedOneWithoutChannelsInputObjectSchema)
      .optional(),
    directMsgFor: z
      .lazy(() => UserCreateNestedManyWithoutDirectMsgsInputObjectSchema)
      .optional(),
  })
  .strict();

export const ChannelCreateWithoutMessagesInputObjectSchema = Schema;
