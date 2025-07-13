"use client";
import React, { useState } from "react";
import api from "../../utils/axios";

const EmployerJobList = ({ jobs }) => {
  const [jobList, setJobList] = useState(jobs);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const openConfirmModal = (jobId) => {
    setSelectedJobId(jobId);
    setShowConfirm(true);
  };

  const closeConfirmModal = () => {
    setSelectedJobId(null);
    setShowConfirm(false);
  };

  const handleDelete = async () => {
    setError("");
    try {
      await api.delete("/employer/jobs?id=" + selectedJobId, { withCredentials: true });
      setJobList(jobList.filter((job) => job._id !== selectedJobId));
      closeConfirmModal();
    } catch (err) {
      setError("Failed to delete job. Please try again.");
      closeConfirmModal();
    }
  };

  if (!jobList || jobList.length === 0) {
    return <p className="text-center mt-4">You have not posted any jobs yet.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {jobList.map((job) => (
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
              Job Location: {job.location}
            </p>
            <p className="text-gray-600 mt-2">Salary: {job.salary}</p>
            <button
              onClick={() => openConfirmModal(job._id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer"
            >
              Delete Job
            </button>
            {error && <p className="text-red-600 mt-2">{error}</p>}
          </div>
        ))}
      </div>

      {showConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full animate-fade-in">
      <h3 className="text-xl font-bold text-gray-800 mb-3">Confirm Deletion</h3>
      <p className="text-gray-600">Are you sure you want to delete this job? This action cannot be undone.</p>

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={closeConfirmModal}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition duration-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition duration-200 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default EmployerJobList;
