"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo_profile from "@/components/logo_profile";
import { useAuth } from "@/contexts/AuthContext";
import { getProfile, ProfileResponse } from "@/services/api";

export default function ProfilePage() {
  const { token, isAuthenticated } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        const data = await getProfile(token!);
        setProfileData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [token, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-xl">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-xl text-red-500">Error: {error}</p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 rounded"
          onClick={() => router.push('/dashboard')}
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Topbar */}
      <div className="flex items-center justify-between bg-gray-800 p-4 shadow-md">
        <div className="flex items-center">
          <Logo_profile />
        </div>
        <input
          type="text"
          placeholder="Search courses..."
          className="p-2 rounded bg-gray-700 text-white w-96"
        />
      </div>

      {/* Main content */}
      {profileData && (
        <div className="flex p-6">
          {/* Left Profile Box */}
          <div className="w-1/4 p-16 bg-gray-800 rounded-lg shadow-md text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-600 rounded-full flex items-center justify-center text-3xl font-bold">
              {profileData.username.charAt(0).toUpperCase()}
            </div>
            <p className="text-sm text-gray-300">{profileData.username}</p>
            <p className="text-lg font-semibold">{profileData.fullName}</p>
          </div>

          {/* Stats + Info */}
          <div className="w-3/4 pl-6">
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
                <p className="text-2xl font-bold">{profileData.coursesGenerated}</p>
                <p className="text-sm text-gray-300">Courses Generated</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
                <p className="text-2xl font-bold">{profileData.coursesCompleted}</p>
                <p className="text-sm text-gray-300">Courses Completed</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
                <p className="text-2xl font-bold">{profileData.quizzesAttempted}</p>
                <p className="text-sm text-gray-300">Quizzes Attempted</p>
              </div>
            </div>

            {/* User Info */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">User Information</h2>
              <p><strong>Full Name:</strong> {profileData.fullName}</p>
              <p><strong>Email:</strong> {profileData.email}</p>
              <p><strong>Contact Number:</strong> {profileData.contact}</p>
              <p><strong>Preferred Language:</strong> {profileData.language}</p>
              <p><strong>Profession:</strong> {profileData.profession}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
