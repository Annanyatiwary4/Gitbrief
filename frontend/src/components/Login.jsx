import React, { useState } from "react";
import { Github} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { Link } from "react-router-dom";


const Login = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;

    
  };

  const handleDirectAccess = async (e) => {
    e.preventDefault();
    if (!repoUrl || !accessToken) {
      alert("Please provide both Repo URL and Access Token");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/pr-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ repoUrl }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("PR Details:", data);
        // TODO: navigate to dashboard with PR details
      } else {
        alert("Invalid repo URL or token");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
       
      <Card className="w-full max-w-md shadow-xl p-6 bg-black rounded-2xl border border-neutral-800">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-50 font-semibold">
            Welcome Back to GitBrief
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6">
          {/* GitHub OAuth */}
          <div className="mt-4 w-full flex flex-col space-y-4">
            <button
              onClick={handleGithubLogin}
              className="group/btn relative flex h-12 w-full items-center justify-center space-x-2 rounded-md 
                         bg-blue-700 px-4 font-medium text-white shadow-lg 
                         hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition cursor-pointer"
            >
              <Github className="h-5 w-5" />
             <span className="text-sm">Continue with GitHub</span>
              <BottomGradient />
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-2 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>

          {/* Terms */}
          <p className="text-center text-sm text-gray-500">
            By continuing, you agree to GitBrief’s{" "}
            <a href="/terms" className="text-blue-400 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-400 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

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
