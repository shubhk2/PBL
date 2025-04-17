"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Logo_main from "@/components/logo_main";
import { register } from "@/services/api";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    profession: "",
    preferred_language: "en", // Default language
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("Username, email and password are required");
      return;
    }

    try {
      setLoading(true);
      
      // Send request to backend
      await register(formData);
      
      // Show success message and redirect
      setSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-background text-foreground py-8">
      <div className="w-96 p-6 bg-gray-800 rounded-lg shadow-lg">
        <Logo_main />
        
        {error && (
          <div className="bg-red-500 text-white p-2 rounded mb-4">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-500 text-white p-2 rounded mb-4">
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSignUp}>
          <label className="block text-sm font-semibold mb-1 mt-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
            required
          />

          <label className="block text-sm font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
            required
          />

          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded bg-gray-900 text-white"
            required
          />

          <label className="block text-sm font-semibold mb-1">Contact Number (optional)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
          />

          <label className="block text-sm font-semibold mb-1">Preferred Language (optional)</label>
          <input
            type="text"
            name="preferred_language"
            value={formData.preferred_language}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
            placeholder="en"
          />

          <label className="block text-sm font-semibold mb-1">Profession (optional)</label>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className="w-full p-2 mb-3 border rounded bg-gray-900 text-white"
          />

          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        <div className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
