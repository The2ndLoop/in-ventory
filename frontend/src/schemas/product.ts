import { z } from "zod";

export const product = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
