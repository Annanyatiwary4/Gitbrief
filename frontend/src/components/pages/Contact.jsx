import React from "react";
import WorldMap from "../ui/world-map";
import { Card } from "../ui/card";
         // Import your reusable Card component

const Contact = () => {
  return (
    <div className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      {/* Full-screen World Map */}
      <div className="absolute inset-0 z-0">
        <WorldMap />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Heading */}
        <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Wanna Chat? Drop Us a Line!</h2>
            <p className="mt-2 text-xl text-neutral-400">
                We're all ears and ready to hear from you.
            </p>
            </div>

        {/* Contact Form inside Card */}
        <Card className="w-full max-w-md bg-neutral-900/80 backdrop-blur-md border border-neutral-800 shadow-lg rounded-2xl p-6">
            <form className="space-y-5">
                {/* Name */}
                <div>
                <label className="block text-sm text-neutral-400 mb-1">Name</label>
                <input
                    type="text"
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200 placeholder-neutral-500 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="Your Name"
                />
                </div>

                {/* Email */}
                <div>
                <label className="block text-sm text-neutral-400 mb-1">Email</label>
                <input
                    type="email"
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200 placeholder-neutral-500 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="your@email.com"
                />
                </div>

                {/* Message */}
                <div>
                <label className="block text-sm text-neutral-400 mb-1">Message</label>
                <textarea
                    rows="4"
                    className="w-full px-3 py-2.5 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-200 placeholder-neutral-500 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                    placeholder="Write your message..."
                />
                </div>

                {/* Button */}
                <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium tracking-wide
                            transition duration-200 shadow-md hover:shadow-blue-500/20"
                >
                Send Message
                </button>
            </form>
            </Card>

      </div>
    </div>
  );
};

export default Contact;