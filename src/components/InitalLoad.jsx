// components/InitialLoad.jsx
import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import Brand from "./Brand";

const InitialLoad = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 15);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Brand />
      <div className="flex items-center justify-center flex-col">
        <div className="card bg-base-100 shadow-lg p-8 text-center space-y-4">
          <FaSpinner
            className={`animate-spin text-primary h-24 w-24 mx-auto ${progress === 100 && "hidden"}`}
          />
          <p className="text-lg font-semibold text-gray-700">
            {progress < 100 ? "Loading, please wait..." : "Loaded!"}
          </p>
          <progress
            className="progress w-56 bg-primary-focus"
            value={progress}
            max="100"
          ></progress>
          <p className="text-sm text-gray-500">{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default InitialLoad;
