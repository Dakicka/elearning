import React from "react"
import { SpinnerGreenLarge } from "./Spinner"

function FullPageSpinner() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        <SpinnerGreenLarge />
      </div>
    </div>
  )
}

export default FullPageSpinner
