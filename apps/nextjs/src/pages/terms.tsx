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

const Terms = () => {
  const router = useRouter();
  const termsToDisplay = [
    {
      headline: "Acceptance of Terms of Use Agreement",
      text: "By creating a Swoop account or accessing Swoop or Project Swoop Services through any means, including but not limited to through mobile devices and computers, you consent to be bound by and confirm you have read these Terms of Use, our Privacy Policy, Cookie Policy, Safety Tips, and Community Guidelines.\n\n We may alter this Agreement and the Service occasionally to reflect changes to law, improve our services, or based on changes in business strategy. We will notify you about any material changes to the Terms, but it is encouraged to check the Terms often to stay updated on any changes; the most current version will be available on our website under Terms or on our app on the “Account Information” page the Terms can be accessed. The most recent version applies to you. When Swoop implements changes, if you continue to use Swoop, you agree to the latest version of the Agreement.",
    },
    {
      headline: "Eligibility",
      text: "You are not allowed to use, create an account, or interact with Swoop or its services unless all of the following are true:\n\u2022You are a resident of the United Kingdom\n\u2022You are currently enrolled in high school; accounts can and will be removed after graduation, and no refunds or compensation will be given for loss of access to your account or peripherals associated with your account\n\u2022You can form a binding contract with Swoop\n\u2022You haven’t previously been banned, suspended, or terminated by Swoop\n\u2022You haven’t violated any outlined guidelines from our Terms or our Community Guidelines\n\u2022You are between the ages of, inclusively, 14 to 18 throughout your entire interaction with Swoop - implying you are above the age of digital consent in the UK\n\u2022You authorize other 14 to 18 year olds, inclusively, to see and interact with your profile\n\u2022You are not barred from using this service under UK law, have not been convicted of a felony, sexual offense, indictable offense, or any crime involving violence or abuse, and are not registered as a sex offender.\n\u2022You have and will continue to comply with the rules and regulations outlined\n\u2022You have and will continue to comply with local, national, and international laws\nSwoop may take reasonable action to ensure you comply with the outlined rules and guidelines to create a safe community. Suppose you fail to comply with any rules or perform malicious acts. In that case, your account may be suspended or terminated altogether, and we will take any action necessary to prevent you from accessing or interacting with Swoop further.",
    },
    {
      headline: "Your Account",
      text: "To use Swoop, you must sign in using a Google email address with your school’s domain, your “school email.” By logging in to Swoop with Google, you authorize us to use certain information from your Google account, including private and public information. Additionally, users are required to provide Swoop with some basic personal data, as outlined below, and you can find more details on specifics and how we use it in our Privacy Policy.\n\nYour profile picture must be a picture of you and only you, where your face is discernible. Additionally, your profile picture may not be pornographic or sexually explicit.\n\nUsers are required to provide a preferred name during the registration process. This preferred name should represent the name by which you are commonly known and should not be used for malicious intent, impersonation, or aims to mislead.\n\nUsers must accurately provide their expected graduation year based on their current grade level. Users must also supply their accurate birthdate. This information must be accurate so that Swoop can create a safe and positive environment. Additionally, users are required to specify their sex assigned at birth and indicate the gender or genders to which they are attracted. Modifying this information with the intent to deceive or for any harmful purposes is strictly prohibited.\n\nIf you have created a previous account, you should not make a new account, particularly, but not limited to, if that account was banned, suspended, or revoked.\n\nSwoop reserves the right to investigate in any way deemed fit whether an account is fake or does not meet these expectations.\n\nYou are responsible for keeping your account and login information private. All actions taken under or in connection to your account are deemed your responsibility and your actions. If you think someone has accessed your account, please get in touch with us immediately at customersupport@projectswoop.com.",
    },
    {
      headline: "Service Description",
      text: "Creating an account provides you with access to the Swoop App. Swoop is a mobile app that allows HS students to view mutual interests in each other amongst themselves and other users. Our App includes:\n\u2022Clicks: Click on whether you like someone or not in the current week\n\u2022Instant Reveal: Update whether a match has been made before the weekly release\n\u2022Matches: Once revealed, shows the identity of who you liked and they liked you back in the same week\n\u2022Dream Match: You can select one person that you want to know if they like you mutually for free\nTo further your use of the App, you can purchase in-game currency, or Hearts, through the App. Hearts allow you to reveal the identity of a confirmed match and use the Instant Reveal feature. In-game currency can also be earned through daily check-in rewards.",
    },
    {
      headline: "Modifying the Service and Termination",
      text: 'Swoop is always attempting to improve our service and bring new features that are exciting and meaningful. Therefore, Swoop may occasionally add or remove elements; if they do not affect your rights or obligations, we may not provide you with notice before changing them. We may even suspend or terminate the service entirely at any time without notice.\n\nTo terminate your account, hit the "Terminate Account" button under "Account Information" on the "Events" screen and proceed to follow any instructions on the app if prompted. Please contact us at customersupport@projectswoop.com if you need assistance. Swoop may terminate, ban, or suspend your account at any time without notice if we believe you have violated this Agreement or the Community Guidelines. This also means your account can be terminated upon your 19th birthday as you are no longer 14 to 18 years of age. If your account is terminated, banned, or suspended at any time, you will not be entitled to or given a refund for any purchases or digital currency.\n\nIn the event your account is terminated, this Agreement will also terminate, by the following sections will still apply to you and Swoop going forward:\n\u2022Modifying the Service and Termination\n\u2022Safety\n\u2022Disclaimers\n\u2022Third Party Services \n\u2022Limitation of Liability\n\u2022Settling Disputes \n\u2022Indemnity by You\n\u2022Entire Agreement; Other',
    },
    {
      headline: "Safety",
      text: "Project Swoop LTD constantly works to create a safe and respectful community and member experience in the app. Still, Project Swoop LTD is not responsible and cannot be held liable for the actions or choices of users on or off the app, regardless of whether any action has or has not previously been taken against them by Project Swoop LTD. You agree to use caution and take responsibility for all interactions on and off of Swoop, including, but not limited to, meeting in person or communicating through other means. More details on how to stay safe can be read in our LINKMARKERsafetyREFDIVSafety TipsLINKMARKER. You agree not to provide financial aid or information to users you met through the app, even if requested through a different platform or medium. You also agree to engage in lawful interactions with other members on this platform, ensuring compliance with UK regulations and relevant international laws. This includes, but is not limited to, respecting age-related guidelines, specifically the UK age of consent. \n\nSwoop is not responsible or liable for your interactions with other members; YOU ARE SOLELY RESPONSIBLE. Although Swoop attempts to filter profiles, no criminal background check or additional user history check is performed. In addition, Swoop cannot be held responsible for users who fake their age or some other aspect of their identity. This Agreement outlines who should be on the app, but PROJECT SWOOP LTD IS NOT RESPONSIBLE FOR MEMBERS WHO FAIL TO MEET THESE REQUIREMENTS BUT STILL ACCESS THE APP. THEREFORE, ACCESS THIS APP AND INTERACT WITH OTHER USERS AT YOUR OWN DISCRETION AND LIABILITY. SWOOP IS NOT LIABLE FOR ISSUES INCLUDING, BUT NOT LIMITED TO, FAKE ACCOUNTS, UNAUTHORIZED USERS, DOMAIN IMPERSONATION, INAPPROPRIATE CONTENT, OTHER MALICIOUS USERS, OR OTHER MALICIOUS USER ACTIONS.      ",
    },
    {
      headline: "Rights Swoop Grants You",
      text: "Project Swoop grants you a personal, worldwide, royalty-free, nonexclusive, non-assignable, revocable, temporary, and non-sublicensable license to access and use the Service. Swoop is exclusively and solely owned by Project Swoop LTD. This license is only granted to allow you to use Swoop's Service as intended, and this Agreement will enable you to. This license and any given use of the Service is instantly removed if you do any of the following:\n\u2022Using Swoop or any content within the app without prior written permission from Project Swoop LTD for any commercial purpose\n\u2022Copying, modifying, taking, or creating anything from Swoop or any content within the app, including but not limited to branding, names, intellectual property, and designs, without prior written permission from Project Swoop LTD\n\u2022Mirroring or reverse engineering any part of Swoop's Service or code, regardless of its purpose\n\u2022Using, accessing, or publishing any part of Swoop's code without our prior written approval\n\u2022Conveying that a statement or action you make is endorsed by Swoop or Project Swoop LTD\n\u2022Using any technique to access Swoop or Project Swoop LTD information, databases, or other information undisclosed to the general public on the app or website\n\u2022Accessing another user's data not publicly shared\n\u2022Attempting to test, probe, or otherwise find a weakness or vulnerability in any services provided by Project Swoop LTD, including but not limited to Swoop\n\u2022Using Swoop in any way that has the potential to negatively impact Swoop's functionality, user experience, or user safety\n\u2022Compromising the integrity of Swoop's security system or code \n\u2022Creating false or misleading information, including but not limited to fake emails or disguising the origin of your requests, hiding your action from Swoop\n\u2022Pretending to be a part of Project Swoop LTD through, but not limited to, using Swoop branding (outlined in our branding guideline) or claiming affiliation with Swoop or Project Swoop LTD when you are not on staff\n\u2022Creating any third-party application that interacts with Swoop directly or indirectly\n\u2022Promote, spread, or share any activities or actions that violate this Agreement\nSwoop reserves the right to investigate and take any available legal action or other action deemed necessary to respond to illegal, unauthorized, or other misuse of Swoop, including but not limited to the banning or termination of your account.\n\nAny software that Project Swoop LTD provides you, including Swoop, may automatically install updates or new features based on your settings. If you don't want this, you may be able to change your device settings to prevent automatic downloads of upgrades to Swoop.",
    },
    {
      headline: "Rights you Grant Swoop",
      text: "By creating an account, you authorize Swoop a worldwide, transferable, sub-licensable, royalty-free, and nonexclusive right and license to allow the app to function and create a safe environment. This license allows us to, but is not limited to, store, host, use, copy, modify, display, edit, publish, and distribute the information you allow us to use from Google, as well as any information you disclose, display, post, or make available to Swoop on the Service or share within the Service. Swoop has an exclusive right to screenshots of the app or Service, even if your content is contained within the image. You also authorize Swoop the right to pursue legal action, but not the obligation, in the case of others misusing your information or content. You agree that any content or information you provide to Swoop may be used, accessed, seen, or saved by other members of the Service.\n\nYou agree that all the information and data you provide or create while creating an account or using Swoop is under your rights and ownership, accurate, truthful, complete, and you grant the license to Swoop as above.\n\nYou consent that we may monitor, manipulate, review, or delete any content or information you provide that Swoop views as unfit, endangers Swoop as a corporation, or believes violates this Agreement.\n\nWe reserve the right to terminate your account if you fail to interact respectfully and civilly with Swoop customer service over email, phone, or any other means of communication or interaction.\n\nYou also acknowledge that Swoop may access, view, save, and share your account information and content if required by law or if necessary for the safety or functionality of the app. Reasons for access can include, but are not limited to:\n\u2022Comply with the law or legal process\n\u2022Check if you have violated this Agreement \n\u2022Enforce this Agreement\n\u2022Check to see if you have violated the rights of third parties \n\u2022Assess the app functionality\n\u2022Respond to your or other customers complaints, needs, or concerns\n\u2022Protect other users' or non users' safety and rights",
    },
    {
      headline: "Community Rules",
      text: "When accessing or interacting with Swoop, you may not:\n\u2022Violate any laws or this Agreement\n\u2022Use it for harmful, malicious, or offensive purposes\n\u2022Use it to harm Swoop or Project Swoop LTD, including but not limited to their reputation\n\u2022Provide false information such as a fake age, picture, name, email address, or a faulty status on attending school\n\u2022Collect information on other users without their consent\n\u2022Violate our most recent Community Guidelines\n\u2022Ignore our Safety Guidelines\n\u2022Interfere with Swoop's security measures\n\u2022Abuse, harass, control, intimidate, defame, humiliate, bully, or harm other members in any way\n\u2022Impersonate any other person, including but not limited to using their name, using a picture of them, or using their email address\n\u2022Use another person's account\n\u2022Attempt to obtain another user's information or passwords without express permission from the other user\n\u2022Create a secondary account for yourself or maintain multiple accounts, particularly if a previous account has been banned, terminated, or suspended\n\u2022Post any content that:\n\u2022 Violates anyone's rights\n\u2022 You don't own rights to\n\u2022 Is hateful, humiliating, or threatening\n\u2022 Is pornographic, sexually explicit, graphic, or contains nudity\n\u2022 Suggests themes of violence, abuse, or any other form of misconduct\nProject Swoop LTD reserves the right to investigate, ban, suspend, or terminate your account in the event of the misuse of Swoop, inappropriate or unlawful behavior, the violation of this Agreement, unlawful actions, or for any other reason deemed as a threat to the well being of Swoop or its community including actions taken off the app. If action is taken against you for violating these rules or our Community Guidelines, no refunds will be given, and all digital currency may be lost. You will no longer be granted access to the app or permission to use it.",
    },
    {
      headline: "Other Members’ Content",
      text: "Swoop reserves the right to filter, monitor, review, remove, and investigate Content including but not limited to Content that violates this Agreement, but Swoop will not be held responsible for Content that violates this Agreement including, but not limited to fake ages, fake names, fake emails, impersonation, pornographic or explicit Content, and other malicious Content. If you notice any content that may violate this Agreement, please reach out and report it to customersupport@projectswoop.com. However, all Content you access is solely the responsibility of the user who posted, uploaded, or shared it. Swoop cannot be held responsible for violations of this Agreement or guarantee that all users will uphold this Agreement.      ",
    },
    {
      headline: "Purchases",
      text: 'Swoop may offer digital items, digital currency, or services for purchase in the form of “in-app purchases” through the App Store or the Google Play Store. If you make an in-app purchase, you will be prompted to confirm your purchase. Then, you will be charged through your payment method at the price displayed for the Service or Items you selected and any other applicable sales or taxes that may be placed on your payment. Additionally, you need the relevant third-party account set up so they can charge you.\n\nIf you have a problem with a previous payment, the third-party account that charged you, such as the App Store or Google Play, should be contacted through their respective Customer Support. Additionally, your bank or payment provider can provide further information on your right to object and time limits.\n\nFrom time to time, you may be able to purchase, earn, or be given a non-sublicensable, non-transferable, limited, personal, revocable license to use "virtual items," including but not limited to digital currency. Hearts are units that are exchangeable on Swoop for virtual items or services. A Virtual Currency and Item balance does not mean you have any real-world balance or saved value. Virtual Items and Currency does not charge a fee for non-use. However, the license given to you will also terminate if this Agreement is violated, upon the termination of your account, or when Swoop is no longer accessible or maintained. In its sole discretion, Project Swoop LTD reserves the right to charge for the right to access or use Virtual Items and Virtual Currency. Swoop also reserves the right to distribute Virtual Items and Virtual Currency freely. Project Swoop LTD can manage, regulate, control, change, devalue, modify, or eliminate Virtual Items, Virtual Currency, or their peripherals at any time. Project Swoop LTD or any other third party has no liability in the case that Project Swoop LTD takes an action outlined above. ALL PURCHASES OR REDEMPTIONS OF VIRTUAL ITEMS OR CURRENCY ARE FINAL AND NON-REFUNDABLE ON SWOOP. You will be given the items or currency immediately upon your purchase. YOU ACKNOWLEDGE THAT PROJECT SWOOP LTD WILL NOT AND IS NOT REQUIRED TO PROVIDE A REFUND FOR ANY REASON. YOU WILL NOT RECEIVE ANY COMPENSATION, MONETARY OR OTHER, IF YOU LOSE ACCESS TO YOUR PURCHASED OR UN-PURCHASED DIGITAL ITEMS OR CURRENCY REGARDLESS OF WHETHER THEY WERE UNUSED, PROJECT SWOOP LTD CLOSES SWOOP, OR YOUR ACCOUNT IS CLOSED REGARDLESS OF IF IT WAS INVOLUNTARY OR VOLUNTARY. CURRENCY DOES NOT CORRELATE TO A REAL-WORLD BALANCE OR VALUE.\n\nThe purchase of Virtual Items or Digital Currency is FINAL and NON-REFUNDABLE. You cannot cancel a purchase or order of Virtual Items or Digital Currency, meaning once you explicitly consent and acknowledge your purchase, you lose your right of cancellation and any refund. Please refer to our No Refund Policy for more details.\n\nThe use of digital currency within the app is NON-CANCELLABLE, FINAL, AND NON-REFUNDABLE once you click a button or perform another action denoting that you acknowledge and consent to spending the digital currency whether or not you have fully read the details of the action you are taking. In addition, this is not a real-world transaction but simply using Virtual Items.\n\nSwoop operates a business, and our pricing, including but not limited to the pricing of Virtual Items, may vary based upon, but not limited to promotional rates, region, bundle size, and more.',
    },
    {
      headline: "No Refund Policy",
      text: "Google Play or the App Store handles your purchase, depending on your device. To make a purchase on Swoop, you must have an account on your respective platform. Please read the terms and conditions of these platforms to better understand their policies that apply to purchases through our app. Swoop provides the purchased virtual items; however, the platform handles your payment. The LINKMARKERhttps://www.apple.com/uk/legal/internet-services/itunes/uk/terms.htmlREFDIVApp Store’s Refund PolicyLINKMARKER and LINKMARKERhttps://support.google.com/googleplay/answer/2479637?ctx=7659581&visit_id=636923806604702476-265013927&rd=2&co=GENIE.Platform&oco=1&hl=en-GBREFDIVGoogle Play’s PolicyLINKMARKER are available here.\n\nSwoop has a no-refund policy and does not offer a right to withdraw your purchase of Digital Items or other paid services. The paid services and items are provided upon purchase, even in the case of non-use, so no refund or compensation can be granted. When you make a purchase, you agree to immediately have use of the Service or Items and waive the right to cancel or withdraw in regards to this purchase.",
    },
    {
      headline: "Reports",
      text: "Notice and Procedure for Making Claims of Copyright Infringement. If you think that your profile or work has been copied by another member or someone else has used your likeness in their profile, please submit a detailed email report to customersupport@projectswoop.com. This report should include:\n\u2022An electronic signature of the person acting on behalf of the user who believes their copyright has been infringed\n\u2022A description of the work that has been copied and where on Swoop it is located\n\u2022Your name and email that are connected to the app, as well as any personal contact for correspondence\n\u2022The display name and email of the user on the app that you think has copied you\n\u2022A written statement that you have good and reasonable faith that the accused user copied your work and it is unauthorized by the owner or the law\n\u2022A statement from you asserting that the information provided in your report is accurate and that you have the authorization to act on behalf of the copyright owner or are the owner; FALSE TESTAMENTS ARE PUNISHABLE UNDER PENALTY OF PERJURY\nProject Swoop LTD reserves the right to terminate or ban accused infringers' accounts. If you believe you have been falsely accused or unjustly banned, don't hesitate to contact customersupport@projectswoop.com, but this does not imply your accusation or punishment will be changed or dropped.\n\nUser reports. To ensure Swoop can take appropriate action on your behalf, reports of users must be detailed, informative, descriptive, and accurate. If they aren't, you may be held accountable for the user's infringement of these rules. If you believe another member has violated your rights, is impersonating someone, is performing malicious actions, or in any other way is harmful to Swoop or the Swoop community, please report the user through the app or at customersupport@projectswoop.com. Make sure to include your contact information and means to identify the identity of the other user.",
    },
    {
      headline: "Disclaimers",
      text: "PROJECT SWOOP LTD PROVIDES SWOOP EXCLUSIVELY FOR UK HS STUDENTS ON AN “AS IS” AND “AS AVAILABLE” BASIS. PROJECT SWOOP LTD GRANTS NO GUARANTEES, PROMISES, OR WARRANTIES OF ANY KIND REGARDING SWOOP OR PERIPHERALS OF SWOOP MEANING PROJECT SWOOP LTD DOES NOT ASSUME, GUARANTEE, OR IMPLY THE CONTINUOUS FUNCTIONALITY, LACK OF ERRORS, ACCESSIBILITY, OR PERFORMANCE OF SWOOP. \n\nCONTENT ON THE APP IS NOT THE RESPONSIBILITY OF SWOOP, AND IT IS NOT ASSUMED OR IMPLIED THAT IT WILL BE SAFE, ACCURATE, COMPLETE, OR IN YOUR BEST INTEREST. CONTENT IS THE RESPONSIBILITY OF THE THIRD PARTY OR USER THAT POSTS, SENDS, DOWNLOADS, RECEIVES, UPLOADS, OR OTHERWISE INTERACTS WITH IT AND IT IS NOT THE RESPONSIBILITY OF SWOOP. INFORMATION AND CONTENT ARE ACCESSED AT YOUR DISCRETION, AND SWOOP CANNOT BE HELD LIABLE.",
    },
    {
      headline: "Third Party Services",
      text: "Swoop may contain promotions or advertisements offered or sponsored by third parties. The app may contain links to external websites or content. Swoop is not responsible for these third-party sites or services' availability, functionality, or content. Swoop is not responsible or liable for any third parties' content, actions, terms, or other malicious interactions between you and them. Your interactions with third parties are governed by their terms and not ours.",
    },
    {
      headline: "Limitation of Liability",
      text: "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, PROJECT SWOOP LTD OR ITS EMPLOYEES UNDER NO CIRCUMSTANCES CAN BE HELD RESPONSIBLE OR LIABLE FOR ANY INDIRECT, INCIDENTAL, DIRECT, OR ANY OTHER FORMS OF DAMAGES, LOSSES, OR OTHER PROBLEMS CREATED BY YOUR ACCESS TO SWOOP, THE CONDUCT OR ACTIONS OF OTHER USERS ON SWOOP, LOSS OF DATA, CONDUCT OF THIRD PARTIES, UNAUTHORIZED ACCESS OF SWOOP EVEN IF PROJECT SWOOP LTD IS AWARE, ANY OTHER CONTENT ON SWOOP, OR ANY OTHER EVENT THAT CREATES DISRUPTION ON SWOOP. IN NO CIRCUMSTANCES WILL SWOOP’S AGGREGATE LIABILITY TO YOU EXCEED THE AMOUNT YOU HAVE SPENT ON THE SERVICE WHILE YOU HAVE AN ACCOUNT THAT IS NOT BANNED.\n\nANY UK JURISDICTION THAT PROHIBITS THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES DOES NOT APPLY TO YOU.",
    },
    {
      headline: "Settling Disputes",
      text: "Disputes with Swoop should be settled outside of court between the party and Project Swoop LTD. By using Swoop, you waive the right to take Project Swoop LTD to court. However, all legal disputes are resolved under UK law.",
    },
    {
      headline: "Indemnity by You",
      text: "You agree that you will protect, defend, and hold harmless Swoop, their employees, and their affiliates as permitted under applicable law against all complaints, reports, liabilities, problems, expenses, and damages coming from the use or event related to Swoop, your content, or your failure to follow this Agreement.       ",
    },
    {
      headline: "Entire Agreement; Other",
      text: "This Agreement includes the Terms and Conditions, Privacy Policy, Cookie Policy, Safety Tips, Community Guidelines, and any other additional terms disclosed by Project Swoop LTD. This Agreement is the entire Agreement between you and Project Swoop LTD regarding using Swoop. If any article in this Agreement is invalid due to law or other reasons, the other provisions will remain in full effect. Swoop is not required to enforce this Agreement, but you must abide by it. You agree and consent that your Swoop account is non-transferable and all rights to your account, its currency, and its Content terminate upon July 15th of your high school graduation year or upon your 19th birthday, whichever comes first. This Agreement doesn’t represent any partnership or special relationship between you and Project Swoop LTD; you or your actions do not reflect us.      ",
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
            mode={"terms"}
            signInNeed={false}
            setSignInPage={setSignInPage}
          />
          <div className="flex-grow overflow-auto w-full">
            <>
              <div className="min-h-[90%] w-full flex flex-col p-1 pt-4">
                <div className="flex flex-col w-full justify-start items-center p-1">
                  <div className={poppinsSemi.className}>
                    <h1 className="text-white text-4xl text-center">
                      Terms and Conditions
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
export default Terms;
