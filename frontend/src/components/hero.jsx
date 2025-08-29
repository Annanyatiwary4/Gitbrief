"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "./ui/sparkles";
import FeaturesSectionDemo from "./features";
import { Link,useNavigate } from "react-router-dom";

export default function HeroSectionGitBrief() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-black text-white">

      <Navbar />
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      
      {/* Left Gradient Line */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Right Gradient Line */}
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="px-4 py-10 md:py-20 text-center">
        {/* Hero Title */}
        <h1 className="relative z-10 mx-auto max-w-4xl text-2xl font-bold md:text-4xl lg:text-6xl">
          {"Manage your Git repositories effortlessly with GitBrief"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: "easeInOut" }}
                className="mr-2 inline-block text-white"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-lg text-neutral-300"
        >
          Track, summarize, and analyze your Git projects seamlessly. GitBrief
          helps you stay organized, save time, and focus on what matters.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/signup">
          <button className="w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500">
            Get Started
          </button>
          </Link>
          
        </motion.div>

        {/* Preview Image */}
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="relative z-10 mt-20 rounded-3xl border border-neutral-800 bg-neutral-900 p-4 shadow-md"
          >
            <div className="w-full overflow-hidden rounded-xl border border-neutral-700">
              <section className="py-20 bg-black">
                <div className="max-w-6xl mx-auto px-6 text-center">
                  <h2 className="text-4xl text-blue-50 font-bold mb-4">Why Choose GitBrief?</h2>
                  <p className="text-blue-100 mb-12">
                    GitBrief makes it easier for developers to showcase their work.
                  </p>
                  <FeaturesSectionDemo />
                </div>
              </section>
            </div>
          </motion.div>


            </div>
    </div>
  );
}

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="flex w-full items-center justify-between border-t border-b border-neutral-800 px-4 py-4">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
        <h1 className="text-base font-bold md:text-2xl">GitBrief</h1>
      </div>
    </nav>
  );
};
