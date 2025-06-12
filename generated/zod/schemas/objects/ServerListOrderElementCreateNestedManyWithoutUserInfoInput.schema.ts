import { z } from 'zod';
import { ServerListOrderElementCreateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementCreateWithoutUserInfoInput.schema';
import { ServerListOrderElementUncheckedCreateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUncheckedCreateWithoutUserInfoInput.schema';
import { ServerListOrderElementCreateOrConnectWithoutUserInfoInputObjectSchema } from './ServerListOrderElementCreateOrConnectWithoutUserInfoInput.schema';
import { ServerListOrderElementCreateManyUserInfoInputEnvelopeObjectSchema } from './ServerListOrderElementCreateManyUserInfoInputEnvelope.schema';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './ServerListOrderElementWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementCreateNestedManyWithoutUserInfoInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(
            () => ServerListOrderElementCreateWithoutUserInfoInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ServerListOrderElementCreateWithoutUserInfoInputObjectSchema,
            )
            .array(),
          z.lazy(
            () =>
              ServerListOrderElementUncheckedCreateWithoutUserInfoInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ServerListOrderElementUncheckedCreateWithoutUserInfoInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(
            () =>
              ServerListOrderElementCreateOrConnectWithoutUserInfoInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ServerListOrderElementCreateOrConnectWithoutUserInfoInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(
          () =>
            ServerListOrderElementCreateManyUserInfoInputEnvelopeObjectSchema,
        )
        .optional(),
      connect: z
        .union([
          z.lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema),
          z
            .lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const ServerListOrderElementCreateNestedManyWithoutUserInfoInputObjectSchema =
  Schema;
