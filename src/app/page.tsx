"use client";
import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudyBuddy() {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch
  console.log(router); // Should print an object, NOT undefined

  return (

    <div className="min-h-screen flex transition-all bg-background text-foreground">
      {/* Sidebar */}
      {isSidebarOpen && (
          <aside className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col gap-6 relative">
            <h1 className="text-2xl font-bold">Study Buddy</h1>

            <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg"
                onClick={() => router.push("/create-course")}  // ✅ Navigates to /create-course
            >
              Create New Course
            </Button>

            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg" onClick={() => router.push("/scheduled-quizzes")}>
            Scheduled Quizzes
          </Button>

            <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg"
                onClick={() => router.push("/calendar")}
            >
              Calendar
            </Button>

            <div className="mt-auto">
              <Button
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 rounded-lg"
                  onClick={() => router.push("/profile")}
              >
                Profile
              </Button>
            </div>

          </aside>
      )}
      {/* Main Content */}
      <div className="flex-1 p-8 transition-all">
        {/* Top Buttons (Sidebar Toggle & Theme Toggle) */}
        <div className="flex justify-between items-center mb-6">
          {!isSidebarOpen && (
              <button
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
                  onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={24}/>
              </button>
          )}

          {/* Theme Toggle */}
          <button
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Search Bar */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">Study Buddy</h1>
          <div className="flex gap-2 justify-center mt-4">
            <Input
              type="text"
              placeholder="Search for a course..."
              className="p-3 rounded-lg w-96 text-black"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button className="bg-teal-500 text-white hover:bg-teal-700">
              Search
            </Button>
          </div>
        </div>

        {/* Course Dashboard */}
        <div className="w-[60%] mx-auto grid grid-cols-1 gap-6">
          <Card
  className="bg-gray-800 text-white p-4 rounded-xl shadow-lg hover:bg-gray-700 cursor-pointer transition-colors"
  onClick={() => console.log("Ongoing Courses clicked")}
>
  <CardContent>
    <h2 className="text-xl font-bold">Ongoing Courses</h2>
    <p>No active courses</p>
  </CardContent>
</Card>

<Card
  className="bg-gray-800 text-white p-4 rounded-xl shadow-lg hover:bg-gray-700 cursor-pointer transition-colors"
  onClick={() => console.log("Recent Courses clicked")}
>
  <CardContent>
    <h2 className="text-xl font-bold">Recent Courses</h2>
    <p>Explore your recent searches</p>
  </CardContent>
</Card>
        </div>
      </div>
    </div>
  );
}
