"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Logo_left from "@/components/logo_left";
import { useRouter } from "next/navigation";

export default function ScheduledQuizzes() {
  const [sortBy, setSortBy] = useState<"name" | "date" | "deadline">("date");
  const router = useRouter();

  // Updated mock data to match database schema
  const quizzes = [
    { 
      id: "quiz-1",
      course: "Course 1", 
      title: "Quiz 1", 
      description: "Introduction to basic concepts",
      scheduled_date: "2025-02-20", 
      deadline_date: "2025-03-01",
      total_questions: 10,
      duration: 30, // minutes
      status: 0 // 0: not attempted, 1: attempted
    },
    { 
      id: "quiz-2",
      course: "Course 2", 
      title: "Quiz 2", 
      description: "Advanced concepts exploration",
      scheduled_date: "2025-02-18", 
      deadline_date: "2025-02-28",
      total_questions: 15,
      duration: 45, // minutes
      status: 1 // 0: not attempted, 1: attempted
    },
    { 
      id: "quiz-3",
      course: "Course 3", 
      title: "Quiz 3", 
      description: "Final assessment",
      scheduled_date: "2025-02-25", 
      deadline_date: "2025-03-05",
      total_questions: 20,
      duration: 60, // minutes
      status: 0 // 0: not attempted, 1: attempted
    },
  ];

  // Sorting logic
  const sortedQuizzes = [...quizzes].sort((a, b) => {
    if (sortBy === "name") return a.title.localeCompare(b.title);
    if (sortBy === "date") return new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime();
    if (sortBy === "deadline") return new Date(a.deadline_date).getTime() - new Date(b.deadline_date).getTime();
    return 0;
  });

  const handleStartQuiz = (quizId: string) => {
    router.push(`/quiz/${quizId}`);
  };

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
        {sortedQuizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="bg-purple-600 text-white p-4 rounded-xl shadow-lg hover:bg-purple-700 transition-colors"
          >
            <CardContent>
              <h2 className="text-xl font-bold">{quiz.course} - {quiz.title}</h2>
              <p className="mb-2">{quiz.description}</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p><strong>Date:</strong> {quiz.scheduled_date}</p>
                  <p><strong>Deadline:</strong> {quiz.deadline_date}</p>
                </div>
                <div>
                  <p><strong>Questions:</strong> {quiz.total_questions}</p>
                  <p><strong>Duration:</strong> {quiz.duration} minutes</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p><strong>Status:</strong> {quiz.status === 1 ? "✅ Attempted" : "⏳ Pending"}</p>
                <Button 
                  onClick={() => handleStartQuiz(quiz.id)}
                  disabled={quiz.status === 1}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                >
                  {quiz.status === 1 ? "Review Quiz" : "Start Quiz"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
