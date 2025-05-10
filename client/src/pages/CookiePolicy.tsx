import { motion } from "framer-motion";
import LegalHeader from "@/components/LegalHeader";

const CookiePolicy = () => {
  return (
    <div className="bg-white">
      <LegalHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              <strong>Last Updated: May 10, 2025</strong>
            </p>
            
            <h2>1. Introduction</h2>
            <p>
              This Cookie Policy explains how VibeMarketingAgency.ai ("we," "our," or "us") uses cookies and similar technologies on our website to enhance your browsing experience, analyze website traffic, and personalize content.
            </p>

            <h2>2. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They allow the website to recognize your device and remember certain information about your visit, such as your preferences and actions on the site.
            </p>
            
            <h2>3. Types of Cookies We Use</h2>
            
            <h3>3.1 Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
            </p>
            
            <h3>3.2 Performance Cookies</h3>
            <p>
              These cookies collect information about how visitors use our website, such as which pages they visit most often. They help us improve how our website works by gathering and providing information on aspects such as engagement with our content.
            </p>
            
            <h3>3.3 Functionality Cookies</h3>
            <p>
              These cookies allow the website to remember choices you make (such as your preferred language or region) and provide enhanced, more personal features. They may also be used to provide services you have asked for.
            </p>
            
            <h3>3.4 Marketing Cookies</h3>
            <p>
              These cookies are used to track visitors across websites. They are set to display targeted advertisements based on your interests and online behavior. They also help measure the effectiveness of advertising campaigns.
            </p>

            <h2>4. Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third parties on our website. These third parties may include analytics providers (like Google Analytics), advertising networks, and social media platforms. These third parties may use cookies, web beacons, and similar technologies to collect information about your use of our website and other websites.
            </p>

            <h2>5. How We Use Cookies</h2>
            <p>We use cookies for various purposes, including:</p>
            <ul>
              <li>To provide and maintain our website's functionality</li>
              <li>To analyze how users interact with our website</li>
              <li>To improve our website and services</li>
              <li>To personalize your experience</li>
              <li>To remember your preferences</li>
              <li>To deliver relevant advertisements</li>
              <li>To measure the effectiveness of our marketing campaigns</li>
            </ul>

            <h2>6. Your Cookie Choices</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can generally accept, reject, or delete cookies through your browser settings. However, removing or rejecting cookies may affect the availability and functionality of our website.
            </p>
            
            <p>
              You can also opt out of certain third-party cookies through these mechanisms:
            </p>
            <ul>
              <li>Digital Advertising Alliance (DAA): <a href="http://www.aboutads.info/choices/" className="text-primary hover:underline">http://www.aboutads.info/choices/</a></li>
              <li>European Interactive Digital Advertising Alliance (EDAA): <a href="http://www.youronlinechoices.eu/" className="text-primary hover:underline">http://www.youronlinechoices.eu/</a></li>
              <li>Network Advertising Initiative (NAI): <a href="http://optout.networkadvertising.org/" className="text-primary hover:underline">http://optout.networkadvertising.org/</a></li>
            </ul>

            <h2>7. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. We will post the updated Cookie Policy on this page with a new "Last Updated" date.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Cookie Policy or our use of cookies, please contact us at:
            </p>
            <p>
              VibeMarketingAgency.ai<br />
              Email: privacy@vibemarketingagency.ai
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicy;