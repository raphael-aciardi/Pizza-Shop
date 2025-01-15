import { z } from "zod";

const envSchema = z.object({
  MODE: z.enum(["development", "production", "test"]),
  VITE_API_URL: z.string(), 
  VITE_ENABLE_API_DELAY: z.string().transform((value) => value === 'true').pipe(z.boolean()), 
});

export const env = envSchema.parse(import.meta.env); 
