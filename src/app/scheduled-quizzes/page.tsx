"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo_left from "@/components/logo_left";

export default function ScheduledQuizzes() {
  const [sortBy, setSortBy] = useState<"name" | "date" | "deadline">("date");

  const quizzes = [
    { course: "Course 1", quiz: "Quiz 1", date: "2025-02-20", deadline: "2025-03-01", attempted: false },
    { course: "Course 2", quiz: "Quiz 2", date: "2025-02-18", deadline: "2025-02-28", attempted: true },
    { course: "Course 3", quiz: "Quiz 3", date: "2025-02-25", deadline: "2025-03-05", attempted: false },
  ];

  // Sorting logic
  const sortedQuizzes = [...quizzes].sort((a, b) => {
    if (sortBy === "name") return a.quiz.localeCompare(b.quiz);
    if (sortBy === "date") return new Date(a.date).getTime() - new Date(b.date).getTime();
    if (sortBy === "deadline") return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    return 0;
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <Logo_left/>
      <h1 className="text-4xl font-bold mb-6 text-center">Scheduled Quizzes</h1>

      <div className="flex justify-center gap-4 mb-6">
        <Button onClick={() => setSortBy("name")}>Sort by Name</Button>
        <Button onClick={() => setSortBy("date")}>Sort by Date</Button>
        <Button onClick={() => setSortBy("deadline")}>Sort by Deadline</Button>
      </div>

      <div className="w-[60%] mx-auto grid grid-cols-1 gap-6">
        {sortedQuizzes.map((quiz, index) => (
          <Card
  key={index}
  className="bg-purple-600 text-white p-4 rounded-xl shadow-lg hover:bg-purple-700 cursor-pointer transition-colors"
  onClick={() => console.log(`${quiz.course} - ${quiz.quiz} clicked`)}
>
  <CardContent>
    <h2 className="text-xl font-bold">{quiz.course} - {quiz.quiz}</h2>
    <p>Date: {quiz.date}</p>
    <p>Deadline: {quiz.deadline}</p>
    <p>Status: {quiz.attempted ? "✅ Attempted" : "⏳ Pending"}</p>
  </CardContent>
</Card>
        ))}
      </div>
    </div>
  );
}
