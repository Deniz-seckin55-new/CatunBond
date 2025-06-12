import { z } from 'zod';
import { ServerScalarWhereInputObjectSchema } from './ServerScalarWhereInput.schema';
import { ServerUpdateManyMutationInputObjectSchema } from './ServerUpdateManyMutationInput.schema';
import { ServerUncheckedUpdateManyWithoutServersInputObjectSchema } from './ServerUncheckedUpdateManyWithoutServersInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerUpdateManyWithWhereWithoutMembersInput> = z
  .object({
    where: z.lazy(() => ServerScalarWhereInputObjectSchema),
    data: z.union([
      z.lazy(() => ServerUpdateManyMutationInputObjectSchema),
      z.lazy(() => ServerUncheckedUpdateManyWithoutServersInputObjectSchema),
    ]),
  })
  .strict();

export const ServerUpdateManyWithWhereWithoutMembersInputObjectSchema = Schema;
