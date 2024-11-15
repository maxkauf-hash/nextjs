import * as z from 'zod'

export const LoginUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})