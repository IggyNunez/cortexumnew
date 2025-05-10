import { motion } from "framer-motion";

const ClientLogos = () => {
  const clients = [
    {
      name: "A&E",
      logo: "A&E"
    },
    {
      name: "Jamil Damji Real Estate Expert",
      logo: "JD"
    },
    {
      name: "Bommorito Performance",
      logo: "BP"
    },
    {
      name: "FormRx",
      logo: "Rx"
    },
    {
      name: "Cortexuum",
      logo: "CX"
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-center text-gray-500 text-lg mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Trusted by forward-thinking brands and agencies
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {clients.map((client, index) => (
            <motion.div 
              key={index} 
              className="flex items-center justify-center h-16"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <span className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {client.logo}
                </span>
                <span className="text-sm text-gray-500 mt-2">{client.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;