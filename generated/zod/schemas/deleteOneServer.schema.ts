import { z } from 'zod';
import { ServerWhereUniqueInputObjectSchema } from './objects/ServerWhereUniqueInput.schema';

export const ServerDeleteOneSchema = z.object({
  where: ServerWhereUniqueInputObjectSchema,
});
