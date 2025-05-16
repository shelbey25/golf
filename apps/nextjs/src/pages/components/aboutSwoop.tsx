import { Poppins } from "@next/font/google";
import Image from "next/image";

//340 by 690 px design

const poppinsHeavy = Poppins({ weight: "500", subsets: ["latin"] });
const poppinsSemi = Poppins({ weight: "400", subsets: ["latin"] });

const AboutSwoop = () => {
  const points = [
    {
      header: "Streamline Matching",
      description:
        "Swoop streamlines dating by making it as simple as saying yes or no to a person through one click while remaining anonymous. Swoop also uses a clever algorithm to speed up your matching by showing people we think you are more likely to match with.",
    },
    {
      header: "No Risk",
      description:
        "Matches are only displayed when you like a person, and they like you back. Therefore, if you like someone, they'll never know you like them until they say they like you too—a great way to avoid awkward conversations.",
    },

    {
      header: "Community",
      description:
        "Dating in high school is often at your local school, so Swoop only allows you to see people with the same school email. This functionality expedites the dating process showing you people you already have a connection with.",
    },
    {
      header: "Safety",
      description:
        "Swoop verifies users and ensures their email matches their name to ensure people are themselves. Additionally, Swoop protects against harm by only allowing people within your school domain to see you. A report feature is also included, so you can inform us of misuse of the app. Additionally, Swoop doesn't have a chat feature to ensure maximum safety.",
    },
    {
      header: "Low Pricing",
      description:
        "Swoop only charges you when you match with someone you like or reveal a match early. That's right; we only profit when you benefit. Thus you can try the app completely free, and future charges are minimal to fit the teenage budget. Also, the dream match is a free alternative to paid matches.",
    },
    {
      header: "Dream Match",
      description:
        "We all have that one crush. We created the dream match to allow you to select that one person directly each month. If you match with them, the match is free!",
    },
    {
      header: "Weekly Reset",
      description:
        "Swoop resets your interests weekly to prevent you from matching with someone you no longer like.",
    },
    {
      header: "Cooldowns",
      description:
        "Swoop uses swipe cooldowns (wait times) to encourage people to be genuine and truly consider the candidate. The swipe cooldown is also designed in conjunction with the weekly reveal to minimize bullying. Swoop uses a weekly reveal, so you don't miss out on the anticipation of dating, but there always is the instant reveal for those of us who just can't wait.",
    },
  ];
  return (
    <>
      <div className="min-h-80 w-full flex  p-1">
        <div className="w-1/2 items-center justify-center flex p-1 pr-2">
          <Image
            src={require("../../assets/RoughBird.png")}
            alt={"Image"}
            className="object-contain items-center justify-center  flex-grow	aspect-auto	max-h-60"
          />
        </div>
        <div className="flex flex-col w-1/2 justify-center items-center p-1 pr-4 gap-2">
          <div className="w-full items-end">
            <div className={poppinsSemi.className}>
              <h1 className="text-white text-2xl text-center">Why Swoop?</h1>
            </div>
          </div>
          <p className="text-white text-center">
            Swoop is the first dating app designed for high schoolers. Swoop is
            committed to creating a positive and safe experience for all our
            users. Swoop is the next addition in the high school experience.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {points.map((point) => {
          return (
            <div className="items-center justify-center w-full flex  p-1">
              <div className="flex flex-col w-full h-full justify-start items-center p-1 gap-2">
                <div className="w-full items-center">
                  <div className={poppinsSemi.className}>
                    <h1 className="text-white text-2xl text-center">
                      {point.header}
                    </h1>
                  </div>
                </div>
                <p className="text-white text-center">{point.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default AboutSwoop;
