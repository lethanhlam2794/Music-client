"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerUser } from "@/redux/RegisterSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerSchema, type RegisterFormValues } from "@/features/auth/auth-validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/shared/FormField";
import { AuthTemplate } from "@/templates/AuthTemplate";
import Link from "next/link";

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { isLoading, error, user } = useAppSelector((state) => state.register);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    dispatch(registerUser(data));
  };

  if (user) {
    return (
      <AuthTemplate
        title="Đăng ký thành công!"
        footer={
          <span>
            <Link href="/login" className="text-primary hover:underline">
              Chuyển sang đăng nhập
            </Link>
          </span>
        }
      >
        <p className="text-center text-muted-foreground">
          Tài khoản của bạn đã được tạo. Vui lòng đăng nhập để tiếp tục.
        </p>
        <Button className="w-full" onClick={() => router.push("/login")}>
          Đăng nhập
        </Button>
      </AuthTemplate>
    );
  }

  return (
    <AuthTemplate
      title="Đăng ký"
      subtitle="Tạo tài khoản mới để bắt đầu"
      footer={
        <span>
          Đã có tài khoản?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Đăng nhập
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="fullName"
          label="Họ và tên"
          required
          error={errors.fullName}
        >
          <Input type="text" placeholder="Nhập họ và tên" {...register("fullName")} />
        </FormField>
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
          {isLoading ? "Đang đăng ký..." : "Đăng ký"}
        </Button>
      </form>
    </AuthTemplate>
  );
}
