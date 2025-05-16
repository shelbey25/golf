import { SignIn } from "@clerk/nextjs";
import { Poppins } from "@next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const poppinsHeavy = Poppins({ weight: "500", subsets: ["latin"] });
const poppinsSemi = Poppins({ weight: "400", subsets: ["latin"] });

const TopBar = ({
  mode,
  setSignInPage,
  signInNeed,
}: {
  mode: any;
  setSignInPage: any;
  signInNeed: any;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="h-10 w-full flex flex-row justify-between bg-white items-center">
        <div className={poppinsHeavy.className}>
          <h1 className="p-1 text-[#02182B]">Swoop</h1>
        </div>
        <div className="items-center flex h-full gap-2 p-0.5">
          {signInNeed ? (
            <button
              className="bg-rounded border border-black rounded-lg p-0.5 hover:bg-stone-300"
              onClick={() => setSignInPage(true)}
            >
              Sign In
            </button>
          ) : null}
        </div>
      </div>

      <div className="h-5 w-full bg-stone-500 flex flex-row justify-start gap-12">
        {mode !== "Home" ? (
          <button
            className="items-center justify-center"
            onClick={() => router.push("/")}
          >
            <h1 className="text-semibold text-white text-sm text-center pl-0.5 pr-0.5 hover:text-stone-200">
              Home
            </h1>
          </button>
        ) : null}
        {mode !== "About Swoop" ? (
          <button
            className="items-center justify-center"
            onClick={() => router.push("/aboutUs")}
          >
            <h1 className="text-semibold text-white text-sm text-center pl-0.5 pr-0.5 hover:text-stone-200">
              About Swoop
            </h1>
          </button>
        ) : null}

        {mode !== "FAQ" ? (
          <button
            className="items-center justify-center"
            onClick={() => router.push("/faqSwoop")}
          >
            <h1 className="text-semibold text-white text-sm text-center pl-0.5 pr-0.5 hover:text-stone-200">
              FAQs
            </h1>
          </button>
        ) : null}
        {mode !== "Support" ? (
          <button
            className="items-center justify-center"
            onClick={() => router.push("/supportSwoop")}
          >
            <h1 className="text-semibold text-white text-sm text-center pl-0.5 pr-0.5 hover:text-stone-200">
              Support
            </h1>
          </button>
        ) : null}
        {/* <button className="items-center justify-center">
          <h1
            className="text-semibold text-white text-sm text-center pl-0.5 pr-0.5 hover:text-stone-200"
            onClick={() => {
              window.open("https://tinder.com", "_blank");
            }}
          >
            Download
          </h1>
        </button>*/}
      </div>
    </>
  );
};
export default TopBar;
