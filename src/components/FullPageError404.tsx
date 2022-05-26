import { Alert } from "./Alert";
import error404 from "../images/error404.jpg";

const FullPageErrorFallback = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        <img
          className="py-8"
          src={error404}
          alt="A car flying around the earth in space"
        />
        <p>Uh oh... You took the wrong turn!.</p>
        <Alert msg="Error 404" />
        <pre></pre>
      </div>
    </div>
  );
};

export default FullPageErrorFallback;
