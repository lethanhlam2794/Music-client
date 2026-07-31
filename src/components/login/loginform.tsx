"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { loginUser } from "@/redux/LoginSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginSchema, type LoginFormValues } from "@/features/auth/auth-validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/FormField";
import { AuthTemplate } from "@/templates/AuthTemplate";
import Link from "next/link";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, error } = useAppSelector((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      router.push("/");
    }
  };

  return (
    <AuthTemplate
      title="Đăng nhập"
      subtitle="Nhập thông tin tài khoản để tiếp tục"
      footer={
        <span>
          Chưa có tài khoản?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Đăng ký
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="email"
          label="Email"
          required
          error={errors.email}
        >
          <Input type="email" placeholder="Nhập email" {...register("email")} />
        </FormField>
        <FormField
          name="password"
          label="Mật khẩu"
          required
          error={errors.password}
        >
          <Input type="password" placeholder="Nhập mật khẩu" {...register("password")} />
        </FormField>
        {error && (
          <p className="text-sm text-destructive text-center">
            {typeof error === "string" ? error : (error as { message: string }).message}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>
    </AuthTemplate>
  );
}
