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
  if (isSuccess) {
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col md:justify-center p-5">
      <div className="max-w-md w-full mx-auto">
        <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
          Registrierung
        </div>
        <div className="text-center font-medium text-xl mt-2 text-gray-700 mb-7">
          Registriere dich jetzt kostenlos und werden zum Life Hacker!
        </div>
        <FormContainer>
          <form onSubmit={onSubmit} className="space-y-6">
            <InputText
              errors={errors}
              registerHandler={() =>
                register("name", {
                  required: "Bitte gib deinen Namen ein",
                })
              }
              name="firstName"
              type="text"
            >
              Wie heißt du?
            </InputText>
            <InputText
              errors={errors}
              registerHandler={() =>
                register("email", {
                  required: "Bitte gib deine E-Mail-Adresse ein",
                })
              }
              name="email"
              type="text"
            >
              E-Mail-Adresse
            </InputText>
            <InputText
              errors={errors}
              registerHandler={() =>
                register("password", {
                  required: "Bitte gib dein Passwort ein",
                })
              }
              name="password"
              type="password"
            >
              Passwort
            </InputText>
            {error && error.statusCode && error.statusCode === 400 && (
              <Alert msg={"Diese E-Mail-Adresse ist schon registriert."}>
                Versuch dich{" "}
                <Link to={"/login"} className="underline">
                  hier
                </Link>{" "}
                anzumelden.
              </Alert>
            )}

            <SubmitButton isLoading={isLoading}>Registrieren</SubmitButton>
          </form>
        </FormContainer>
      </div>
    </div>
  );
}

export default Signup;
