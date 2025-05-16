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

const Cookie = () => {
  const router = useRouter();
  const termsToDisplay = [
    {
      headline: "Introduction",
      text: "Project Swoop LTD believes you should have the right to know how your data is used by us. Our Cookie Policy explains what kind of “cookies” we collect about you on the Swoop app and what rights you have in regard to our data collecting. This complements our Privacy Policy, so if you want to know more about how we use your personal data please refer to our LINKMARKERprivacyREFDIVPrivacy PolicyLINKMARKER.      ",
    },
    {
      headline: "What are cookies?",
      text: "Cookies are small pieces of information stored as text files on your device during your session on a website or mobile app. The storage of cookies can be permanent on your device or for a shorter duration. These cookies can be put on your device by Swoop or third party partners of Swoop. There are also other technologies used that serve a similar purpose to cookies and all of these technologies fall under the umbrella of “cookies” in this Cookies Policy.      ",
    },
    {
      headline: "Why do we use cookies?",
      text: "We use cookies to authenticate users and allow users to access the app without signing in everytime.",
    },
    {
      headline: "What cookies do we use?",
      text: "We use Clerk cookies in order to provide authentication when you log in on your google account in the app or on the website. These cookies are essential as without them you cannot log into the app, and it will not function.",
    },
    {
      headline: "Updates",
      text: "Cookies may be changed regularly, but this information will be updated. If you no longer want the use of our cookies use the uninstall procedure or removal of cookies procedure offered by your device.",
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
            mode={"cookie"}
            signInNeed={false}
            setSignInPage={setSignInPage}
          />
          <div className="flex-grow overflow-auto w-full">
            <>
              <div className="min-h-[90%] w-full flex flex-col p-1 pt-4">
                <div className="flex flex-col w-full justify-start items-center p-1">
                  <div className={poppinsSemi.className}>
                    <h1 className="text-white text-4xl text-center">
                      Cookie Policy
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
export default Cookie;
