"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo_main from "@/components/logo_main";
import { login } from "@/services/api";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      const response = await login({ username: email, password });
      
      // Store token in localStorage
      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      // Redirect to home page
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-background text-foreground">
      <div className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg">
        <Logo_main />
        
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label className="block text-sm font-semibold mb-1 mt-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-gray-900 text-white"
            required
          />

          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded bg-gray-900 text-white"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-2 disabled:bg-blue-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
