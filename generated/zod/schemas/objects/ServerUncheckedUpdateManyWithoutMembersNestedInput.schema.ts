import { z } from 'zod';
import { ServerCreateWithoutMembersInputObjectSchema } from './ServerCreateWithoutMembersInput.schema';
import { ServerUncheckedCreateWithoutMembersInputObjectSchema } from './ServerUncheckedCreateWithoutMembersInput.schema';
import { ServerCreateOrConnectWithoutMembersInputObjectSchema } from './ServerCreateOrConnectWithoutMembersInput.schema';
import { ServerUpsertWithWhereUniqueWithoutMembersInputObjectSchema } from './ServerUpsertWithWhereUniqueWithoutMembersInput.schema';
import { ServerWhereUniqueInputObjectSchema } from './ServerWhereUniqueInput.schema';
import { ServerUpdateWithWhereUniqueWithoutMembersInputObjectSchema } from './ServerUpdateWithWhereUniqueWithoutMembersInput.schema';
import { ServerUpdateManyWithWhereWithoutMembersInputObjectSchema } from './ServerUpdateManyWithWhereWithoutMembersInput.schema';
import { ServerScalarWhereInputObjectSchema } from './ServerScalarWhereInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerUncheckedUpdateManyWithoutMembersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ServerCreateWithoutMembersInputObjectSchema),
          z.lazy(() => ServerCreateWithoutMembersInputObjectSchema).array(),
          z.lazy(() => ServerUncheckedCreateWithoutMembersInputObjectSchema),
          z
            .lazy(() => ServerUncheckedCreateWithoutMembersInputObjectSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ServerCreateOrConnectWithoutMembersInputObjectSchema),
          z
            .lazy(() => ServerCreateOrConnectWithoutMembersInputObjectSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => ServerUpsertWithWhereUniqueWithoutMembersInputObjectSchema,
          ),
          z
            .lazy(
              () => ServerUpsertWithWhereUniqueWithoutMembersInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => ServerWhereUniqueInputObjectSchema),
          z.lazy(() => ServerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ServerWhereUniqueInputObjectSchema),
          z.lazy(() => ServerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ServerWhereUniqueInputObjectSchema),
          z.lazy(() => ServerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ServerWhereUniqueInputObjectSchema),
          z.lazy(() => ServerWhereUniqueInputObjectSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => ServerUpdateWithWhereUniqueWithoutMembersInputObjectSchema,
          ),
          z
            .lazy(
              () => ServerUpdateWithWhereUniqueWithoutMembersInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => ServerUpdateManyWithWhereWithoutMembersInputObjectSchema,
          ),
          z
            .lazy(
              () => ServerUpdateManyWithWhereWithoutMembersInputObjectSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ServerScalarWhereInputObjectSchema),
          z.lazy(() => ServerScalarWhereInputObjectSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ServerUncheckedUpdateManyWithoutMembersNestedInputObjectSchema =
  Schema;
