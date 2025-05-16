import { SignIn } from "@clerk/nextjs";
import { Poppins } from "@next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import AboutSwoop from "./components/aboutSwoop";
import BottomBar from "./components/bottomBar";
import FAQ from "./components/faq";
import Support from "./components/support";
import TopBar from "./components/topBar";

//Techincal glitch with menu bar @shelbey25
//340 by 690 px design

const poppinsHeavy = Poppins({ weight: "500", subsets: ["latin"] });
const poppinsSemi = Poppins({ weight: "400", subsets: ["latin"] });

const Community = () => {
  const router = useRouter();
  const termsToDisplay = [
    {
      headline: "Introduction",
      text: "Swoop is designed for HS as a safe way to enter the world of online dating and connect with others. Because we deal with an HS audience, we focus on ensuring Swoop is a safe environment. We do this by using school domain authentication, requiring visible faces from a selfie, and having systems to attempt to filter accounts to try and weed out obvious violators. \n\nHowever, we cannot filter everything, and the Swoop community plays a vital role in keeping itself safe. The Community Guidelines is an overview of expected behaviors and standards users will be held to create a safe and positive environment. Every user must accept these guidelines to use the app. These guidelines focus on rules regarding bullying, fake profiles, nudity, pornography, age, and other rules that facilitate a safe, positive experience for users on Swoop.\n\nIf these guidelines are violated, Project Swoop LTD will take the appropriate actions to ensure the safety of other users on Swoop, including, but not limited to, sending reminders, suspending or banning accounts, terminating accounts, investigating, and removing content.\n\nIf you notice something feels wrong or is a violation, please don't hesitate to report it through the app or reach out directly over email to customersupport@projectswoop.com.\n\nOur Community Guidelines apply to all users of Swoop and check back regularly for updates to our guidelines, which change to create the best possible environment.\n\nThese Community Guidelines are intended to keep users safe and comfortable and protect their human rights.",
    },
    {
      headline: "User Identity",
      text: "It is important that users are who they say they are and that they meet the criteria required to use Swoop to preserve a safe environment on Swoop. Swoop is a platform to make connections and a bridge to the online dating world. We expect all users to provide accurate information at all times.\n\nSetting up a Swoop account requires the following information:\n\u2022Name\n\u2022Graduation year\n\u2022Date of birth\n\u2022Sex\n\u2022The sex you are attracted to\n\u2022A selfie where your face is clearly identifiable\n\u2022Your school email \n\nAdditionally, you must meet the age requirements of being 14-18 and be currently enrolled in High School, as well as other requirements covered in the Terms and Conditions.\n\nWe filter accounts through methods such as a reporting system, requiring school email, and manually glancing over profile details before approving a user to use the app. However, this system is not foolproof, so it is important to stay vigilant while using Swoop.\n\nIf you do not meet the requirements or provide false information, your account may be banned or terminated from Swoop.",
    },
    {
      headline: "Dangerous Content and Malicious Behaviors",
      text: "Due to the age of the community, nudity, partial nudity, as well as pornographic, sexual, and suggestive content is prohibited. Failure to oblige can lead to the banning or termination of your account.\n\nIf you notice any content that fails to meet these requirements, do not hesitate to reach out to customersupport@projectswoop.com or file a report through the app.\n\nWe expect all users to interact with other users in an honest, kind, and respectful manner. This means bullying, harassment, or other unwanted behaviors will not be tolerated and can lead to the banning or termination of your account. This includes but is not limited to attempting to humiliate another user, pretending to be another person, or using the app in a way intended to harm.\n\nWe also do not tolerate sexual harassment or other unwanted behaviors directed toward other users on or off the app. If you feel in any way threatened, have questions, or are uncomfortable, please send a report to customersupport@projectswoop.com immediately.\n\nWe also have zero tolerance towards child sexual abuse and exploitation. Any actions or behaviors that occur on or off the app but create a risk to a young user may lead to the banning of your account, the termination of your account, and be reported to the authorities.\n\nMatching on the app does not imply any sort of sexual relationship or activity and can simply mean users mutually like each other as friends. Swoop expects users to abide by the law regarding the age of consent on and off the platform.\n\nWe do not tolerate hate or discrimination of any kind on or off of Swoop by our users, as we believe all users should feel safe and respected. \n\nAdditionally, Swoop doesn't tolerate violence, any allusions to violence, or behaviors that could lead to violence on or off the app. \n\nFailing to follow any of these conditions could result in the banning of your account, the termination of your account, or any other actions Project Swoop LTD deems necessary for the safety of the Swoop community.",
    },
    {
      headline: "Privacy Violations",
      text: "Every Swoop user has the right to privacy. Swoop will do its best to uphold this by making it clear that user's information should not be shared, manipulated, or stored without their prior permission and knowledge.    ",
    },
    {
      headline: "Illegal Activity",
      text: "Illegal activity, hacking, or accessing private information is prohibited and may be reported to law enforcement. \n\nImpersonation is also prohibited. Impersonation includes but is not limited to using someone else's email, not using your real name, or having a picture of someone else as your profile picture.\n\nAdditionally, illegal activity for minors, such as drugs and alcohol, is prohibited from being represented, encouraged, or alluded to on the app by our users.",
    },
    {
      headline: "Self Harm",
      text: "It is important to Project Swoop LTD that Swoop fosters connections for users and does not negatively impact their self-perception or mental health. Therefore, if Swoop believes you are in danger of self-harm or suicide, authorities may be contacted, and appropriate actions may be taken. Please contact us at customersupport@projectswoop.com or a trusted advisor if you are having harmful thoughts.      ",
    },
    {
      headline: "Enforcement",
      text: "If these Community Guidelines are not followed, depending on the situation, appropriate action will be taken, such as:\n\u2022Educating the user\n\u2022Removing content\n\u2022Banning the user; attempts to avoid this ban will result in the termination of your account\n\u2022Terminating the user's account\n\u2022Reporting to local authorities",
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
            mode={"Com"}
            signInNeed={false}
            setSignInPage={setSignInPage}
          />
          <div className="flex-grow overflow-auto w-full">
            <>
              <div className="min-h-[90%] w-full flex flex-col p-1 pt-4">
                <div className="flex flex-col w-full justify-start items-center p-1">
                  <div className={poppinsSemi.className}>
                    <h1 className="text-white text-4xl text-center">
                      Community Guidelines
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
            <BottomBar />
          </div>
        </>
      )}
    </div>
  );
};
export default Community;
