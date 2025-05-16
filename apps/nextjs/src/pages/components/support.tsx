import { Poppins } from "@next/font/google";
import Image from "next/image";
import { useState } from "react";

//340 by 690 px design

const poppinsHeavy = Poppins({ weight: "500", subsets: ["latin"] });
const poppinsSemi = Poppins({ weight: "400", subsets: ["latin"] });

const Support = () => {
  return (
    <>
      <div className="min-h-[90%] w-full flex flex-col p-1 pt-4">
        <div className="flex flex-col w-full justify-start items-center p-1 pb-6 ">
          <div className={poppinsSemi.className}>
            <h1 className="text-white text-4xl text-center">Support</h1>
          </div>
        </div>

        <div className="flex flex-col w-full p-2 gap-4">
          <div className="flex flex-col w-full items-center ">
            <h1 className="text-white text-lg ">Report a Bug</h1>
            <h1 className="text-white text-sm ">
              techsupport@projectswoop.com
            </h1>
          </div>
          <div className="h-0 w-full border border-white"></div>
          <div className="flex flex-col w-full   items-center ">
            <h1 className="text-white text-lg">Technical Support</h1>
            <h1 className="text-white text-sm ">
              techsupport@projectswoop.com
            </h1>
          </div>
          <div className="h-0 w-full border border-white"></div>
          <div className="flex flex-col w-full items-center  ">
            <h1 className="text-white text-lg">Report an Issue</h1>
            <h1 className="text-white text-sm ">
              customersupport@projectswoop.com
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
export default Support;
