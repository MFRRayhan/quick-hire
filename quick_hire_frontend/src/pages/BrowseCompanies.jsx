import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlineBriefcase } from "react-icons/hi";

export default function BrowseCompanies() {
  const companies = [
    {
      id: 1,
      name: "Stripe",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg",
      description:
        "Stripe is a technology company that builds economic infrastructure for the internet.",
      location: "San Francisco, CA",
      jobsCount: 45,
      category: "Fintech",
    },
    {
      id: 2,
      name: "Truebill",
      logo: "https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/p5nkvu8vqykwv8vzu1f4",
      description:
        "Truebill is a finance app that helps people manage their money and bills.",
      location: "Silver Spring, MD",
      jobsCount: 12,
      category: "Fintech",
    },
    {
      id: 3,
      name: "Square",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Square_Inc._logo.svg",
      description:
        "Square helps sellers of all sizes start, run, and grow their business.",
      location: "San Francisco, CA",
      jobsCount: 28,
      category: "Fintech",
    },
    {
      id: 4,
      name: "Coinbase",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Coinbase.svg",
      description:
        "Coinbase is a digital currency wallet and platform where merchants and consumers can transact.",
      location: "Remote",
      jobsCount: 34,
      category: "Crypto",
    },
    {
      id: 5,
      name: "Robinhood",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Robinhood_logo.svg",
      description:
        "Robinhood is a pioneer of commission-free stock and crypto trading.",
      location: "Menlo Park, CA",
      jobsCount: 19,
      category: "Fintech",
    },
    {
      id: 6,
      name: "Kraken",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Kraken_Logo.svg",
      description:
        "Kraken is one of the largest and oldest Bitcoin exchanges in the world.",
      location: "Remote",
      jobsCount: 22,
      category: "Crypto",
    },
  ];

  return (
    <div className="bg-[#FBFCFE] min-h-screen py-16 lg:py-24">
      <div className="container px-4 lg:px-0">
        <div className="mb-12 lg:mb-16">
          <h1 className="text-4xl lg:text-[4rem] font-bold text-[#1E293B] mb-6 leading-[1.1]">
            Find the <span className="text-[#26A4FF]">best companies</span> to{" "}
            <br className="hidden lg:block" /> work for
          </h1>
          <p className="text-[#64748B] text-lg lg:text-xl max-w-[650px]">
            Discover companies that match your values and career goals. Explore
            their open positions and company culture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold">
                  {company.category}
                </span>
              </div>

              <div className="grow">
                <h3 className="text-2xl font-bold text-[#1E293B] mb-3 group-hover:text-blue-600 transition-colors">
                  {company.name}
                </h3>
                <p className="text-[#64748B] text-[15.5px] leading-relaxed mb-6">
                  {company.description}
                </p>
              </div>

              <div className="flex items-center gap-6 mt-auto pt-6 border-t border-gray-50">
                <div className="flex items-center gap-2 text-[#64748B]">
                  <HiOutlineLocationMarker className="text-lg" />
                  <span className="text-sm font-medium">
                    {company.location}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#64748B]">
                  <HiOutlineBriefcase className="text-lg" />
                  <span className="text-sm font-medium">
                    {company.jobsCount} Jobs
                  </span>
                </div>
              </div>

              <Link to={`/jobs?search=${company.name}`} className="mt-8 block">
                <button className="w-full py-4 bg-gray-50 hover:bg-blue-600 text-[#1E293B] hover:text-white font-bold rounded-xl transition-all duration-300 border border-gray-100 hover:border-blue-600">
                  Explore Open Positions
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
