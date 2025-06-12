import { z } from 'zod';
import { ServerInfoWhereUniqueInputObjectSchema } from './objects/ServerInfoWhereUniqueInput.schema';

export const ServerInfoDeleteOneSchema = z.object({
  where: ServerInfoWhereUniqueInputObjectSchema,
});
