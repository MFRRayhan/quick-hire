import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("All Locations");

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
    } catch (fetchError) {
      console.error("Error fetching jobs:", fetchError);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search, category, location]);

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
            jobs.map((job) => {
              const logoUrl = job.companyLogo || job.companyLogoUrl;
              const initial = (job.company || job.companyName || "C").charAt(0);
              const type = job.employmentType || "Full-Time";
              const category = job.category || "";

              let badgeClass = "bg-gray-100 text-gray-700";
              if (category.toLowerCase().includes("development"))
                badgeClass = "bg-[#F3E8FF] text-[#A855F7]";
              if (category.toLowerCase().includes("design"))
                badgeClass = "bg-[#ECFDF5] text-[#10B981]";
              if (category.toLowerCase().includes("marketing"))
                badgeClass = "bg-[#FFF6ED] text-[#F59E0B]";
              if (
                category.toLowerCase().includes("sales") ||
                category.toLowerCase().includes("growth")
              )
                badgeClass = "bg-[#EEF2FF] text-[#6366F1]";

              return (
                <div
                  key={job._id || job.id}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 lg:p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100"
                >
                  <div className="shrink-0">
                    {logoUrl ? (
                      <img
                        src={logoUrl}
                        alt={job.company}
                        className="w-16 h-16 object-contain"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-[#0F172A] text-white rounded-lg flex items-center justify-center font-black italic text-2xl uppercase">
                        {initial}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-2xl text-[#1E293B] mb-2">
                      {job.title}
                    </h3>
                    <p className="text-gray-500 mb-4 font-medium">
                      {job.company} • {job.location}
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-6">
                      <span className="px-4 py-1.5 bg-[#ECFDF5] text-[#10B981] font-bold text-[13px] rounded-full shadow-sm">
                        {type}
                      </span>
                      <div className="hidden sm:block w-px h-6 bg-gray-200"></div>
                      <span
                        className={`px-4 py-1.5 rounded-full text-[13px] font-bold shadow-sm ${badgeClass}`}
                      >
                        {category}
                      </span>
                    </div>
                    <div>
                      <Link
                        to={`/jobs/${job._id}`}
                        className="btn btn-primary btn-md px-8 rounded-lg font-bold shadow-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
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
