import { z } from 'zod';
import { ServerWhereUniqueInputObjectSchema } from './objects/ServerWhereUniqueInput.schema';

export const ServerFindUniqueSchema = z.object({
  where: ServerWhereUniqueInputObjectSchema,
});
