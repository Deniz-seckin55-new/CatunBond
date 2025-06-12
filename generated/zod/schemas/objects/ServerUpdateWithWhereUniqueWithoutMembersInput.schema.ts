import { z } from 'zod';
import { ServerWhereUniqueInputObjectSchema } from './ServerWhereUniqueInput.schema';
import { ServerUpdateWithoutMembersInputObjectSchema } from './ServerUpdateWithoutMembersInput.schema';
import { ServerUncheckedUpdateWithoutMembersInputObjectSchema } from './ServerUncheckedUpdateWithoutMembersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerUpdateWithWhereUniqueWithoutMembersInput> =
  z
    .object({
      where: z.lazy(() => ServerWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(() => ServerUpdateWithoutMembersInputObjectSchema),
        z.lazy(() => ServerUncheckedUpdateWithoutMembersInputObjectSchema),
      ]),
    })
    .strict();

export const ServerUpdateWithWhereUniqueWithoutMembersInputObjectSchema =
  Schema;
