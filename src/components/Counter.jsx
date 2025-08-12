// // src/components/Counter.jsx
// import { useState, useEffect } from "react";

// export default function Counter() {
//   // Load initial count from localStorage or default 0
//   const [count, setCount] = useState(() => {
//     const saved = localStorage.getItem("count");
//     return saved !== null ? Number(saved) : 0;
//   });

//   // Step value, default 1
//   const [step, setStep] = useState(1);

//   // Limits
//   const min = 0;
//   const max = 100;

//   // Save count to localStorage when it changes
//   useEffect(() => {
//     localStorage.setItem("count", count);
//   }, [count]);

//   // Increment function with limit
//   const increment = () => {
//     setCount((prev) => Math.min(prev + step, max));
//   };

//   // Decrement function with limit
//   const decrement = () => {
//     setCount((prev) => Math.max(prev - step, min));
//   };

//   // Reset to zero
//   const reset = () => setCount(0);

//   // Handle step input change, allow only positive integers
//   const handleStepChange = (e) => {
//     const val = parseInt(e.target.value, 10);
//     if (!isNaN(val) && val > 0) setStep(val);
//   };

//   // Determine color class based on count
//   const colorClass =
//     count > 0 ? "text-green-600" : count < 0 ? "text-red-600" : "text-gray-600";

//   return (
//     <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
//       <h1 className="text-4xl font-bold mb-8 text-gray-800 select-none">
//         React Counter App
//       </h1>

//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm flex flex-col items-center">
//         <div
//           className={`text-6xl font-extrabold mb-6 transition-colors duration-500 select-none ${colorClass}`}
//           aria-live="polite"
//           aria-atomic="true"
//         >
//           {count}
//         </div>

//         <div className="flex gap-3 mb-6 w-full">
//           <button
//             onClick={decrement}
//             className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
//             disabled={count <= min}
//             aria-label={`Decrement by ${step}`}
//           >
//             - Decrement
//           </button>
//           <button
//             onClick={reset}
//             className="flex-1 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition-colors"
//             aria-label="Reset counter"
//           >
//             Reset
//           </button>
//           <button
//             onClick={increment}
//             className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
//             disabled={count >= max}
//             aria-label={`Increment by ${step}`}
//           >
//             + Increment
//           </button>
//         </div>

//         <label
//           htmlFor="step"
//           className="self-start mb-2 font-semibold text-gray-700"
//         >
//           Step value (1 - 20):
//         </label>
//         <input
//           id="step"
//           type="number"
//           min="1"
//           max="20"
//           value={step}
//           onChange={handleStepChange}
//           className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//           aria-describedby="stepHelp"
//         />
//         <p id="stepHelp" className="text-xs mt-1 text-gray-500">
//           Choose how much to increment or decrement each time.
//         </p>

//         <p className="mt-6 text-sm text-gray-600 select-none">
//           Limits: {min} ≤ count ≤ {max}
//         </p>
//       </div>
//     </main>
//   );
// }


import { useState, useEffect, useRef } from "react";

export default function Counter() {
  const min = 0;
  const max = 100;

  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("count");
    return saved !== null ? Number(saved) : 0;
  });

  const [step, setStep] = useState(1);
  const [autoIncrement, setAutoIncrement] = useState(false);
  const intervalRef = useRef(null);

  // Save count to localStorage
  useEffect(() => {
    localStorage.setItem("count", count);
  }, [count]);

  // Auto-increment effect
  useEffect(() => {
    if (autoIncrement) {
      intervalRef.current = setInterval(() => {
        setCount((prev) => Math.min(prev + step, max));
      }, 500);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => clearInterval(intervalRef.current);
  }, [autoIncrement, step, max]);

  // Handlers
  const increment = () => setCount((prev) => Math.min(prev + step, max));
  const decrement = () => setCount((prev) => Math.max(prev - step, min));
  const reset = () => setCount(0);

  const handleStepChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val > 0) setStep(val);
  };

  // Colors
  const colorClass =
    count > 0 ? "text-green-600" : count < 0 ? "text-red-600" : "text-gray-600";

  return ( 
    <main className=" h-full flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 select-none">
        React Counter App
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm flex flex-col items-center">
        <div
          className={`text-6xl font-extrabold mb-6 transition-colors duration-500 select-none ${colorClass}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {count}
        </div>

        {/* Show previous and next values */}
        <div className="flex justify-between w-full mb-6 text-gray-500 select-none font-mono">
          <span>Prev: {Math.max(count - step, min)}</span>
          <span>Next: {Math.min(count + step, max)}</span>
        </div>

        <div className="flex gap-3 mb-6 w-full">
          <button
            onClick={decrement}
            className="flex-1 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            disabled={count <= min}
            aria-label={`Decrement by ${step}`}
          >
            - Decrement
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-gray-400 text-white py-3 rounded-lg hover:bg-gray-500 transition-colors"
            aria-label="Reset counter"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
            disabled={count >= max}
            aria-label={`Increment by ${step}`}
          >
            + Increment
          </button>
        </div>

        {/* Step input */}
        <label
          htmlFor="step"
          className="self-start mb-2 font-semibold text-gray-700"
        >
          Step value (1 - 20):
        </label>
        <input
          id="step"
          type="number"
          min="1"
          max="20"
          value={step}
          onChange={handleStepChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-describedby="stepHelp"
        />
        <p id="stepHelp" className="text-xs mt-1 text-gray-500">
          Choose how much to increment or decrement each time.
        </p>

        {/* Auto increment control */}
        <div className="mt-6 flex gap-3 w-full">
          {!autoIncrement ? (
            <button
              onClick={() => setAutoIncrement(true)}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Auto-Increment
            </button>
          ) : (
            <button
              onClick={() => setAutoIncrement(false)}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Stop Auto-Increment
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

