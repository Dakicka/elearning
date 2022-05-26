import { useForm } from "react-hook-form";
import { FormContainer, InputText } from "../components/FormElements";
import { useAsync } from "../hooks/useAsync";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "../components/Alert";
import { Link, useNavigate } from "react-router-dom";
import { SubmitButton } from "../components/Button";
import { LoginRegisterForm } from "../AuthProvider";
import { useEffect } from "react";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRegisterForm>({ mode: "onSubmit" });

  const { run, error, isSuccess, isLoading } = useAsync<any>();
  const { login } = useAuth();

  const onSubmit = handleSubmit(({ email, password }) =>
    run(login({ email, password }))
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("/", { replace: true });
    }
  }, [isSuccess]);

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col md:justify-center p-5">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 text-center">
          Anmelden
        </div>
        <div className="text-center font-medium text-sm mt-2 text-gray-700 mb-8">
          Hast du noch keinen Account?{" "}
          <Link className="underline" to={"/register"}>
            Registriere
          </Link>{" "}
          dich kostenlos!
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
              Passwort
            </InputText>
            {error && error.statusCode && error.statusCode >= 400 && (
              <Alert msg={"Your password or email is incorrect!"} />
            )}

            <SubmitButton isLoading={isLoading}>Einloggen</SubmitButton>
          </form>
        </FormContainer>
      </div>
    </div>
  );
}

export default Login;
