import { z } from "zod";
import { product } from "./product";

export const customer = z.object({
  customer_id: z.string().uuid(),
  productList: z.array(
    z.object({
      product_id: z.string().uuid(),
      qty: z.number(),
    })
  ),
});
