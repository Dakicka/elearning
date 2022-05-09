import { Alert } from "./Alert"

const FullPageErrorFallback = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        <img
          className="py-8"
          src={require("../images/404Error.jpg")}
          alt="A car flying around the earth in space"
        />
        <p>Uh oh... You took the wrong turn!.</p>
        <Alert msg="Error 404" />
        <pre></pre>
      </div>
    </div>
  )
}

export default FullPageErrorFallback
