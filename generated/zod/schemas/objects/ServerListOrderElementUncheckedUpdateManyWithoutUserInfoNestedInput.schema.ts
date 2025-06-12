import { z } from 'zod';
import { ServerListOrderElementCreateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementCreateWithoutUserInfoInput.schema';
import { ServerListOrderElementUncheckedCreateWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUncheckedCreateWithoutUserInfoInput.schema';
import { ServerListOrderElementCreateOrConnectWithoutUserInfoInputObjectSchema } from './ServerListOrderElementCreateOrConnectWithoutUserInfoInput.schema';
import { ServerListOrderElementUpsertWithWhereUniqueWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUpsertWithWhereUniqueWithoutUserInfoInput.schema';
import { ServerListOrderElementCreateManyUserInfoInputEnvelopeObjectSchema } from './ServerListOrderElementCreateManyUserInfoInputEnvelope.schema';
import { ServerListOrderElementWhereUniqueInputObjectSchema } from './ServerListOrderElementWhereUniqueInput.schema';
import { ServerListOrderElementUpdateWithWhereUniqueWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUpdateWithWhereUniqueWithoutUserInfoInput.schema';
import { ServerListOrderElementUpdateManyWithWhereWithoutUserInfoInputObjectSchema } from './ServerListOrderElementUpdateManyWithWhereWithoutUserInfoInput.schema';
import { ServerListOrderElementScalarWhereInputObjectSchema } from './ServerListOrderElementScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerListOrderElementUncheckedUpdateManyWithoutUserInfoNestedInput> =
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
      upsert: z
        .union([
          z.lazy(
            () =>
              ServerListOrderElementUpsertWithWhereUniqueWithoutUserInfoInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ServerListOrderElementUpsertWithWhereUniqueWithoutUserInfoInputObjectSchema,
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
      set: z
        .union([
          z.lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema),
          z
            .lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema),
          z
            .lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema),
          z
            .lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema),
          z
            .lazy(() => ServerListOrderElementWhereUniqueInputObjectSchema)
            .array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () =>
              ServerListOrderElementUpdateWithWhereUniqueWithoutUserInfoInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ServerListOrderElementUpdateWithWhereUniqueWithoutUserInfoInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () =>
              ServerListOrderElementUpdateManyWithWhereWithoutUserInfoInputObjectSchema,
          ),
          z
            .lazy(
              () =>
                ServerListOrderElementUpdateManyWithWhereWithoutUserInfoInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ServerListOrderElementScalarWhereInputObjectSchema),
          z
            .lazy(() => ServerListOrderElementScalarWhereInputObjectSchema)
            .array(),
        ])
        .optional(),
    })
    .strict();

export const ServerListOrderElementUncheckedUpdateManyWithoutUserInfoNestedInputObjectSchema =
  Schema;
