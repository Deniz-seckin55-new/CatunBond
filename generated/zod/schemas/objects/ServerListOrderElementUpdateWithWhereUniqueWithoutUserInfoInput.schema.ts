import { z } from 'zod';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './ServerListOrderElementWhereUniqueInput.schema';
import { ServerListOrderElementUpdateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUpdateWithoutUserInfoInput.schema';
import { ServerListOrderElementUncheckedUpdateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUncheckedUpdateWithoutUserInfoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementUpdateWithWhereUniqueWithoutUserInfoInput> =
  z
    .object({
      where: z.lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema),
      data: z.union([
        z.lazy(
          () => ServerListOrderElementUpdateWithoutUserInfoInputObjectSchema,
        ),
        z.lazy(
          () =>
            ServerListOrderElementUncheckedUpdateWithoutUserInfoInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ServerListOrderElementUpdateWithWhereUniqueWithoutUserInfoInputObjectSchema =
  Schema;
