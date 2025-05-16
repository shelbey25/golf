import { SignIn } from "@clerk/nextjs";
import { Poppins } from "@next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import AboutSwoop from "./components/aboutSwoop";
import FAQ from "./components/faq";
import Support from "./components/support";
import BottomBar from "./components/bottomBar";
import TopBar from "./components/topBar";

//Techincal glitch with menu bar @shelbey25
//340 by 690 px design

const poppinsHeavy = Poppins({ weight: "500", subsets: ["latin"] });
const poppinsSemi = Poppins({ weight: "400", subsets: ["latin"] });

const Safety = () => {
  const router = useRouter();
  const termsToDisplay = [
    {
      headline: "Overview",
      text: "Using Swoop can be exhilarating but it is important to stay safe and remember to be cautious. It is important to remember that online everyone isn’t always who they say they are, especially if you don’t know them—so use your best judgment. Always put your safety first when interacting with other users on and off the app no matter what. This document provides additional tips to help you stay safe while using Swoop.",
    },
    {
      headline: "Online Safety",
      text: "\u2022Only use your school email when logging into Swoop. This is the first line of defense as it means only users with your school email domain can interact with you, which encourages only HS students to use the app. \n\u2022If another user attempts to contact you do not:\n\u2022 Share financial information\n\u2022 Send money\n\u2022 Share passwords\n\u2022 Open suspect emails or links\n\u2022 Interact if you do not know the user\n\u2022Don’t share money or financial information\n\u2022Never share personal information\n\u2022Only interact with users you know\n\u2022If someone is avoiding your questions be wary of potential fraud\n\u2022If someone’s profile picture appears to be over 18 please do not engage and report them immediately\n\u2022Report any suspicious activity or offensive behavior to Project Swoop LTD \n\u2022If someone's display name doesn’t match their email address be wary and please report them immediately\n\u2022Make sure your Google password is strong and secure to protect your Swoop account \n\u2022Use your best judgment",
    },
    {
      headline: "Meeting in Person",
      text: "\u2022Because Swoop is intended to allow you to interact with students you know, it is encouraged to establish communication at school in a safe environment to keep potential predators from posing as other students and meeting you\n\u2022Stick to public places to stay safe \n\u2022Tell someone close to you, like family, where you are going, so that they have an idea of where you were if something happens\n\u2022If you feel uncomfortable or notice any red flags leave\n\u2022Make sure the person is who they say they are on the app\n\u2022Make sure all interactions with the other user are legal, specifically abiding by the age of consent\n\u2022Don’t do anything that you are unsure about\n\u2022If you do plan to have a sexual relationship with the opposite party make sure consent is mutual and you follow laws regarding this type of relationship",
    },
    {
      headline: "Reporting and Closing Remarks",
      text: "Please, report any incidents, anything you feel unsure about, or otherwise question through the app or to customersupport@projectswoop.com to help Swoop maintain a safe environment. \n\nThese are just tips. No method of risk reduction is perfect, so it is important to use your best judgment as we can never guarantee your safety, however hard we strive.  ",
    },
  ];
  const [signInPage, setSignInPage] = useState(false);
  const [tolo, setTolo] = useState(false);
  return (
    <div className="w-full h-screen min-w-screen bg-[#02182B] flex flex-col items-center justify-center">
      {signInPage ? (
        <>
          <div className="flex absolute h-screen w-full justify-start items-start pl-4">
            <button onClick={() => setSignInPage(false)}>
              <h1
                style={{
                  fontFamily: "Poppins_400Regular",
                  fontSize: 20,
                  color: "#0d95fc",
                  paddingTop: 10,
                  textAlign: "left",
                }}
              >
                {"< Back"}
              </h1>
            </button>
          </div>
          <SignIn />
        </>
      ) : (
        <>
          <TopBar
            mode={"safety"}
            signInNeed={false}
            setSignInPage={setSignInPage}
          />
          <div className="flex-grow overflow-auto w-full">
            <>
              <div className="min-h-[90%] w-full flex flex-col p-1 pt-4">
                <div className="flex flex-col w-full justify-start items-center p-1">
                  <div className={poppinsSemi.className}>
                    <h1 className="text-white text-4xl text-center">
                      Safety Tips
                    </h1>
                  </div>
                </div>

                <div className="flex flex-col w-full p-2 gap-4">
                  {termsToDisplay.map((term) => (
                    <div className="p-1">
                      <div style={{ fontFamily: "Poppins_400Regular" }}>
                        <h1 className="text-white text-2xl pb-4">
                          {term.headline}
                        </h1>
                        {term.text.split("\n").map((paragraph) => (
                          <>
                            <p
                              className={`${
                                paragraph !== ""
                                  ? "text-white"
                                  : "text-[#02182B]"
                              } text-sm ${
                                paragraph.includes("\u2022 ")
                                  ? "pl-12 pt-1 pb-1"
                                  : paragraph.includes("\u2022")
                                  ? "pl-4 pt-1 pb-1"
                                  : ""
                              }`}
                            >
                              {paragraph !== ""
                                ? paragraph
                                    .split("LINKMARKER")
                                    .map((minipar, enumer) =>
                                      enumer % 2 == 1 ? (
                                        <a
                                          href={minipar.split("REFDIV")[0]}
                                          className="text-blue-400 underline"
                                        >
                                          {minipar.split("REFDIV")[1]}
                                        </a>
                                      ) : (
                                        <span>{minipar}</span>
                                      )
                                    )
                                : "."}
                            </p>
                          </>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
            <BottomBar/>
          </div>
        </>
      )}
    </div>
  );
};
export default Safety;
