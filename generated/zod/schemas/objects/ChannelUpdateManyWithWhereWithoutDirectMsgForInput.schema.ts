import { z } from 'zod';
import { ChannelScalarWhereInputObjectSchema } from './ChannelScalarWhereInput.schema';
import { ChannelUpdateManyMutationInputObjectSchema } from './ChannelUpdateManyMutationInput.schema';
import { ChannelUncheckedUpdateManyWithoutDirectMsgsInputObjectSchema } from './ChannelUncheckedUpdateManyWithoutDirectMsgsInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ChannelUpdateManyWithWhereWithoutDirectMsgForInput> =
  z
    .object({
      where: z.lazy(() => ChannelScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ChannelUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => ChannelUncheckedUpdateManyWithoutDirectMsgsInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ChannelUpdateManyWithWhereWithoutDirectMsgForInputObjectSchema =
  Schema;
