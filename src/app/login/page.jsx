"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

 const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      const userType = data?.userType;
      if (userType === "candidate") {
        router.push("/dashboard/candidate");
      } else if (userType === "employer") {
        router.push("/dashboard/employer");
      } else {
        setError("Unknown user role");
      }
    } else {
      setError("Invalid credentials");
    }
  } catch (err) {
    setError("Something went wrong. Please try again.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-gray-700  font-bold"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-gray-700  font-bold"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Login
          </button>
        </form>
        {error && (
          <div className="text-left text-red-500 font-bold py-2 rounded">
            {error}
          </div>
        )}
        <div className="mt-5 text-right font-bold">
          <label> Didn't have account ? </label>
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
