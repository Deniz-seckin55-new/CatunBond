import { z } from 'zod';
import { UserScalarWhereInputObjectSchema } from './UserScalarWhereInput.schema';
import { UserUpdateManyMutationInputObjectSchema } from './UserUpdateManyMutationInput.schema';
import { UserUncheckedUpdateManyWithoutDirectMsgForInputObjectSchema } from './UserUncheckedUpdateManyWithoutDirectMsgForInput.schema';

import type { Prisma } from '@prisma/client';

const Schema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutDirectMsgsInput> =
  z
    .object({
      where: z.lazy(() => UserScalarWhereInputObjectSchema),
      data: z.union([
        z.lazy(() => UserUpdateManyMutationInputObjectSchema),
        z.lazy(
          () => UserUncheckedUpdateManyWithoutDirectMsgForInputObjectSchema,
        ),
      ]),
    })
    .strict();

export const UserUpdateManyWithWhereWithoutDirectMsgsInputObjectSchema = Schema;
