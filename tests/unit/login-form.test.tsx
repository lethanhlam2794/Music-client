import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/store";
import LoginForm from "@/components/login/loginform";

describe("LoginForm", () => {
  it("shows validation errors on empty submit", async () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );
    const btn = screen.getByRole("button", { name: /Đăng nhập/ });
    fireEvent.click(btn);

    expect(await screen.findByText("Email không hợp lệ")).toBeInTheDocument();
    expect(
      await screen.findByText("Vui lòng nhập mật khẩu")
    ).toBeInTheDocument();
  });
});
