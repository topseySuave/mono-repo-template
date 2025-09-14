import { z } from 'zod'

export const createUserBody = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})


