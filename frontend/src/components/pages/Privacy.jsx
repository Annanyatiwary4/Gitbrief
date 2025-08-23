import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 py-12">
        <Link
        to="/"
        className="mt-10 flex items-center gap-2 text-sm px-4 py-2  text-gray-200">
        <ArrowLeft size={16} /> Back to Home
      </Link>
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="show"
        variants={fadeInUp}
      >
        
        {/* Page Header */}
        <h1 className="text-4xl font-bold text-white mb-6">Privacy Policy</h1>
        <p className="text-lg mb-8 text-gray-400">
          Your privacy is important to us. This policy explains how GitBrief
          collects, uses, and safeguards your data.
        </p>

        {/* Sections */}
        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">
            1. Information We Collect
          </h2>
          <p className="text-gray-400">
            We only collect data necessary to authenticate with GitHub and
            provide repository insights. Your GitHub password is never stored or
            accessed by us.
          </p>
        </motion.section>

        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">
            2. Use of Data
          </h2>
          <p className="text-gray-400">
            Your data is used solely to display repository information and
            provide personalized features. We will never sell or share your data
            with third parties.
          </p>
        </motion.section>

        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">3. Cookies</h2>
          <p className="text-gray-400">
            We may use cookies for session handling and to ensure a smoother
            login experience.
          </p>
        </motion.section>

        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">4. Security</h2>
          <p className="text-gray-400">
            We take appropriate measures to protect your data. However, due to
            the nature of the internet, complete security cannot be guaranteed.
          </p>
        </motion.section>

        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">5. Changes</h2>
          <p className="text-gray-400">
            We may update this privacy policy from time to time. Continued use
            of GitBrief indicates your acceptance of the updated policy.
          </p>
        </motion.section>

        {/* Contact Link */}
        <p className="mt-8 text-gray-400">
          Questions?{" "}
          <Link to="/contact" className="text-blue-500 hover:underline">
            Contact us
          </Link>
          .
        </p>

        {/* Back Button */}
        
      </motion.div>
    </div>
  );
}
