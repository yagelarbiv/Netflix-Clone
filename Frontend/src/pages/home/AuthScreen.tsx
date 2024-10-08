import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "What is Netflix?",
    answer:
      "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.\n You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
  },
  {
    question: "How much does Netflix cost?",
    answer:
      "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from EUR 7.99 to EUR 11.99 a month. No extra costs, no contracts.",
  },
  {
    question: "Where can I watch?",
    answer:
      "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.\n You can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
  },
  {
    question: "How do I cancel?",
    answer:
      "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
  },
  {
    question: "What can I watch on Netflix?",
    answer:
      "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
  },
  {
    question: "is Netflix good for kids?",
    answer:
      "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space.\n Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
  },
];

const AuthScreen = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  localStorage.removeItem("footer");

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (email.trim() !== "") {
      e.preventDefault();
      localStorage.setItem("email", email);
      navigate("/registration?email");
    }
    else {
      alert("Please enter a valid email address.");
    }
  };

  return (
    <div className="hero-bg relative">
      {/* Navbar */}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="../../public/netflix-logo.png"
          alt="Netflix Logo"
          className="w-32 md:w-52"
        />
        <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">
          Sign In
        </Link>
      </header>

      {/* Hero section */}
      <div className="flex flex-col items-center justify-center text-center py-20 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Unlimited movies, TV shows, and more
        </h1>
        <p className="text-lg mb-4">Watch anywhere. Cancel anytime.</p>
        <p className="mb-4">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="email"
            placeholder="Email address"
            className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
            Get Started
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>

      {/* Separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 1st section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Enjoy on your TV
            </h2>
            <p className="text-lg md:text-xl">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </p>
          </div>
          {/* Right side */}
          <div className="flex-1 relative">
            <img src="../../public/tv.png" alt="Tv image" className="mt-4 z-20 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="../../public/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 2nd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1 relative">
            <div className="relative">
              <img
                src="../../public/stranger-things-lg.png"
                alt="Stranger Things img"
                className="mt-4"
              />
              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2">
                <img
                  src="../../public/stranger-things-sm.png"
                  alt="image"
                  className="h-full"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      Stranger Things
                    </span>
                    <span className="text-sm text-blue-500">
                      Downloading...
                    </span>
                  </div>
                  <img src="../../public/download-icon.gif" alt="" className="h-12" />
                </div>
              </div>
            </div>
          </div>
          {/* Right side */}
          <div className="flex-1 md:text-left text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              Download your shows to watch offline
            </h2>
            <p className="text-lg md:text-xl">
              Save your favorites easily and always have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* Separator */}
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 3rd section */}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Watch everywhere
            </h2>
            <p className="text-lg md:text-xl">
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </p>
          </div>
          {/* Right side */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="../../public/device-pile.png"
              alt="Device image"
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10 max-w-[63%]"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="../../public/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      {/* 4th section*/}
      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2">
          {/* Left */}
          <div className="flex-1 relative">
            <img src="../../public/kids.png" alt="Enjoy on your TV" className="mt-4" />
          </div>
          {/* Right */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Create profiles for kids
            </h2>
            <p className="text-lg md:text-xl">
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </p>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />

      <div className="flex py-[72px] items-center justify-center min-h-screen bg-black text-white">
        <div className="w-full p-6 bg-[#000000] shadow-lg">
          <h2 className="text-6xl font-black mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-1 pl-32 pr-36">
            {faqData.map((faq, index) => (
              <div key={index}>
                <button
                  className="flex justify-between items-center w-full h-24 p-4 bg-[rgb(45,45,45)] text-white focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-2xl">{faq.question}</span>
                  <span>
                    {activeIndex === index ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        role="img"
                        data-icon="PlusLarge"
                        aria-hidden="true"
                        className=" rotate-45 elj7tfr3 default-ltr-cache-1dpnjn e164gv2o4"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z"
                          fill="currentColor"
                        ></path>
                      </svg> // This is the close icon
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        role="img"
                        data-icon="PlusLarge"
                        aria-hidden="true"
                        className="elj7tfr3 default-ltr-cache-1dpnjn e164gv2o4"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17 17V3H19V17H33V19H19V33H17V19H3V17H17Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    )}
                  </span>
                </button>
                {activeIndex === index && (
                  <div className="p-4 text-2xl bg-[rgb(45,45,45)] mt-px text-white">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center mt-[2.85rem] bg-black text-white">
            <form onSubmit={handleFormSubmit}>
              <p className="text-xl mb-4">
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>
              <div className="flex items-center text-left relative my-4 mx-auto w-full max-w-[36.625rem]">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-grow w-full ml p-4 text-black rounded-md border bg-[rgb(25,25,25)] border-gray-400 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button className=" w-72 p-4 ml-2 bg-[rgb(229,9,20)] font-bold text-2xl text-white rounded-md hover:bg-red-700">
                  Get Started &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="h-2 w-full bg-[#232323]" aria-hidden="true" />
    </div>
  );
};

export default AuthScreen;
