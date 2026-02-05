import { motion } from "framer-motion";
import LegalHeader from "@/components/LegalHeader";
import DesignerFooter from "@/components/DesignerFooter";

const Terms = () => {
  return (
    <div className="bg-white">
      <LegalHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              <strong>Last Updated: May 10, 2025</strong>
            </p>
            
            <p>
              Please read these Terms and Conditions ("Terms") carefully before using the PlainTalk Developers website and services operated by PlainTalk Developers.
            </p>
            
            <p>
              Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
            </p>
            
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
            </p>

            <h2>1. Services</h2>
            <p>
              PlainTalk Developers offers AI-powered marketing solutions for marketing agencies and businesses, including but not limited to AI chatbots, content creation, workflow automation, and strategic consulting.
            </p>

            <h2>2. Use of Service</h2>
            <p>
              You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul>
              <li>Use the service in any way that violates any applicable law or regulation.</li>
              <li>Attempt to interfere with the proper functioning of the service.</li>
              <li>Engage in any conduct that restricts or inhibits anyone's use of the service.</li>
              <li>Use the service to transmit any material that is unlawful, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable.</li>
              <li>Attempt to gain unauthorized access to our systems or user accounts.</li>
            </ul>

            <h2>3. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of PlainTalk Developers and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
            </p>
            
            <p>
              Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of PlainTalk Developers.
            </p>

            <h2>4. AI Technology and Voice Synthesis</h2>
            <p>
              Our Service utilizes artificial intelligence and voice synthesis technology powered by third-party providers. By using our Service, you acknowledge that:
            </p>
            <ul>
              <li>AI-generated content may not always be accurate or appropriate for all contexts.</li>
              <li>Voice synthesis technology is used to provide voice responses and may process text inputs for this purpose.</li>
              <li>You will not use our AI capabilities for generating content that violates these Terms or applicable laws.</li>
            </ul>

            <h2>5. User Content</h2>
            <p>
              When you submit content to our Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute that content in connection with providing our Service.
            </p>
            
            <p>
              You represent and warrant that you own or have the necessary rights to the content you submit, and that such content does not violate the rights of any third party.
            </p>

            <h2>6. Subscription and Payment</h2>
            <p>
              Some of our services require payment through a subscription model. By subscribing to a paid service, you agree to pay all fees associated with the plan you choose. We reserve the right to change our pricing and subscription models with appropriate notice.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall PlainTalk Developers, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul>
              <li>Your access to or use of or inability to access or use the Service;</li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any content obtained from the Service; and</li>
              <li>Unauthorized access, use or alteration of your transmissions or content.</li>
            </ul>

            <h2>8. Disclaimer</h2>
            <p>
              Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page and updating the "last updated" date.
            </p>
            
            <p>
              Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              PlainTalk Developers<br />
              Email: dev@ignacionunez.dev
            </p>
          </div>
        </motion.div>
      </div>
      <DesignerFooter />
    </div>
  );
};

export default Terms;