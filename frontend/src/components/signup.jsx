"use client";
import React, { useState } from "react";
import { Github, KeyRound } from "lucide-react";

export default function Signup() {
  const [repoUrl, setRepoUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleGithubSignup = () => {
    console.log("Redirecting to GitHub OAuth...");
    window.location.href = `http://localhost:5000/auth/github`;
  };

  const handleDirectSignup = (e) => {
    e.preventDefault();
    console.log("Direct signup with:", { repoUrl, accessToken });

    // You’d call your backend here
    // fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/direct`, { ... })
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4">
      <div className="shadow-xl w-full max-w-md rounded-2xl bg-zinc-950 p-8 border border-zinc-800">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-blue-100 text-center">
          Create your GitBrief Account
        </h2>
        <p className="mt-2 text-sm text-neutral-400 text-center">
          Connect with GitHub or use your repo + access token directly.
        </p>

        {/* GitHub Signup Button */}
        <div className="mt-8 flex flex-col space-y-4">
          <button
            onClick={handleGithubSignup}
            className="group/btn relative flex h-12 w-full items-center justify-center space-x-2 rounded-md 
                       bg-blue-700 px-4 font-medium text-white shadow-lg 
                       hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition cursor-pointer"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm">Sign up with GitHub</span>
            <BottomGradient />
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-zinc-700"></div>
          <span className="px-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-zinc-700"></div>
        </div>

        {/* Direct Signup Form */}
        <form onSubmit={handleDirectSignup} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Repo URL</label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/username/repo"
              className="w-full rounded-md bg-zinc-900 border border-zinc-700 px-3 py-2 text-gray-200 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-300">Access Token</label>
            <input
              type="password"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="Enter your GitHub access token"
              className="w-full rounded-md bg-zinc-900 border border-zinc-700 px-3 py-2 text-gray-200 
                         placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <button
            type="submit"
              className="group/btn relative flex h-12 w-full items-center justify-center space-x-2 rounded-md 
                         bg-blue-600 px-4 font-medium text-white shadow-lg 
                          hover:shadow-[0_0_15px_rgba(0,255,0,0.2)] transition cursor-pointer" >
                        <KeyRound className="h-5 w-5" />
                        <span className="text-sm">Fetch PR Details</span>
                        <BottomGradient />
            </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-400 hover:text-blue-300 font-medium transition"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span
      className="absolute inset-x-0 -bottom-px block h-px w-full 
                 bg-gradient-to-r from-transparent via-cyan-500 to-transparent 
                 opacity-0 transition duration-500 group-hover/btn:opacity-100"
    />
    <span
      className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 
                 bg-gradient-to-r from-transparent via-indigo-500 to-transparent 
                 opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100"
    />
  </>
);
