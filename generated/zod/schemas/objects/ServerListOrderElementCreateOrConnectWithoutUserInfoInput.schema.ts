import { z } from 'zod';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './ServerListOrderElementWhereUniqueInput.schema';
import { ServerListOrderElementCreateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementCreateWithoutUserInfoInput.schema';
import { ServerListOrderElementUncheckedCreateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUncheckedCreateWithoutUserInfoInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementCreateOrConnectWithoutUserInfoInput> =
  z
    .object({
      where: z.lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema),
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

export const ServerListOrderElementCreateOrConnectWithoutUserInfoInputObjectSchema =
  Schema;
