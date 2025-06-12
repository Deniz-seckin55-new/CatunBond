import { z } from 'zod';

export const ChannelTypeSchema = z.enum(['TEXT', 'DIRECTMESSAGE']);
