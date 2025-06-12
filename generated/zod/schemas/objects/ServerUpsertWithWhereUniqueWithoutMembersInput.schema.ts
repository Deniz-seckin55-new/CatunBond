import { z } from 'zod';
import { ServerWhereUniqueInputObjectSchema } from './ServerWhereUniqueInput.schema';
import { ServerUpdateWithoutMembersInputObjectSchema } from './ServerUpdateWithoutMembersInput.schema';
import { ServerUncheckedUpdateWithoutMembersInputObjectSchema } from './ServerUncheckedUpdateWithoutMembersInput.schema';
import { ServerCreateWithoutMembersInputObjectSchema } from './ServerCreateWithoutMembersInput.schema';
import { ServerUncheckedCreateWithoutMembersInputObjectSchema } from './ServerUncheckedCreateWithoutMembersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerUpsertWithWhereUniqueWithoutMembersInput> =
  z
    .object({
      where: z.lazy(() => ServerWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(() => ServerUpdateWithoutMembersInputObjectSchema),
        z.lazy(() => ServerUncheckedUpdateWithoutMembersInputObjectSchema),
      ]),
      create: z.union([
        z.lazy(() => ServerCreateWithoutMembersInputObjectSchema),
        z.lazy(() => ServerUncheckedCreateWithoutMembersInputObjectSchema),
      ]),
    })
    .strict();

export const ServerUpsertWithWhereUniqueWithoutMembersInputObjectSchema =
  Schema;
