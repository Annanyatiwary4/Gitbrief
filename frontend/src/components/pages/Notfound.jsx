import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      setFade(false);
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFade(true);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-blue-950 via-black to-blue-950 text-blue-200 font-inter p-6">
      
      {/* 404 */}
      <h1 className="text-7xl md:text-9xl font-extrabold text-blue-500 mb-4">
        404
      </h1>

      {/* Subtitle */}
      <h2 className="text-2xl md:text-4xl font-bold mb-6 text-blue-200">
        Lost in the digital abyss?
      </h2>

      {/* Quote */}
      <p
        className={`text-lg md:text-2xl italic mb-8 text-blue-400 transition-opacity duration-500 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        {quotes[quoteIndex]}
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="/"
          className="inline-block bg-blue-600 text-white font-semibold text-lg py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Back to Home
        </a>
        <Link to ="/contact"
          className="inline-block border border-blue-500 text-blue-300 font-semibold text-lg py-3 px-8 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Report Issue
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
