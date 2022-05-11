import React from "react";
import { SpinnerPrimaryLarge } from "./Spinner";

function FullPageSpinner() {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        <SpinnerPrimaryLarge />
      </div>
    </div>
  );
}

export default FullPageSpinner;
