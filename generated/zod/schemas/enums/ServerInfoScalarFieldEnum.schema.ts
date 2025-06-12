import { z } from 'zod';

export const ServerInfoScalarFieldEnumSchema = z.enum([
  'serverId',
  'name',
  'iconUrl',
  'maxUsers',
  'color',
  'description',
  'slogan',
  'rules',
]);
