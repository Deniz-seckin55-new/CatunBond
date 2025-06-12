import { z } from 'zod';
import { AuthWhereUniqueInputObjectSchema } from './objects/AuthWhereUniqueInput.schema';
import { AuthCreateInputObjectSchema } from './objects/AuthCreateInput.schema';
import { AuthUncheckedCreateInputObjectSchema } from './objects/AuthUncheckedCreateInput.schema';
import { AuthUpdateInputObjectSchema } from './objects/AuthUpdateInput.schema';
import { AuthUncheckedUpdateInputObjectSchema } from './objects/AuthUncheckedUpdateInput.schema';

export const AuthUpsertSchema = z.object({
  where: AuthWhereUniqueInputObjectSchema,
  create: z.union([
    AuthCreateInputObjectSchema,
    AuthUncheckedCreateInputObjectSchema,
  ]),
  update: z.union([
    AuthUpdateInputObjectSchema,
    AuthUncheckedUpdateInputObjectSchema,
  ]),
});
