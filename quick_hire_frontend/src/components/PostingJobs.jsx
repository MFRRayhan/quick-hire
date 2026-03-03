import React from "react";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";

export default function PostingJobs() {
  return (
    <div className="py-12 lg:py-20">
      <div className="container px-4 lg:px-0">
        <div className="px-6 py-12 lg:px-18 lg:py-20 bg-primary text-white rounded-lg lg:rounded-none overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 text-center lg:text-left">
            <div className="max-w-xl space-y-6 lg:space-y-8">
              <h2 className="text-white! text-[2.5rem] lg:text-[3.5rem] font-bold leading-tight">
                Start posting jobs today
              </h2>
              <p className="text-lg lg:text-xl text-white/90">
                Start posting jobs for only $10. Reach thousands of talented
                seekers.
              </p>
              <Link to={"/sign-up"} className="inline-block">
                <button className="bg-white text-primary px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg">
                  Sign up for free
                </button>
              </Link>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <img
                src={dashboard}
                alt="dashboard"
                className="w-full max-w-[500px] lg:max-w-none object-contain shadow-2xl rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
