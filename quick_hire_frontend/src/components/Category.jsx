import React from "react";
import { FaArrowRight, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Category() {
  const categories = [
    {
      name: "Design",
      jobs: 235,
      icon: (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 42H14L40 16C41.0609 14.9393 41.6569 13.5004 41.6569 12C41.6569 10.4998 41.0609 9.06098 40 8C38.9391 6.93925 37.5003 6.34326 36 6.34326C34.4997 6.34326 33.0609 6.93925 32 8L6 34V42Z" />
          <path d="M29 11L37 19" />
          <path d="M24 16L14 6L6 14L16 24" />
          <path d="M14 16L11 19" />
          <path d="M32 24L42 34L34 42L24 32" />
          <path d="M32 34L29 37" />
        </svg>
      ),
    },
    {
      name: "Sales",
      jobs: 756,
      icon: (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 22C18.4183 22 22 18.4183 22 14C22 9.58172 18.4183 6 14 6C9.58172 6 6 9.58172 6 14C6 18.4183 9.58172 22 14 22Z" />
          <path d="M14 6V14H22" />
          <path d="M18 34V42" />
          <path d="M34 28V42" />
          <path d="M26 26V42" />
          <path d="M42 24V42" />
        </svg>
      ),
    },
    {
      name: "Marketing",
      jobs: 140,
      icon: (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 12V38C22 41 18 42 16 39L11 27M36 26C40 26 42 22 42 20C42 18 40 14 36 14V26ZM11 27C7 25 6 21 6 18C6 14 10 12 14 12H18C26 12 33 10 36 6V34C33 30 26 28 18 28H14C13 28 12 27 11 27Z" />
        </svg>
      ),
    },
    {
      name: "Finance",
      jobs: 325,
      icon: (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M34 18V14C34 12 33 10 30 10H10C7 10 6 12 6 14V26C6 28 7 30 10 30H14" />
          <path d="M18 38H38C41 38 42 36 42 34V22C42 20 41 18 38 18H18C15 18 14 20 14 22V34C14 36 15 38 18 38Z" />
          <path d="M32 28C32 30 30 32 28 32C26 32 24 30 24 28C24 26 26 24 28 24C30 24 32 26 32 28Z" />
        </svg>
      ),
    },
    {
      name: "Technology",
      jobs: 436,
      icon: (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 40H28M6 26H42M10 34H38C41 34 42 32 42 30V10C42 8 41 6 38 6H10C7 6 6 8 6 10V30C6 32 7 34 10 34Z" />
        </svg>
      ),
    },
    {
      name: "Engineering",
      jobs: 542,
      icon: (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 40L28 8M36 16L44 24L36 32M12 32L4 24L12 16" />
        </svg>
      ),
    },
    {
      name: "Business",
      jobs: 211,
      icon: (
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M42 26C36 29 30 30 24 30C18 30 12 29 6 26" />
          <path d="M32 12V8C32 6 30 4 28 4H20C18 4 16 6 16 8V12H32Z" />
          <path d="M10 40H38C41 40 42 38 42 36V16C42 14 41 12 38 12H10C7 12 6 14 6 16V36C6 38 7 40 10 40Z" />
        </svg>
      ),
    },
    {
      name: "Human Resources",
      jobs: 346,
      icon: <FaUsers className="w-full h-full" />,
    },
  ];

  return (
    <section className="py-16 lg:py-24">
      <div className="container px-4 lg:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 lg:mb-16 gap-6">
          <h2 className="text-[2.5rem] lg:text-[4rem] font-bold leading-tight">
            Explore by <span className="text-[#26A4FF]">category</span>
          </h2>

          <Link
            to="/jobs"
            className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all text-lg"
          >
            Show all jobs
            <FaArrowRight className="text-base" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="border border-[#D6DDEB] p-6 lg:p-8 flex items-center lg:flex-col lg:items-start group hover:bg-primary transition-all duration-300 cursor-pointer"
            >
              <div className="w-[48px] h-[48px] lg:w-[60px] lg:h-[60px] text-primary group-hover:text-white shrink-0">
                {cat.icon}
              </div>
              <div className="ml-4 lg:ml-0 lg:mt-6 grow">
                <h3 className="text-xl lg:text-2xl font-bold text-[#1E293B] group-hover:text-white! transition-colors">
                  {cat.name}
                </h3>
                <p className="text-gray-500 group-hover:text-white/80 transition-colors mt-1">
                  {cat.jobs} jobs available
                </p>
              </div>
              <FaArrowRight className="lg:hidden text-gray-400 group-hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
