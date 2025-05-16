import { SignIn } from "@clerk/nextjs";
import { Poppins } from "@next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import AboutSwoop from "./aboutSwoop";
import BottomBar from "./bottomBar";
import FAQ from "./faq";
import Support from "./support";
import TopBar from "./topBar";

//340 by 690 px design

const poppinsHeavy = Poppins({ weight: "500", subsets: ["latin"] });
const poppinsSemi = Poppins({ weight: "400", subsets: ["latin"] });

const JadenScreen = ({ signInNeed }: { signInNeed: boolean }) => {
  const [signInPage, setSignInPage] = useState(false);
  const testimonials = [
    {
      school: "Hill Valley High School",
      name: "Marty McFly",
      message: "Found the love of my life!",
    },
    {
      school: "North Shore High School",
      name: "Regina George",
      message: "He's definitely Mr. Right!",
    },
    {
      school: "East High School",
      name: "Troy Bolton",
      message: "Incredible experience! She's the one for me!",
    },
    {
      school: "Midtown Tech",
      name: "Ned Leeds",
      message: "Definitely a MUST for a contemporary high school experience!",
    },
  ];
  const router = useRouter();
  const [mode, setMode] = useState("Home");
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
            mode={mode}
            signInNeed={false}
            setSignInPage={setSignInPage}
          />

          <div className="flex-grow overflow-auto w-full">
            {mode === "About Swoop" ? (
              <AboutSwoop />
            ) : mode === "FAQ" ? (
              <FAQ />
            ) : mode === "Support" ? (
              <Support />
            ) : (
              <>
                <div className="flex flex-row w-full h-40 xl:h-60">
                  <div className="flex w-[50%] items-center justify-center">
                    <div className={poppinsSemi.className}>
                      <button
                        className="text-white border hover:text-stone-200 border-white rounded-md p-2 bg-stone-400 xl:text-3xl"
                        onClick={() => router.push("/aboutUs")}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                  <div className="flex w-[50%] flex-col items-center justify-center gap-2">
                    <div className="flex flex-col justify-end">
                      <div className={poppinsHeavy.className}>
                        <div className="flex flex-row justify-end">
                          <p className="text-end text-white text-3xl xl:text-5xl">
                            Meet
                          </p>
                          <p className="text-end text-[#02182B] text-3xl xl:text-5xl">
                            .
                          </p>
                        </div>
                        <p className="text-end text-white text-3xl xl:text-5xl">
                          Swoop.
                        </p>
                        <p className="text-center text-white text-xs xl:text-xl pt-2">
                          now there's no pressure
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col xl:flex-row w-full bg-stone-400 items-center justify-center">
                  <div className="flex w-[50%] max-h-2/3screen items-center justify-center h-full">
                    <Image
                      src={require("../../assets/Websithone.png")}
                      alt="Image"
                      className="object-contain	aspect-auto	flex-grow max-h-2/3screen p-2 items-center justify-center"
                    />
                  </div>
                  <div className="flex w-full xl:w-[50%] p-1 items-center justify-center flex-col gap-4  items-center p-8">
                    <p className="text-center text-white text-sm">
                      You're sitting alone at home on a Sunday night, thinking
                      about mustering up the courage to tell your crush how you
                      feel tomorrow. But then the ominous thought of what could
                      go wrong creeps through your mind. And with this idea, the
                      image of you telling them how you feel vanishes in an
                      instant. You wish there was just a way to know how they
                      felt without asking.
                    </p>
                    <p className="text-center text-white text-sm">
                      Then, suddenly, your phone vibrates on the bed beside you.
                      You look down to see a screen that reads out, "Swoop."
                      Swoop is a fresh new app that helps high schoolers connect
                      with each other from the comfort of their bedroom. The app
                      helps build relationships by using a simple like or
                      dislike system, allowing you to choose the people you are
                      attracted to. Then, the app connects you with a simple
                      matching system to find people who like you back. This app
                      will revolutionize the world of dating between teenagers
                      in high school by creating relationships and having fun in
                      the process.
                    </p>
                  </div>
                </div>
                {/*<div className="flex flex-col w-full p-2 justify-start items-center gap-6 pb-6">
                  <div className={poppinsSemi.className}>
                    <h1 className="text-white text-xl text-center">
                      OUR TESTIMONIALS
                    </h1>
                  </div>
                  <div className="grid lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4">
                    testimonials.map((testimonial) => {
                      return (
                        <div className="flex flex-col items-center justify-center gap-1">
                          <p className="text-sm text-white text-center">
                            {'"' + testimonial.message + '"'}
                          </p>
                          <p className="text-xs text-white text-center">
                            {"-" + testimonial.name + ", " + testimonial.school}
                          </p>
                        </div>
                      );
                    })</div> <div className="flex flex-col items-center justify-center gap-1">
                      <p className="text-sm text-white text-center">
                        {'"' + "The future of connection" + '"'}
                      </p>
                      <p className="text-xs text-white text-center">
                        {"- Project Swoop LTD"}
                      </p>
                    </div>
                  
                </div>*/}
              </>
            )}{" "}
            <BottomBar />
          </div>
        </>
      )}
    </div>
  );
};

export default JadenScreen;
