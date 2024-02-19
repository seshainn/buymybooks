import * as z from 'zod'

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(15),
})

export const newUserSchema = z.object({
  name: z.string().min(2).max(15),
  email: z.string().email(),
  password: z.string().min(2).max(15),
})
