// "use client"
// import React, { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// const Login: React.FC = () => {
//   const { login } = useAuth();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     await login(username.trim(), password.trim());
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-white">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Futu - BAR GRAIN</h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label htmlFor="username" className="block text-sm font-medium text-gray-600">
//               Përdoruesi
//             </label>
//             <input
//               id="username"
//               type="text"
//               className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Shkruani përdoruesin"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-600">
//               Fjalëkalimi
//             </label>
//             <div className="relative">
//               <input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
//                 placeholder="Shkruani fjalëkalimin"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-3 text-sm text-blue-600 focus:outline-none"
//               >
//                 {showPassword ? "Fshih" : "Shfaq"}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ${
//               loading ? "opacity-60 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Duke u kyçur..." : "Kyçu"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;


"use client";

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(username.trim(), password.trim());
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-white">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Futu - BAR GRAIN
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Përdoruesi
            </label>
            <input
              id="username"
              type="text"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Shkruani përdoruesin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Fjalëkalimi
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                placeholder="Shkruani fjalëkalimin"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-3 text-sm text-blue-600 focus:outline-none"
              >
                {showPassword ? "Fshih" : "Shfaq"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Duke u kyçur..." : "Kyçu"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
