import { motion } from "framer-motion";
import { Agency } from "@/types";

const agencies: Agency[] = [
  { id: "1", name: "AgencyOne" },
  { id: "2", name: "DigiGrowth" },
  { id: "3", name: "EvoMedia" },
  { id: "4", name: "MarketPro" },
  { id: "5", name: "PixelForce" },
];

const TrustedBySection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-gray-600">TRUSTED BY MARKETING AGENCIES WORLDWIDE</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center opacity-70">
          {agencies.map((agency, index) => (
            <motion.div 
              key={agency.id}
              className="grayscale hover:grayscale-0 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="h-12 flex items-center justify-center">
                <span className="text-3xl font-heading font-bold text-gray-700">{agency.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
