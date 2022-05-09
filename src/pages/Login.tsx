import { useForm } from "react-hook-form";
import { FormContainer, InputText } from "../components/FormElements";
import { useAsync } from "../hooks/useAsync";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "../components/Alert";
import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/Button";
import { LoginForm } from "../AuthProvider";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onSubmit" });

  const { run, error, isSuccess, isLoading } = useAsync<any>();
  const { login } = useAuth();

  const onSubmit = handleSubmit(({ email, password }) =>
    run(login({ email, password }))
  );
  isSuccess && navigate("/", { replace: true });

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Login
        </div>
        <div className="text-center font-medium text-sm mt-2">
          Don't have an account?{" "}
          <Link className="underline" to={"/signup"}>
            Sign-up
          </Link>{" "}
          for free!
        </div>
        <FormContainer>
          <form onSubmit={onSubmit} className="space-y-6">
            <InputText
              errors={errors}
              registerHandler={() =>
                register("email", {
                  required: "This is a required field",
                })
              }
              name="email"
              type="text"
            >
              Email
            </InputText>
            <InputText
              errors={errors}
              registerHandler={() =>
                register("password", {
                  required: "This is a required field",
                })
              }
              name="password"
              type="password"
            >
              Password
            </InputText>
            {error && error.statusCode && error.statusCode >= 400 && (
              <Alert msg={"Your password or email is incorrect!"} />
            )}

            <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
          </form>
        </FormContainer>
      </div>
    </div>
  );
}

export default Login;
