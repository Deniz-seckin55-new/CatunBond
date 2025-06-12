import { z } from 'zod';
import { ServerInfoWhereUniqueInputObjectSchema } from './objects/ServerInfoWhereUniqueInput.schema';

export const ServerInfoFindUniqueSchema = z.object({
  where: ServerInfoWhereUniqueInputObjectSchema,
});
