import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Import react-icons

const faqData = [
  {
    id: 1,
    question: "What is YouMovies??",
    answer:
      "YouMovies is a premium streaming service offering a vast collection of movies and TV shows. Enjoy unlimited entertainment with our flexible subscription plans.",
  },
  {
    id: 2,
    question: "What subscription plans do you offer?",
    answer:
      "We offer three plans: Basic (1 screen, HD), Premium (4 screens, Ultra HD), and Family (6 screens, Ultra HD with parental controls).",
  },
  {
    id: 3,
    question: "Can I watch movies offline?",
    answer:
      "Yes! You can download movies and shows on your device and watch them without an internet connection.",
  },
  {
    id: 4,
    question: "What devices can I stream on?",
    answer:
      "You can stream YouMovies on Smart TVs, laptops, tablets, mobile phones, and gaming consoles.",
  },
  {
    id: 5,
    question: "How can I cancel my subscription?",
    answer:
      "Currently, subscriptions cannot be canceled or paused. Your plan remains active until the end of the billing cycle.",
  },
  {
    id: 6,
    question: "Do you offer 4K Ultra HD streaming?",
    answer:
      "Yes! Our Premium and Family plans include 4K Ultra HD streaming with HDR support on compatible devices.",
  },
  {
    id: 7,
    question: "Can multiple people use the same account?",
    answer:
      "Yes! Our Premium and Family plans support multiple users with separate profiles for a personalized experience.",
  },
  {
    id: 8,
    question: "How do I change my password?",
    answer:
      "You can change your password by visiting the 'Account Settings' page and selecting 'Change Password'.",
  },
];

const Faq = () => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const handleClick = (id) => {
    setOpenAccordion(openAccordion === id ? null : id);
  };

  return (
    <div className="bg-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-6xl  text-white text-center mb-2 font-bold">FAQ</h1>
        <h2 className="text-3xl font-medium text-white text-center ">
          Frequently Asked Questions
        </h2>
        <hr className="my-2 border-0 h-0.5 w-24 mx-auto bg-gradient-to-r from-black/80 via-netflix-red to-black/80" />
        <div className="space-y-4 mt-6">
          {faqData.map(({ id, question, answer }) => (
            <div key={id} className="bg-gray-900 rounded-lg">
              <button
                className="w-full flex items-center justify-between p-4 text-white text-lg font-semibold bg-gray-800 rounded-lg hover:bg-netflix-red transition duration-300"
                onClick={() => handleClick(id)}
              >
                {question}
                <FaChevronDown
                  className={`transition-transform duration-300 ${
                    openAccordion === id ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
              {openAccordion === id && (
                <div className="p-4 text-gray-300 bg-gray-700 rounded-b-lg">
                  {answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
