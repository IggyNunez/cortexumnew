const ClientLogos = () => {
  const clients = [
    { name: "ACME Agency" },
    { name: "Digital Growth" },
    { name: "MarketBoost" },
    { name: "PromoGenius" },
    { name: "Ad Wizards" },
    { name: "FutureBrand" },
  ];

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-500 mb-8">Trusted by forward-thinking agencies worldwide</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
          {clients.map((client, index) => (
            <div key={index} className="h-10 flex items-center">
              <div className="font-bold text-gray-400">{client.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
