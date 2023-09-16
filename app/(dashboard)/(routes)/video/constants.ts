import z from 'zod'

export const formSchema = z.object({
  prompt: z.string().trim().min(1, 'Video prompt is required'),
})
