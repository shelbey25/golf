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

const Privacy = () => {
  const router = useRouter();
  const termsToDisplay = [
    {
      headline: "Introduction",
      text: "As Swoop is a UK exclusive app, all data is managed by:\n\nProject Swoop LTD\n57A Randolph Avenue\nLondon\nW91BQ\nUnited Kingdom\n\nProtecting users’ data and their privacy is a top priority for Swoop. In this Privacy Policy, how we process and use your data will be explained, so that there is complete transparency over how your information is used by Project Swoop LTD. The information we collect is under the section “Data We Collect” and the purpose of its collection is detailed under “The Use of Your Data”. We store personal information for as long as it is needed or required by law.\n\n“Personal information” or “personal data” is used to describe any piece of personal information that can be used to identify you such as your name, location, email address, or photo.\n\nThis Privacy Policy is intended to extend to all websites or apps run by Project Swoop LTD.",
    },
    {
      headline: "Data We Collect",
      text: "Account Creation. When you create an account on Swoop, you provide us with some basic information. We collect a selfie of you, your preferred name, your graduation year, your gender, who you are attracted to, your consent to the Terms and Conditions, your consent to this Privacy Policy, and your affirmation that you are currently enrolled in HS as well as between the ages of 14 and 18. You also acknowledge that your gender, sexual orientation, picture, name, and email are all publicly visible or inferable by other users. \n\nAdditionally, upon account creation Google provides us with some basic information such as your name, Googl email, and Google profile image. This information is also public to other users and you are aware of this.\n\nReports and Complaints. If you report a user through the app or are reported your information will be processed as well as your claim. The same process is applicable if you file a complaint, problem, or other note about the app.\n\nProfile Verification. Your email address, name, and image are automatically processed by Project Swoop LTD upon signup or changing your profile image. This is to provide a safer environment for users, ALTHOUGH SOME MALICIOUS ACCOUNTS MAY BE MISSED IN THE BRIEF SCREENINGs, SO PROJECT SWOOP LTD OR SWOOP CANNOT BE HELD LIABLE FOR RESULTING LIABILITIES.\n\nCamera. Access to your camera. In order to create a profile image access to your camera is required, however, we still need your permission to access it.\n\nSharing. When you use features on Swoop, Project Swoop LTD will use, store, and process this information to allow the app to function. Additionally, much of your shared information such as email, preferred name, sex, graduation year, sex you are attracted to, and your profile picture is either publicly accessible or easily inferred by other users. Beware that this is not all the information that other users can access and any information shared with Project Swoop LTD has the potential to be shared or saved by other users.\n\nUse of the app. When you use the app you allow us to automatically collect data on the following:\n\u2022The Swoop id associated with your account\n\u2022The date and time you last logged in\n\u2022The date and time you last claimed a daily reward\n\u2022The date and time in regards to when your clicks will regenerate\n\u2022The date and time in regards to whether you have used your weekly update of matches\n\u2022The date and time you used your dream match\n\u2022The school group you are apart of\n\u2022Your preferred name\n\u2022Your sex\n\u2022What sex you are attracted to\n\u2022Your graduation year\n\u2022Your date of birth\n\u2022Your interactions with Swoop features and other users including, but not limited to people you like, your matches, and when you reveal matches\n\nPurchases. When you make a purchase on Swoop, Project Swoop LTD records a record of it, however your payment is entirely processed by your app store.\n\nOther data. We may also receive data on you from other users, such as in the form of reports. Additionally, our business partners such as app stores may provide us with additional information such as analytics on you. Also, governmental, law enforcement, or NGOs may provide us with information for safety, to help us carry out an investigation, or to help advance legal proceedings.",
    },
    {
      headline: "The Use of Your Data",
      text: "Your personal data is primarily used to make Swoop’s services safe and the best they can be to enhance your experience while using the app.\n\nHow data is used to provide app functionality and manage your account:\n\u2022Allows you to match, click to make matches, use the dream match feature, purchasing items, as well as, other features on Swoop\n\u2022Show relevant advertisements where appropriate\n\u2022Create a safe environment by managing your and other users accounts, as well as, by responding to your reports and questions\n\nWe ask for your consent where required by law in regards to our processing and usage of your data. Our LINKMARKERtermsREFDIVTerms and ConditionsLINKMARKER offer additional clarification in regards to what is expected from you and legal rights to your data. \n\nHow data is used to improve Swoop:\n\u2022Measure which features are most popular by analyzing statistics from Swoop\n\u2022Fix technical issues\n\u2022Create and develop new features on Swoop\n\u2022Improve the quality of user experience\n\nHow data is used to personalize your experience:\n\u2022Group you based off your school email\n\u2022Use your devices camera to create profile images\n\u2022Show you relevant ads\n\u2022Show you more relevant matches\n\nHow data is used for safety purposes:\n\u2022To enforce our LINKMARKERcommunityREFDIVCommunity GuidelinesLINKMARKER and LINKMARKERtermsREFDIVTerms and ConditionsLINKMARKER by banning or terminating accounts of users that post inappropriate or unwanted content or perform actions that go against the integrity or safety of Swoop or its community\n\u2022To fight against fraudulent profiles\n\u2022To attempt to create a community closed off from people that do not have an association with your school\n\u2022To estimate your age to attempt to attempt to limit access to 14-18 year olds\n\u2022Track suspicious accounts\n\u2022Monitor how well our safety procedures work\n\nHow data is used to fulfill legal obligations and assist authorities:\n\u2022Use of a reporting feature to attempt to find violations of our LINKMARKERcommunityREFDIVCommunity GuidelinesLINKMARKER and LINKMARKERtermsREFDIVTerms and ConditionsLINKMARKER\n\u2022Remove unlawful content\n\u2022Assist law enforcement\n\u2022Store data for investigations\n\u2022Comply with legal or regulatory requirements in the UK\n\u2022Reporting potentially life threatening situations to authorities such as potential self-harm or violence",
    },
    {
      headline: "How Long Your Data is Kept",
      text: "We keep and use your information as long as we need to in order to allow you to use Swoop. If you want to delete the information collected on you, you can click “Delete Account” under “Account Information” on the app. This will lead you to no longer be able to access your account and other users can likewise not see your profile. Additionally, your account will be deleted automatically after you graduate. \n\nYour account and its information may also be deleted if you violate our LINKMARKERcommunityREFDIVCommunity GuidelinesLINKMARKER and LINKMARKERtermsREFDIVTerms and ConditionsLINKMARKER. It is important to note, however, that we may store the content that violates these agreements even if it is removed from the app. Additionally, if we are required legally to store personal data for an additional period of time, we will continue storing it.",
    },
    {
      headline: "Who We Share Your Data With",
      text: "Project Swoop LTD Personnel. Our employees have access to your personal data in order to process it as detailed above. This includes but is not limited to filtering profiles to attempt to create a safer environment.\n\nService Providers. Your personal data is shared with Service Providers that allow us to host and operate Swoop. These Service Providers also help us to monitor Swoop’s performance and safety.\n\nChange of Ownership. In the event that ownership changes your personal data will be transferred with Swoop, but the Privacy Policy will continue to apply.\n\nAffiliates. Project Swoop LTD may disclose personal information to affiliates to help run Swoop effectively or for any other purpose detailed in “The Use of Your Data”.\n\nLegal Rights, Legal Obligations and Safety. To protect users, the safety of Swoop, the safety of the community or to protect against a deemed threat, Swoop may share data with law enforcement or authorities. Additionally, Swoop may share your personal data with courts, legal advisors, or other public figures in the event Project Swoop LTD is engaged in a legal battle or lawsuit.\n\nOther Users. All data you share with Project Swoop LTD may be accessed, saved, or easily inferred by other users through the app. Therefore, be careful of the content you share on Swoop as it is public. We cannot control what you send or what other users do with your information, so be conscious of the consequences of your actions as Project Swoop LTD is not responsible.",
    },
    {
      headline: "Data Protection",
      text: "Swoop is committed to keeping as much of your information as possible private and confidential. Of course, this will vary depending on how the information is used, but it is important to know we give our best effort towards maintaining protection around your private data.\n\nHowever, while we give it our best effort to keep your private information private, it is important to understand that we can not guarantee it stays private in all circumstances. Be conscious of what you share on the app, and keep your passwords safe to have a better chance of keeping your information private.",
    },
    {
      headline: "Privacy Rights",
      text: "Providing you with your rights regarding your privacy and data is important to Project Swoop LTD. Subsequently these are your privacy rights:\n\u2022You have the right to access your personal data: the best way to do this is “View My Collected Data” under “Account Information”\n\u2022You have a right to correct your personal data if it is incorrect or incomplete: the best way to do this is email customersupport@projectswoop.com or file a complaint within “Account Information” in the app\n\u2022You have the right to delete your data at any time under “Delete Account” under “Account Information”\n\u2022You have a right to withdraw, object, or restrict the processing of your data, but this could mean you no longer can use the app if the processing is integral to your use: the best way to do this is email customersupport@projectswoop.com\n\u2022You have the right to issue instructions regarding what should be done with your information and data after your death: please email customersupport@projectswoop.com\nKeep in mind, however, using these rights can prohibit your use of Swoop if the app relies on the information you deny us.\n\nAdditionally, this app is for 14-18 year olds and Swoop does not intend to collect data on younger audiences, and if it is discovered that a younger user is accessing the app their data will be removed as soon as possible. Please reach out to customersupport@projectswoop.com if you know a user under 14 using the app.",
    },
    {
      headline: "Contact and Updates",
      text: "If you have any questions in regards to this Privacy Policy please reach out to customersupport@projectswoop.com.\n\nPlease note this Privacy Policy may be updated from time to time to comply with changing regulations or to improve it. Please check back from time to time. If there is a large change you will be notified, but your continual use of the app or the website assumes you accept the updates to this Privacy Policy.",
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
            mode={"privacy"}
            signInNeed={false}
            setSignInPage={setSignInPage}
          />
          <div className="flex-grow overflow-auto w-full">
            <>
              <div className="min-h-[90%] w-full flex flex-col p-1 pt-4">
                <div className="flex flex-col w-full justify-start items-center p-1">
                  <div className={poppinsSemi.className}>
                    <h1 className="text-white text-4xl text-center">
                      Privacy Policy
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
export default Privacy;
