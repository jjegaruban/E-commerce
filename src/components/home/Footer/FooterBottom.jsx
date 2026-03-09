import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";

const FooterBottom = () => {
  return (
    <div className="w-full bg-[#F5F5F3] group">
      <div className="max-w-container mx-auto border-t-[1px] pt-10 pb-20">
        <p className="text-titleFont font-normal text-center flex md:items-center justify-center text-lightText duration-200 text-sm">
          
          <span className="text-md mr-[3px] mt-[2px] md:mt-0 hidden md:inline-flex">
            <AiOutlineCopyright />
          </span>

          {new Date().getFullYear()} Orebi Shopping | All Rights Reserved |

          <span className="ml-1 font-medium group-hover:text-primeColor">
            Built by Jegaruban
          </span>

        </p>
      </div>
    </div>
  );
};

export default FooterBottom;