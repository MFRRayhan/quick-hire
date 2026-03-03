import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [coverNote, setCoverNote] = useState("");

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`);
      if (res.ok) {
        const data = await res.json();
        setJob(data);
      } else {
        Swal.fire("Error", "Job not found", "error");
        navigate("/jobs");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to load job details", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: id,
          name,
          email,
          resume_link: resumeLink,
          cover_note: coverNote,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success", "Application submitted successfully!", "success");
        setName("");
        setEmail("");
        setResumeLink("");
        setCoverNote("");
      } else {
        Swal.fire(
          "Error",
          data.message || "Failed to submit application",
          "error",
        );
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );
  }

  if (!job) return null;

  const logoUrl = job.companyLogo || job.companyLogoUrl;
  const initial = (job.company || job.companyName || "C").charAt(0);
  const type = job.employmentType || "Full-Time";
  const tags =
    job.tags || (job.category ? [job.category] : ["Marketing", "Design"]);

  return (
    <div className="bg-[#FBFCFE] min-h-screen py-10 lg:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 bg-white p-6 lg:p-10 rounded-2xl shadow-sm border border-gray-100 mb-8 lg:mb-0">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 lg:gap-8 mb-10 text-center sm:text-left">
              <div className="shrink-0 ring-4 ring-gray-50 rounded-xl overflow-hidden p-2 bg-white">
                {logoUrl ? (
                  <img
                    src={logoUrl}
                    alt={job.company}
                    className="w-20 h-20 lg:w-24 lg:h-24 object-contain"
                  />
                ) : (
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-[#0F172A] text-white flex items-center justify-center text-4xl lg:text-5xl font-black italic rounded-md shadow-sm">
                    {initial}
                  </div>
                )}
              </div>
              <div className="grow">
                <h1 className="text-[2rem] lg:text-[2.8rem] font-extrabold text-[#1E293B] leading-tight mb-2">
                  {job.title}
                </h1>
                <p className="text-[#64748B] text-lg lg:text-xl font-medium">
                  {job.company}{" "}
                  <span className="mx-2 text-[#CBD5E1] font-bold">•</span>{" "}
                  {job.location}
                </p>
              </div>
            </div>

            <div className="mb-10 flex flex-wrap items-center justify-center sm:justify-start gap-4">
              <span className="px-5 py-2 bg-[#ECFDF5] text-[#10B981] font-bold text-[14px] rounded-full shadow-sm">
                {type}
              </span>

              <div className="hidden sm:block w-px h-8 bg-gray-200"></div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
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
                      className={`px-5 py-2 rounded-full text-[14px] font-bold shadow-sm ${bgClass} ${textClass}`}
                    >
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </span>
                  );
                })}
              </div>
              <div className="ml-auto text-gray-400 text-sm">
                Posted on {new Date(job.created_at).toLocaleDateString()}
              </div>
            </div>

            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Job Description
            </h2>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {job.description}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md h-fit border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">Apply Now</h2>
            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Resume Link (URL) *
                </label>
                <input
                  type="url"
                  required
                  className="input input-bordered w-full"
                  placeholder="https://..."
                  value={resumeLink}
                  onChange={(e) => setResumeLink(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Cover Note
                </label>
                <textarea
                  className="textarea textarea-bordered w-full h-32"
                  placeholder="Why are you a good fit?"
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
