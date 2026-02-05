import { motion } from "framer-motion";
import LegalHeader from "@/components/LegalHeader";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white">
      <LegalHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              <strong>Last Updated: May 10, 2025</strong>
            </p>
            
            <h2>1. Introduction</h2>
            <p>
              PlainTalk Developers ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI marketing services.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, company information, and other details you provide through our contact forms or when requesting our services.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent on pages, and other browsing actions.</li>
              <li><strong>Communications:</strong> Records of correspondence if you contact us.</li>
              <li><strong>AI Interaction Data:</strong> Information collected when you interact with our AI chatbot, including conversation history and preferences.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including:</p>
            <ul>
              <li>To provide, maintain, and improve our services</li>
              <li>To respond to your inquiries and fulfill your requests</li>
              <li>To personalize your experience on our website</li>
              <li>To send you marketing communications about our services</li>
              <li>To train and improve our AI systems</li>
              <li>To comply with legal obligations</li>
            </ul>

            <h2>4. Third-Party Disclosure</h2>
            <p>
              We may share your information with service providers who perform services on our behalf, such as hosting providers, email service providers, and analytics providers. We may also disclose your information if required by law or to protect our rights.
            </p>

            <h2>5. AI Voice Technology and Data Processing</h2>
            <p>
              Our website uses advanced voice synthesis technology. When you interact with our voice-enabled AI assistant, your text inputs may be processed to generate voice responses. We ensure this data is processed securely and in accordance with applicable data protection laws.
            </p>

            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              Depending on your location, you may have rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us using the information provided below.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
              Our services are not directed to children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
            </p>

            <h2>9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p>
              PlainTalk Developers<br />
              Email: dev@ignacionunez.dev
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;