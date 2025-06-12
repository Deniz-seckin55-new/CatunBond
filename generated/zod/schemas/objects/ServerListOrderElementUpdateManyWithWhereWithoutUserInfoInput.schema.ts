import { z } from 'zod';
import { ServerListOrderElementScalarWhereInputObjectSchema } from './ServerListOrderElementScalarWhereInput.schema';
import { ServerListOrderElementUpdateManyMutationInputObjectSchema } from './ServerListOrderElementUpdateManyMutationInput.schema';
import { ServerListOrderElementUncheckedUpdateManyWithoutServerListOrderInputObjectSchema } from './ServerListOrderElementUncheckedUpdateManyWithoutServerListOrderInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementUpdateManyWithWhereWithoutUserInfoInput> =
  z
    .object({
      where: z.lazy(() => ServerListOrderElementScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => ServerListOrderElementUpdateManyMutationInputObjectSchema),
        z.lazy(
          () =>
            ServerListOrderElementUncheckedUpdateManyWithoutServerListOrderInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ServerListOrderElementUpdateManyWithWhereWithoutUserInfoInputObjectSchema =
  Schema;
