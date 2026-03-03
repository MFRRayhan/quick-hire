import React from "react";
import heroImg from "../assets/heroImg.png";
import lines from "../assets/Lines.png";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";

export default function HeroArea() {
  return (
    <section className="hero-area bg-[#F8FAFD] pt-12 lg:pt-20 pb-16 lg:pb-0 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-6 lg:space-y-8 relative z-10 lg:pr-10 text-center lg:text-left">
            <h1 className="text-[3.2rem] md:text-[4.5rem] leading-[1.05] font-extrabold text-[#1E293B] tracking-tight">
              Discover <br />
              more than <br />
              <span className="text-[#0EA5E9] relative inline-block mt-2">
                5000+ Jobs
                <img
                  src={lines}
                  alt="underline"
                  className="absolute -bottom-4 lg:-bottom-6 left-0 w-full object-contain pointer-events-none"
                />
              </span>
            </h1>

            <p className="text-[17px] md:text-[18px] text-[#64748B] leading-relaxed max-w-[480px] mx-auto lg:mx-0 mt-8 mb-10">
              Great platform for the job seeker that searching for new career
              heights and passionate about startups.
            </p>

            <form className="bg-white p-3 lg:p-2.5 rounded-2xl lg:rounded-xl shadow-xl lg:shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col lg:flex-row items-center gap-2 lg:gap-3 w-full max-w-[700px] mx-auto lg:mx-0">
              <div className="flex items-center gap-4 w-full px-4 py-3 lg:py-2 border-b lg:border-none border-gray-100 lg:w-[42%]">
                <CiSearch className="text-gray-400 text-[28px] lg:text-[26px]" />
                <input
                  type="text"
                  className="w-full bg-transparent border-none outline-none text-[16px] lg:text-[15.5px] text-[#1E293B] placeholder-gray-400 focus:ring-0 py-2 lg:py-0"
                  placeholder="Job title or keyword"
                />
              </div>

              <div className="hidden lg:block w-px h-10 bg-gray-200"></div>

              <div className="flex items-center justify-between w-full px-4 py-3 lg:py-2 border-b lg:border-none border-gray-100 lg:w-[38%]">
                <div className="flex items-center gap-4 w-full">
                  <IoLocationOutline className="text-gray-400 text-[26px] lg:text-[24px]" />
                  <input
                    type="text"
                    className="w-full bg-transparent border-none outline-none text-[16px] lg:text-[15.5px] text-[#1E293B] placeholder-gray-400 focus:ring-0 py-2 lg:py-0"
                    placeholder="Florence, Italy"
                  />
                </div>
                <FiChevronDown className="text-gray-400 text-xl ml-2 shrink-0" />
              </div>

              <button
                type="submit"
                className="bg-[#4F46E5] hover:bg-[#3730A3] text-white px-8 py-4 lg:py-3.5 rounded-xl lg:rounded-lg font-bold text-[17px] lg:text-[16px] transition shadow-lg shadow-[#4f46e5]/20 w-full lg:w-auto shrink-0"
              >
                Search my job
              </button>
            </form>

            <p className="mt-8 lg:mt-5 text-[15px] lg:text-[14px] text-[#64748B] text-center lg:text-left">
              Popular :{" "}
              <span className="font-semibold text-[#1E293B]">
                UI Designer, UX Researcher, Android, Admin
              </span>
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0 px-4 md:px-0">
            <img
              src={heroImg}
              alt="Hero showing success"
              className="w-full max-w-[650px] object-contain relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
