import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function SlidingFooter() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      setIsVisible(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isVisible ? 0 : "100%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 w-full z-50"
    >
      <Card className="w-full bg-black text-white rounded-4xl shadow-lg border-t border-neutral-800">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 p-10">
          {/* Logo + Copyright */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-white flex items-center justify-center">
                <span className="text-black font-bold">G</span>
              </div>
              <span className="font-semibold">GitBrief</span>
            </div>
            <p className="mt-4 text-sm text-neutral-400">
              © copyright GitBrief 2025. All rights reserved.
            </p>
          </div>

          {/* Socials */}
          <div>
              <h3 className="font-semibold mb-3">Socials</h3>
              <ul className="space-y-2 text-neutral-300 text-sm">
                <li>
                  <a 
                    href="https://github.com/Annanyatiwary4" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:annanyatiwary4@gmail.com"
                    className="hover:text-white transition"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a 
                    href="https://www.linkedin.com/in/annanyatiwary4" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>


          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-neutral-300 text-sm">
              <Link to ="/privacy" className ="space-y-4"><li>Privacy Policy</li></Link>
              <Link to ="/terms" className ="space-y-4"><li>Terms of Service</li></Link>
            </ul>
          </div>

          {/* Register */}
          <div>
            <h3 className="font-semibold mb-3">Register</h3>
            <ul className="space-y-2 text-neutral-300 text-sm">
              <Link to="/signup" className="space-y-4"><li>Sign Up</li></Link>
              <Link to="/login" className="space-y-4"><li>Login</li></Link>
             
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
