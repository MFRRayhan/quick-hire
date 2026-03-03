import React from "react";
import vodafone from "../assets/vodafone.png";
import intel from "../assets/intel.png";
import tesla from "../assets/tesla.png";
import amda from "../assets/amda.png";
import talkit from "../assets/talkit.png";

export default function Brands() {
  return (
    <section className="brands pt-8 lg:pt-12 pb-12 lg:pb-20">
      <div className="container">
        <div className="space-y-10 lg:space-y-14">
          <p className="text-[16px] lg:text-lg text-[#64748B] text-center lg:text-left font-medium">
            Companies we helped grow
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 lg:gap-x-12 items-center justify-items-center opacity-60 grayscale filter px-4 lg:px-0">
            <img
              src={vodafone}
              alt="Vodafone logo"
              className="h-6 lg:h-8 object-contain"
            />
            <img
              src={intel}
              alt="Intel logo"
              className="h-6 lg:h-8 object-contain"
            />
            <img
              src={talkit}
              alt="Talkit logo"
              className="h-6 lg:h-8 object-contain"
            />
            <img
              src={amda}
              alt="Amda logo"
              className="h-6 lg:h-8 object-contain"
            />
            <div className="col-span-2 lg:col-span-1 flex justify-center">
              <img
                src={tesla}
                alt="Tesla logo"
                className="h-6 lg:h-8 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
