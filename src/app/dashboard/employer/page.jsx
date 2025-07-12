"use client";
import { useEffect, useState } from "react";
// import api from "@/utils/axios";
import { useRouter } from "next/navigation";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // const fetchJobs = async () => {
  //   try {
  //     const res = await api.get("/employer/jobs");
  //     setJobs(res.data);
  //     setLoading(false);
  //   } catch (err) {
  //     console.error("Error fetching jobs", err);
  //     setLoading(false);
  //   }
  // };

  // const deleteJob = async (jobId) => {
  //   if (!confirm("Are you sure you want to delete this job?")) return;

  //   try {
  //     await api.delete(`/employer/jobs/${jobId}`);
  //     setJobs(jobs.filter((job) => job._id !== jobId));
  //   } catch (err) {
  //     console.error("Failed to delete job", err);
  //   }
  // };

  // const editJob = (jobId) => {
  //   router.push(`/dashboard/employer/edit/${jobId}`);
  // };

  // useEffect(() => {
  //   fetchJobs();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">Employer Dashboard</h1>

      {loading ? (
        <p>Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-gray-600">You haven’t posted any jobs yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {job.title}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Type:</strong> {job.jobType}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => editJob(job._id)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteJob(job._id)}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerDashboard;
