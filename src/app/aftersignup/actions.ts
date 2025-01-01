'use server'
 
import { redirect } from 'next/navigation'
 
export async function navigate(data: string) {
  redirect(data);
}