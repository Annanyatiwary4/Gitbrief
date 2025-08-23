import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
        <h1 className="text-4xl font-bold text-white mb-6">Terms of Service</h1>
        <p className="text-lg mb-8 text-gray-400">
          Please read these Terms of Service ("Terms") carefully before using <span className="text-white font-medium">GitBrief</span>.  
          By accessing or using our platform, you agree to these Terms. If you do not agree, please discontinue use immediately.
        </p>

        {/* Section 1 */}
        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">1. Acceptance of Terms</h2>
          <p className="text-gray-400">
            By creating an account or using GitBrief, you confirm that you are at least 13 years old 
            and have the legal capacity to enter into these Terms. If you are using GitBrief on behalf 
            of an organization, you agree that you have the authority to bind that organization.
          </p>
        </motion.section>

        {/* Section 2 */}
        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">2. Use of Service</h2>
          <p className="text-gray-400 mb-2">
            You agree to use GitBrief only for lawful purposes and in compliance with all applicable laws.  
            Prohibited uses include (but are not limited to):
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-1">
            <li>Attempting to gain unauthorized access to any systems or accounts.</li>
            <li>Uploading malicious code, viruses, or harmful content.</li>
            <li>Impersonating another person or misrepresenting your affiliation.</li>
            <li>Using the platform in a way that disrupts or harms other users.</li>
          </ul>
        </motion.section>

        {/* Section 3 */}
        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">3. Accounts & Security</h2>
          <p className="text-gray-400">
            You are responsible for maintaining the confidentiality of your account credentials 
            (including API tokens or GitHub login). GitBrief is not liable for any loss or damage 
            resulting from unauthorized access to your account.
          </p>
        </motion.section>

        {/* Section 4 */}
        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">4. Intellectual Property</h2>
          <p className="text-gray-400">
            All content, branding, and functionality of GitBrief are protected by intellectual 
            property laws. You retain ownership of your code and repository data, but grant GitBrief 
            a limited license to process and display such information as needed for the service.
          </p>
        </motion.section>

        {/* Section 5 */}
        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">5. Termination</h2>
          <p className="text-gray-400">
            We may suspend or terminate your access if you violate these Terms or engage in behavior 
            that harms GitBrief, its users, or its reputation. You may also close your account at any time.
          </p>
        </motion.section>

        {/* Section 6 */}
        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">6. Limitation of Liability</h2>
          <p className="text-gray-400">
            GitBrief is provided "as is" without warranties of any kind. We are not responsible 
            for any indirect, incidental, or consequential damages resulting from the use of our services.
          </p>
        </motion.section>

        {/* Section 7 */}
        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">7. Governing Law</h2>
          <p className="text-gray-400">
            These Terms shall be governed by and construed in accordance with the laws of your 
            jurisdiction, without regard to conflict of law principles.
          </p>
        </motion.section>

        {/* Section 8 */}
        <motion.section variants={fadeInUp} className="mb-8">
          <h2 className="text-2xl font-semibold mb-3 text-white">8. Changes to Terms</h2>
          <p className="text-gray-400">
            We reserve the right to modify or update these Terms at any time. Continued use of the service 
            after changes indicates your acceptance of the updated Terms.
          </p>
        </motion.section>

        <p className="text-sm text-gray-500 mt-12">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </motion.div>
    </div>
  );
};

export default TermsOfService;
