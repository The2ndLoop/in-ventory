import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("形式が正しくありません"),
  password: z.string().min(1, "パスワードは必須です"),
});
