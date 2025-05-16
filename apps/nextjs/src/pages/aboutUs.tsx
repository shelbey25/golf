import { SignIn } from "@clerk/nextjs";
import { Poppins } from "@next/font/google";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import AboutSwoop from "./components/aboutSwoop";
import BottomBar from "./components/bottomBar";
import TopBar from "./components/topBar";

//340 by 690 px design

const poppinsHeavy = Poppins({ weight: "500", subsets: ["latin"] });
const poppinsSemi = Poppins({ weight: "400", subsets: ["latin"] });

const AboutUs = () => {
  const router = useRouter();
  const [signInPage, setSignInPage] = useState(false);
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
            mode={"About Swoop"}
            signInNeed={false}
            setSignInPage={setSignInPage}
          />
          <div className="flex-grow overflow-auto w-full">
            {<AboutSwoop />}
            <BottomBar />
          </div>
        </>
      )}
    </div>
  );
};
export default AboutUs;
