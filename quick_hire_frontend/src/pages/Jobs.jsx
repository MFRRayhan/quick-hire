import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");

  useEffect(() => {
    fetchJobs();
  }, [search, category, location]);

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category !== "All Categories") params.append("category", category);
      if (location !== "All Locations") params.append("location", location);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL || ""}/api/jobs?${params.toString()}`,
      );
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  return (
    <div className="bg-[#FBFCFE] min-h-screen py-12 lg:py-24">
      <div className="container mx-auto px-4 lg:px-0">
        <h1 className="text-[2.5rem] lg:text-[4.5rem] font-bold mb-10 lg:mb-16 text-center lg:text-left leading-tight">
          Browse <span className="text-blue-600">Jobs</span>
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by job title..."
            className="input input-bordered w-full md:flex-1"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="select select-bordered w-full md:w-1/4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>All Categories</option>
            <option>Development</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>Sales</option>
          </select>
          <select
            className="select select-bordered w-full md:w-1/4"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option>All Locations</option>
            <option>Remote</option>
            <option>New York</option>
            <option>London</option>
            <option>San Francisco</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id || job.id}
                className="flex items-start gap-4 p-6 bg-white rounded-lg shadow hover:shadow-lg transition border border-gray-100"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center font-bold text-xl uppercase">
                  {job.company?.[0] || "C"}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-xl mb-1">{job.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {job.company} • {job.location}
                  </p>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full inline-block mb-4">
                    {job.category}
                  </span>
                  <div>
                    <Link
                      to={`/jobs/${job._id}`}
                      className="btn btn-sm btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-1 md:col-span-2 text-gray-500 py-10">
              No jobs found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
