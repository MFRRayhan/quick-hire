import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="mb-16 lg:mb-24">
      <div className="container px-4 lg:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-12 gap-6">
          <h2 className="text-[2.5rem] lg:text-[4rem] font-bold leading-tight">
            Featured <span className="text-[#26A4FF]">jobs</span>
          </h2>

          <Link
            to="/jobs"
            className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all text-lg"
          >
            Show all jobs
            <FaArrowRight className="text-base" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {jobs.map((job) => {
            const logoUrl = job.companyLogo;
            const initial = (job.company || job.companyName || "C").charAt(0);
            const title = job.title || job.jobTitle;
            const company = job.company || job.companyName;
            const location = job.location;
            const description = job.description;
            const type = job.employmentType || "Full Time";
            const tags =
              job.tags ||
              (job.category ? [job.category] : ["Marketing", "Design"]);

            return (
              <Link
                to={`/jobs/${job._id || job.id}`}
                key={job._id || job.id}
                className="border border-[#E2E8F0] bg-white p-7 hover:shadow-lg transition flex flex-col h-full rounded-sm cursor-pointer"
              >
                <div className="flex items-start justify-between mb-6">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={company}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-[#0F172A] text-white flex items-center justify-center text-3xl font-black italic rounded-md shadow-sm">
                      {initial}
                    </div>
                  )}
                  <span className="border border-[#6366F1] text-[#6366F1] px-3 py-1 font-medium text-sm">
                    {type}
                  </span>
                </div>

                <div className="flex-grow">
                  <h3 className="font-bold text-xl text-[#1E293B] mb-2 hover:text-blue-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-[#64748B] text-[15px] mb-5">
                    {company}{" "}
                    <span className="mx-1 text-[#CBD5E1] font-bold">•</span>{" "}
                    {location}
                  </p>

                  <p className="text-[#64748B] text-[15px] leading-relaxed line-clamp-2 mb-6">
                    {description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {tags.map((tag, idx) => {
                    let tagLower = tag.toLowerCase();
                    let bgClass = "bg-gray-100";
                    let textClass = "text-gray-600";

                    if (tagLower.includes("marketing")) {
                      bgClass = "bg-[#FFF6ED]";
                      textClass = "text-[#F59E0B]";
                    } else if (tagLower.includes("design")) {
                      bgClass = "bg-[#ECFDF5]";
                      textClass = "text-[#10B981]";
                    } else if (tagLower.includes("support")) {
                      bgClass = "bg-[#EFF6FF]";
                      textClass = "text-[#3B82F6]";
                    } else if (
                      tagLower.includes("growth") ||
                      tagLower.includes("sales")
                    ) {
                      bgClass = "bg-[#EEF2FF]";
                      textClass = "text-[#6366F1]";
                    } else if (tagLower.includes("development")) {
                      bgClass = "bg-[#F3E8FF]";
                      textClass = "text-[#A855F7]";
                    }

                    return (
                      <span
                        key={idx}
                        className={`px-4 py-1.5 rounded-full text-[13px] font-semibold ${bgClass} ${textClass}`}
                      >
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </span>
                    );
                  })}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
