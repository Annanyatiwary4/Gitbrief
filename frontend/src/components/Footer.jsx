import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

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
              <li>Github</li>
              <li>Twitter</li>
              <li>LinkedIn</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-neutral-300 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

          {/* Register */}
          <div>
            <h3 className="font-semibold mb-3">Register</h3>
            <ul className="space-y-2 text-neutral-300 text-sm">
              <li>Sign Up</li>
              <li>Login</li>
             
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
