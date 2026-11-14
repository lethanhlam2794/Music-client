import { z } from "zod";

export const emailSchema = z
  .string({ error: "Vui lòng nhập email" })
  .min(1, "Email không được để trống")
  .email("Định dạng email không hợp lệ");

export const passwordSchema = z
  .string({ error: "Vui lòng nhập mật khẩu" })
  .min(6, "Mật khẩu phải có ít nhất 6 ký tự");

export const requiredStringSchema = (fieldName: string) =>
  z.string({ error: `Vui lòng nhập ${fieldName}` }).min(1, `${fieldName} không được để trống`);
