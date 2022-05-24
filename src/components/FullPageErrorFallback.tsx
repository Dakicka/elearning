import { Alert } from "./Alert";

interface FullPageErrorFallbackProps {
  error:
    | (Error & {
        statusCode?: number | undefined;
      })
    | null;
}

const FullPageErrorFallback = ({ error }: FullPageErrorFallbackProps) => {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        <p>
          Uh oh... You broke the app in exciting new ways which I did not
          predict. Try refreshing the app.
        </p>
        <Alert msg={`Error: ${error?.statusCode}!`}>
          Message: {error?.message}
        </Alert>
        <pre></pre>
      </div>
    </div>
  );
};

export default FullPageErrorFallback;
