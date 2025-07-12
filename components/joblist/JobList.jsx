import React from "react";

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechNova Inc.",
    location: "Remote",
    experience: "2+ years",
    salary: "₹8–12 LPA",
  },
  {
    title: "Backend Engineer",
    company: "CodeCraft",
    location: "Noida",
    experience: "3–5 years",
    salary: "₹10–15 LPA",
  },
  {
    title: "UI/UX Designer",
    company: "PixelWorks",
    location: "Bengaluru",
    experience: "1–3 years",
    salary: "₹6–10 LPA",
  },
  {
    title: "Frontend Developer",
    company: "TechNova Inc.",
    location: "Remote",
    experience: "2+ years",
    salary: "₹8–12 LPA",
  },
  {
    title: "Backend Engineer",
    company: "CodeCraft",
    location: "Noida",
    experience: "3–5 years",
    salary: "₹10–15 LPA",
  },
  {
    title: "UI/UX Designer",
    company: "PixelWorks",
    location: "Bengaluru",
    experience: "1–3 years",
    salary: "₹6–10 LPA",
  },
];

const JobList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {jobs.map((job, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
          <p className="text-gray-600 mt-2">
            {job.company} · {job.location}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Experience: {job.experience}
          </p>
          <p className="text-sm text-gray-500">Salary: {job.salary}</p>
          <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
            Apply Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default JobList;
