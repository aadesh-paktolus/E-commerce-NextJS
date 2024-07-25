import { NextPage } from "next";
import LoginForm from "./login-form/index";

type ILoginPage = {
  searchParams: { callbackUrl: string; error: string };
};

const LoginPage: NextPage<ILoginPage> = async ({ searchParams }) => {
  return (
    <LoginForm
      callbackUrl={searchParams.callbackUrl}
      error={searchParams.error}
    />
  );
};
export default LoginPage;
