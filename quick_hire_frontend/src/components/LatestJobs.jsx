import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LatestJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ""}/api/jobs`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.slice(0, 4));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 lg:py-24">
      <div className="container px-4 lg:px-0 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-14 gap-6">
          <h2 className="text-[2.5rem] lg:text-[4rem] font-bold leading-tight">
            Latest <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link
            to="/jobs"
            className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all text-lg"
          >
            Show all jobs <span className="text-sm">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => {
            const logoUrl = job.companyLogo || job.companyLogoUrl;
            const initial = (job.company || job.companyName || "C").charAt(0);
            const title = job.title || job.jobTitle;
            const company = job.company || job.companyName;
            const location = job.location;
            const type = job.employmentType || "Full-Time";
            const tags =
              job.tags ||
              (job.category ? [job.category] : ["Marketing", "Design"]);

            return (
              <Link
                to={`/jobs/${job._id || job.id}`}
                key={job._id || job.id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 lg:gap-6 p-6 lg:p-8 bg-white rounded-xl shadow-sm border border-[#F1F5F9] hover:shadow-md transition cursor-pointer text-center sm:text-left"
              >
                <div className="shrink-0 mb-2 sm:mb-0">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt={company}
                      className="w-14 h-14 lg:w-16 lg:h-16 object-contain"
                    />
                  ) : (
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[#0F172A] text-white flex items-center justify-center text-2xl lg:text-3xl font-black italic rounded-md shadow-sm">
                      {initial}
                    </div>
                  )}
                </div>

                <div className="flex-1 w-full">
                  <h3 className="font-bold text-xl lg:text-2xl text-[#1E293B] mb-1 lg:mb-2 hover:text-blue-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-[#64748B] text-[15px] lg:text-[16px] mb-4">
                    {company}{" "}
                    <span className="mx-1 text-[#CBD5E1] font-bold">•</span>{" "}
                    {location}
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <span className="px-4 py-1 bg-[#ECFDF5] text-[#10B981] font-bold text-[13px] rounded-full">
                      {type}
                    </span>

                    <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      {tags.map((tag, idx) => {
                        let tagLower = tag.toLowerCase();
                        let uiClass = "border border-gray-200 text-gray-500";

                        if (tagLower.includes("marketing")) {
                          uiClass = "border border-[#F59E0B] text-[#F59E0B]";
                        } else if (tagLower.includes("design")) {
                          uiClass = "border border-[#6366F1] text-[#6366F1]";
                        } else if (tagLower.includes("support")) {
                          uiClass = "border border-[#3B82F6] text-[#3B82F6]";
                        } else if (
                          tagLower.includes("growth") ||
                          tagLower.includes("sales")
                        ) {
                          uiClass = "border border-[#F97316] text-[#F97316]";
                        } else if (tagLower.includes("development")) {
                          uiClass = "border border-[#A855F7] text-[#A855F7]";
                        }

                        return (
                          <span
                            key={idx}
                            className={`px-4 py-1 rounded-full text-[13px] font-bold ${uiClass}`}
                          >
                            {tag.charAt(0).toUpperCase() + tag.slice(1)}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
