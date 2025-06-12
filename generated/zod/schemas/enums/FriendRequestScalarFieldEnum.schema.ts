import { z } from 'zod';

export const FriendRequestScalarFieldEnumSchema = z.enum([
  'id',
  'senderId',
  'receiverId',
  'status',
  'createdAt',
  'updatedAt',
]);
