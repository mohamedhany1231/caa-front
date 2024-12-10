"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useMe from "../hooks/useMe";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { me } = useMe();

  useEffect(() => {
    if (me?._id) router.replace("/admin");
  }, [me, router]);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      const response = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Something went wrong");
        return;
      }

      const result = await response.json();
      toast.success("Login successful!");

      // Redirect after successful login
      router.push("/admin");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Login failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Login to your account to continue
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-900 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-900 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
