import { z } from 'zod';

export const FriendRequestStatusSchema = z.enum([
  'PENDING',
  'ACCEPTED',
  'DECLINED',
  'CANCELED',
  'BLOCKED',
]);
