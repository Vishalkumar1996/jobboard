"use client";
import React from "react";
import { useRouter } from "next/navigation";

const EmployerHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        router.push("/login");
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      alert("Logout failed. Please try again.");
    }
  };

  const handleCreatePost = () => {
    router.push("/dashboard/employer/create");
  };

  const handleHomePage = () => {
    router.push("/");
  };

  return (
    <header className="bg-blue-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Employer Dashboard</h1>
      <div className="flex space-x-4">
      <button
          onClick={handleHomePage}
          className="text-white px-4 py-2 rounded cursor-pointer"
        >
          Home
        </button>
        <button
          onClick={handleCreatePost}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded cursor-pointer"
        >
          Create New Post
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default EmployerHeader;
