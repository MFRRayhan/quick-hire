import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Admin() {
  const [jobs, setJobs] = useState([]);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Development");
  const [employmentType, setEmploymentType] = useState("Full-Time");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      if (res.ok) {
        const data = await res.json();
        setJobs(data);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          company,
          companyLogo: logoUrl,
          location,
          category,
          employmentType,
          description,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Success", "Job created successfully", "success");
        fetchJobs();
        setTitle("");
        setCompany("");
        setLogoUrl("");
        setLocation("");
        setEmploymentType("Full-Time");
        setDescription("");
      } else {
        Swal.fire("Error", data.message || "Failed to create job", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const handleDeleteJob = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/jobs/${id}`, { method: "DELETE" });
        if (res.ok) {
          Swal.fire("Deleted!", "Job has been deleted.", "success");
          fetchJobs();
        } else {
          Swal.fire("Error", "Failed to delete job", "error");
        }
      } catch (error) {
        Swal.fire("Error", "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md border border-gray-100 h-fit">
            <h2 className="text-xl font-bold mb-6">Post a New Job</h2>
            <form onSubmit={handleCreateJob} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  className="input input-bordered w-full"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Company Logo URL
                </label>
                <input
                  type="url"
                  className="input input-bordered w-full"
                  placeholder="https://example.com/logo.png"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  required
                  className="input input-bordered w-full"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category *
                </label>
                <select
                  className="select select-bordered w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Development</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Employment Type *
                </label>
                <select
                  className="select select-bordered w-full"
                  value={employmentType}
                  onChange={(e) => setEmploymentType(e.target.value)}
                >
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Remote</option>
                  <option>Internship</option>
                  <option>Contract</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description *
                </label>
                <textarea
                  required
                  className="textarea textarea-bordered w-full h-32"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Publish Job
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Manage Posted Jobs</h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Date Posted</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.length > 0 ? (
                    jobs.map((job) => (
                      <tr key={job._id}>
                        <td className="font-semibold">{job.title}</td>
                        <td>{job.company}</td>
                        <td>{job.location}</td>
                        <td>{new Date(job.created_at).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteJob(job._id)}
                            className="btn btn-sm btn-error text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-500"
                      >
                        No jobs posted yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
