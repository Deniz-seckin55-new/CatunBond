import { z } from 'zod';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './ServerListOrderElementWhereUniqueInput.schema';
import { ServerListOrderElementUpdateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUpdateWithoutUserInfoInput.schema';
import { ServerListOrderElementUncheckedUpdateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUncheckedUpdateWithoutUserInfoInput.schema';
import { ServerListOrderElementCreateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementCreateWithoutUserInfoInput.schema';
import { ServerListOrderElementUncheckedCreateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUncheckedCreateWithoutUserInfoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementUpsertWithWhereUniqueWithoutUserInfoInput> =
  z
    .object({
      where: z.lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema),
      update: z.union([
        z.lazy(
          () => ServerListOrderElementUpdateWithoutUserInfoInputObjectSchema,
        ),
        z.lazy(
          () =>
            ServerListOrderElementUncheckedUpdateWithoutUserInfoInputObjectSchema,
        ),
      ]),
      create: z.union([
        z.lazy(
          () => ServerListOrderElementCreateWithoutUserInfoInputObjectSchema,
        ),
        z.lazy(
          () =>
            ServerListOrderElementUncheckedCreateWithoutUserInfoInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const ServerListOrderElementUpsertWithWhereUniqueWithoutUserInfoInputObjectSchema =
  Schema;
