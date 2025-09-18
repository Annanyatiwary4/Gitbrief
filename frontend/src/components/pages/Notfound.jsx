import React, { useState, useEffect } from "react";

const NotFoundPage = () => {
  const quotes = [
    "Oops! It seems this page took a wrong turn at the last byte.",
    "Our hamsters are running, but this page isn't on the wheel.",
    "We looked everywhere. Under the virtual couch, behind the server... nada.",
    "This page is currently on a coffee break. Please try again later.",
    "The URL you requested has been abducted by aliens. We're working on a rescue mission.",
    "This is not the page you are looking for. (Jedi mind trick failed)",
    "Page not found. Did you check your pockets? It might be there.",
    "Even our site map got lost trying to find this page. It's a mystery!"
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // fade out
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFade(true); // fade in new quote
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-black text-gray-100 font-inter p-8 space-y-8">
      
      {/* 404 number with subtle floating animation */}
      <h1 className="text-8xl md:text-[10rem] font-extrabold text-blue-400 animate-[float_4s_ease-in-out_infinite]">
        404
      </h1>

      {/* Main message */}
      <h2 className="text-3xl md:text-5xl font-bold text-gray-100 text-center">
        Lost in the digital abyss?
      </h2>

      {/* Quote */}
      <p className={`text-lg md:text-2xl font-medium text-gray-200 italic text-center max-w-3xl transition-opacity duration-700 ${fade ? "opacity-100" : "opacity-0"}`}>
        {quotes[quoteIndex]}
      </p>

      {/* Back to homepage button */}
      <a
        href="/"
        className="mt-4 inline-block bg-blue-500 text-white font-semibold text-lg py-3 px-10 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
      >
        Back to homepage
      </a>

      {/* Floating animation keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
        `}
      </style>
    </div>
  );
};

export default NotFoundPage;
