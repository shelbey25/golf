import { SignIn } from "@clerk/nextjs";
import { Poppins } from "@next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const poppinsHeavy = Poppins({ weight: "500", subsets: ["latin"] });
const poppinsSemi = Poppins({ weight: "400", subsets: ["latin"] });

const BottomBar = () => {
  const router = useRouter();
  return (
    <div className="w-full bg-stone-500 flex justify-start gap-8 items-start p-2">
      <div className="flex flex-col w-[25%] items-start justify-start gap-1">
        <div className={poppinsSemi.className}>
          <h1 className="text-white text-center pb-1">Legal</h1>
        </div>
        <button
          className="text-white text-xs text-start hover:text-stone-200"
          onClick={() => router.push("/terms")}
        >
          Terms and Conditions
        </button>
        <button
          className="text-white text-xs text-start hover:text-stone-200"
          onClick={() => router.push("/privacy")}
        >
          Privacy Policy
        </button>
        <button
          className="text-white text-xs text-start hover:text-stone-200"
          onClick={() => router.push("/cookie")}
        >
          Cookie Policy
        </button>
        <button
          className="text-white text-xs text-start hover:text-stone-200"
          onClick={() => router.push("/community")}
        >
          Community Guidelines
        </button>
        <button
          className="text-white text-xs text-start hover:text-stone-200"
          onClick={() => router.push("/safety")}
        >
          Safety Tips
        </button>
      </div>
      <div className="flex flex-col w-[25%] items-start justify-start gap-1">
        <div className={poppinsSemi.className}>
          <h1 className="text-white text-center pb-1">Contact</h1>
        </div>
        <button
          className="text-white text-xs text-start hover:text-stone-200"
          onClick={() => router.push("/supportSwoop")}
        >
          Customer Service
        </button>

        <button
          className="text-white text-xs text-start hover:text-stone-200"
          onClick={() =>
            window.open("https://www.instagram.com/project_swoop/")
          }
        >
          Instagram
        </button>
      </div>
      <div className="flex flex-col w-[25%] items-start justify-start gap-1">
        <div className={poppinsSemi.className}>
          <h1 className="text-white text-center pb-1">Download</h1>
        </div>
        {/*<button className="text-white text-xs text-start hover:text-stone-200">
        App Store
      </button>
      <button className="text-white text-xs text-start hover:text-stone-200">
        Google Play
      </button>*/}
      </div>
    </div>
  );
};
export default BottomBar;
