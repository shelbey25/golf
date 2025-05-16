import { Poppins } from "@next/font/google";
import Image from "next/image";
import { useState } from "react";

//340 by 690 px design

const poppinsHeavy = Poppins({ weight: "500", subsets: ["latin"] });
const poppinsSemi = Poppins({ weight: "400", subsets: ["latin"] });

const FAQ = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "What is Swoop?",
      answer:
        "Swoop is the first dating app designed for high schoolers. Swoop is committed to creating a positive and safe experience for all our users. Swoop is the next addition in the high school experience.",
      expanded: false,
      id: 1,
    },
    {
      question: "Is Swoop free?",
      answer:
        "Swoop is free to download on the App Store. Swoop offers essential functionality free of charge, however additional features can be purchased using hearts (in app currency which can be purchased for a fee) such as revealing new matches early.",
      expanded: false,
      id: 2,
    },
    {
      question: "How do I login to Swoop?",
      answer:
        "To login to swoop simply open the app and login with your school google email. You will then be able to access the community connected to your school.",
      expanded: false,
      id: 3,
    },
    {
      question: "Why do I have to use my school email?",
      answer:
        "We use school email for safety purposes. This provides another layer of security that encourages only HS students to use the app. This way we can also connect you with people at your school.",
      expanded: false,
      id: 4,
    },
    {
      question: "How can I set it up in my school?",
      answer:
        "To set up Swoop at your school you need ten boys and ten girls to register with their school email. As soon as this has happened the functionality of the app will start and you can get swooping.",
      expanded: false,
      id: 5,
    },
    {
      question: "How do I navigate Swoop?",
      answer:
        'Swoop has 5 main screens. The main screen is where you can edit your profile picture, update your matches early, and view or reveal matches. It also has the countdown timer until matches are updated for everyone at your school, which happens once a week. The page one to the right is the swiping page, where you can use your swipes to register whether you like a person or not. It also features a report button, which you should use to report users you believe violate our policies or terms. The far right page is where you can purchase tokens which can be used to enhance your Swoop experience. The page one left of the center is the dream match page. This is where monthly you can choose one person that is your "dream" and if you match we\'ll tell you instantly for free! On the far left page you can view upcoming promos and events, as well as, access your account information.',
      expanded: false,
      id: 6,
    },
    {
      question: "What is the age range of Swoop?",
      answer:
        "Swoop is designed exclusively for 14-18 year olds currently enrolled in High School.",
      expanded: false,
      id: 7,
    },
    {
      question: "How do I see my matches?",
      answer:
        'New matches will appear weekly on your home screen, but you can have them displayed earlier by clicking the Instant Update button and spending 200 tokens. Once matches appear, to view the identity of the person, you can click "Reveal Match" and spend 1000 tokens to have their name and information revealed.',
      expanded: false,
      id: 8,
    },
    {
      question: "How can I meet people from other schools?",
      answer:
        "Currently, you can only see people from your school, but Project Swoop Ltd is working to safely connect nearby schools in the future.",
      expanded: false,
      id: 9,
    },
  ]);
  const changer = (id: number) => {
    const newFaqs = faqs.map((faq) => {
      return faq.id === id ? { ...faq, expanded: !faq.expanded } : faq;
    });
    setFaqs(newFaqs);
  };
  return (
    <>
      <div className="min-h-[90%] w-full flex flex-col p-1 pt-4">
        <div className="flex flex-col w-full justify-start items-center p-1">
          <div className={poppinsSemi.className}>
            <h1 className="text-white text-4xl text-center">FAQs</h1>
          </div>
        </div>
        <div className="flex flex-col w-full h-full justify-start items-center p-1 gap-3 pt-4">
          {faqs.map((faq) => {
            return (
              <div className="w-full pr-16 pl-16 ">
                <button
                  key={faq.id}
                  className="p-2 border border-white w-full justify-between flex flex-row rounded-sm"
                  onClick={() => changer(faq.id)}
                >
                  <h1 className="text-white text-start">{faq.question}</h1>
                  <h1 className="text-white text-start pl-4">
                    {faq.expanded ? "˅" : ">"}
                  </h1>
                </button>
                {faq.expanded ? (
                  <>
                    <div className="h-1"></div>
                    <div className="bg-stone-500 w-full p-1 rounded-sm ">
                      <h1 className="text-white text-start">{faq.answer}</h1>
                    </div>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default FAQ;
