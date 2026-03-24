import React from 'react';
import { motion } from 'motion/react';
import { Search, Phone, CalendarCheck, Truck, Flame } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Select Puja',
      icon: <Search className="w-8 h-8 text-[#FF6F00]" />,
    },
    {
      id: 2,
      title: 'Talk To Acharya Ji',
      desc: 'For Muhurt And Information On Puja',
      icon: <Phone className="w-8 h-8 text-[#FF6F00]" />,
    },
    {
      id: 3,
      title: 'Book Your Puja',
      icon: <CalendarCheck className="w-8 h-8 text-[#FF6F00]" />,
    },
    {
      id: 4,
      title: 'Samagri Delivery',
      icon: <Truck className="w-8 h-8 text-[#FF6F00]" />,
    },
    {
      id: 5,
      title: 'Acharya-Ji Performs Puja',
      desc: 'At Your Location',
      icon: <Flame className="w-8 h-8 text-[#FF6F00]" />,
    }
  ];

  return (
    <section className="py-16 md:py-18 bg-[#FAFAFA] border-y border-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
          >
            How <span className="text-[#FF6F00]">Vaidik Pooja</span> Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-3xl mx-auto"
          >
            Your trusted platform for sacred rituals, guided by certified Vedic Acharyas and powered by technology for a seamless spiritual experience.
          </motion.p>
        </div>

  <div className="relative mt-12 md:mt-14">
          {/* Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-13 left-[10%] right-[10%] h-1 bg-linear-to-r from-orange-100 via-orange-300 to-orange-100 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="relative mb-6">
                  {/* Circle background */}
                  <div className="w-28 h-28 bg-orange-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl shadow-orange-900/5 group-hover:scale-105 group-hover:bg-[#FF6F00] group-hover:border-orange-100 transition-all duration-300">
                    <div className="group-hover:text-white transition-colors duration-300 [&>svg]:text-inherit">
                      {React.cloneElement(step.icon, { className: "w-10 h-10 transition-colors duration-300 group-hover:text-white text-[#FF6F00]" })}
                    </div>
                  </div>
                  
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-[#FF6F00] text-[#FF6F00] rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                    {step.id}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
                  {step.title}
                </h3>
                {step.desc && (
                  <p className="text-sm text-gray-500 font-medium px-2">
                    {step.desc}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
