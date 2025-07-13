"use client";
import React, { useEffect, useState } from "react";
import api from "../../utils/axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get("/jobs");
        setJobs(response.data.jobs);
      } catch (err) {
        setError("Failed to load jobs.");
      }
    };

    fetchJobs();
  }, []);

  if (error) {
    return <p className="text-red-600 text-center mt-4">{error}</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-center mt-4">No jobs available.</p>;
  }

  console.log(jobs.company, "jobs company")
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
          <p className="text-gray-600 mt-2">
              Company: {job.company && job.company.name ? job.company.name : "N/A"}
          </p>
          <p className="text-gray-600 mt-2">
            Job Type: {job.jobType}
          </p>
          <p className="text-gray-600 mt-2">
            Location: {job.location}
          </p>
          <p className="text-gray-600 mt-2">Salary: {job.salary}</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
