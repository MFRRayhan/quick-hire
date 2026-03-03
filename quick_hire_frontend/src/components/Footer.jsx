import React from "react";
import footerLogo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaDribbble,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#202430] text-white pt-16 lg:pt-20 pb-10">
      <div className="container px-4 lg:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 lg:mb-20 mb-16">
          <div className="lg:col-span-4 pr-0 lg:pr-10">
            <Link to={"/"} className="flex items-center gap-3 mb-8 w-fit">
              <img
                src={footerLogo}
                alt="QuickHire Logo"
                className="w-[38px] h-[38px] object-contain"
              />
              <div className="font-extrabold text-[24px] tracking-tight logo">
                QuickHire
              </div>
            </Link>
            <p className="text-[#A0A4AB] text-[16px] lg:text-[15px] leading-[1.8] max-w-[320px]">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          <div className="lg:col-span-2">
            <p className="font-bold text-white text-[18px] lg:text-[17px] mb-6 lg:mb-8">
              About
            </p>
            <ul className="space-y-4 lg:space-y-5">
              <li>
                <Link
                  to="/browse-companies"
                  className="text-[#A0A4AB] hover:text-white transition-colors text-[16px] lg:text-[15px]"
                >
                  Companies
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#A0A4AB] hover:text-white transition-colors text-[16px] lg:text-[15px]"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#A0A4AB] hover:text-white transition-colors text-[16px] lg:text-[15px]"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#A0A4AB] hover:text-white transition-colors text-[16px] lg:text-[15px]"
                >
                  Advice
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#A0A4AB] hover:text-white transition-colors text-[16px] lg:text-[15px]"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="font-bold text-white text-[18px] lg:text-[17px] mb-6 lg:mb-8">
              Resources
            </p>
            <ul className="space-y-4 lg:space-y-5">
              <li>
                <a
                  href="#"
                  className="text-[#A0A4AB] hover:text-white transition-colors text-[16px] lg:text-[15px]"
                >
                  Help Docs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#A0A4AB] hover:text-white transition-colors text-[16px] lg:text-[15px]"
                >
                  Guide
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#A0A4AB] hover:text-white transition-colors text-[16px] lg:text-[15px]"
                >
                  Updates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#A0A4AB] hover:text-white transition-colors text-[16px] lg:text-[15px]"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="font-bold text-white text-[18px] lg:text-[17px] mb-6 lg:mb-8">
              Get job notifications
            </p>
            <p className="text-[#A0A4AB] text-[16px] lg:text-[15px] leading-[1.8] mb-8 max-w-[340px]">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <form className="flex flex-col sm:flex-row w-full gap-3">
              <input
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-white text-gray-800 px-5 py-4 lg:py-3 outline-none text-[16px] lg:text-[15px] focus:ring-2 focus:ring-[#4F46E5] placeholder:text-gray-400 font-medium rounded-sm"
              />
              <button
                type="submit"
                className="bg-[#4F46E5] hover:bg-[#4338CA] transition-all text-white px-8 py-4 lg:py-3 font-bold text-[16px] whitespace-nowrap cursor-pointer shadow-lg shadow-[#4f46e5]/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#ffffff1a] pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[#A0A4AB] text-[15px] order-2 md:order-1 text-center md:text-left">
            2021 © QuickHire. All rights reserved.
          </p>

          <div className="flex items-center gap-4 order-1 md:order-2">
            <a
              href="#"
              className="w-11 h-11 rounded-full bg-[#30333E] flex items-center justify-center text-[#A0A4AB] hover:bg-[#4F46E5] hover:text-white transition-all transform hover:-translate-y-1 shadow-md"
            >
              <FaFacebookF className="text-[16px]" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full bg-[#30333E] flex items-center justify-center text-[#A0A4AB] hover:bg-[#4F46E5] hover:text-white transition-all transform hover:-translate-y-1 shadow-md"
            >
              <FaInstagram className="text-[17px]" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full bg-[#30333E] flex items-center justify-center text-[#A0A4AB] hover:bg-[#4F46E5] hover:text-white transition-all transform hover:-translate-y-1 shadow-md"
            >
              <FaDribbble className="text-[17px]" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full bg-[#30333E] flex items-center justify-center text-[#A0A4AB] hover:bg-[#4F46E5] hover:text-white transition-all transform hover:-translate-y-1 shadow-md"
            >
              <FaLinkedinIn className="text-[17px]" />
            </a>
            <a
              href="#"
              className="w-11 h-11 rounded-full bg-[#30333E] flex items-center justify-center text-[#A0A4AB] hover:bg-[#4F46E5] hover:text-white transition-all transform hover:-translate-y-1 shadow-md"
            >
              <FaTwitter className="text-[17px]" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
