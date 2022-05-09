import { useForm } from "react-hook-form";
import { FormContainer, InputText } from "../components/FormElements";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "../components/Alert";
import { useAsync } from "../hooks/useAsync";
import { SubmitButton } from "../components/Button";
import { SignupForm } from "../AuthProvider";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupForm>({ mode: "onSubmit" });

  const navigate = useNavigate();
  const { signup } = useAuth();
  const { run, error, isLoading, isSuccess } = useAsync<any>();

  const onSubmit = handleSubmit(({ email, password, name }) => {
    run(signup({ email, password, name }));
  });
  if (isSuccess) navigate("/", { replace: true });
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Sign Up
        </div>
        <div className="text-center font-medium text-xl mt-2">
          Sign up now for free and start trading!
        </div>
        <FormContainer>
          <form onSubmit={onSubmit} className="space-y-6">
            <InputText
              errors={errors}
              registerHandler={() =>
                register("name", {
                  required: "This is a required field",
                })
              }
              name="firstName"
              type="text"
            >
              First Name
            </InputText>
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
            {error && error.statusCode && error.statusCode === 400 && (
              <Alert msg={"This email is already registered."}>
                Try to{" "}
                <Link to={"/login"} className="underline">
                  login
                </Link>{" "}
                instead.
              </Alert>
            )}

            <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
          </form>
        </FormContainer>
      </div>
    </div>
  );
}

export default Signup;
