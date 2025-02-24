"use client"
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function StudyBuddy() {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Prevents hydration mismatch

  const handleSearch = () => {
    setIsDialogOpen(true);
  };

  return (
    <div className={`min-h-screen flex ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
      {/* Left Sidebar */}
      <aside className="w-64 h-screen bg-gray-800 text-white p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Study Buddy</h1>
        <Button className="bg-blue-500 w-full">Create New Course</Button>
        <Button className="bg-green-500 w-full">Profile</Button>
        <Button className="bg-purple-500 w-full">Scheduled Quizzes</Button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Theme Toggle */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>

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
            <Button className="bg-teal-500 text-white hover:bg-teal-700" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>

        {/* Course Dashboard */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="bg-gray-800 text-white p-4 rounded-xl shadow-lg">
            <CardContent>
              <h2 className="text-xl font-bold">Ongoing Courses</h2>
              <p>No active courses</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 text-white p-4 rounded-xl shadow-lg">
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
