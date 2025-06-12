import { z } from 'zod';
import { ServerCreateWithoutMembersInputObjectSchema } from './ServerCreateWithoutMembersInput.schema';
import { ServerUncheckedCreateWithoutMembersInputObjectSchema } from './ServerUncheckedCreateWithoutMembersInput.schema';
import { ServerCreateOrConnectWithoutMembersInputObjectSchema } from './ServerCreateOrConnectWithoutMembersInput.schema';
import { ServerWhereUniqueInputObjectSchema } from './ServerWhereUniqueInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.ServerCreateNestedManyWithoutMembersInput> = z
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
    connect: z
      .union([
        z.lazy(() => ServerWhereUniqueInputObjectSchema),
        z.lazy(() => ServerWhereUniqueInputObjectSchema).array(),
      ])
      .optional(),
  })
  .strict();

export const ServerCreateNestedManyWithoutMembersInputObjectSchema = Schema;
