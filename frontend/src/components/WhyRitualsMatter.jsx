import React from 'react';
import { Heart, Sparkles, Feather, Users, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhyRitualsMatter() {
  const benefits = [
    {
      icon: <Feather className="text-amber-600" size={22} strokeWidth={1.5} />,
      title: "Mental Peace",
      desc: "Brings profound clarity and calmness to your mind amidst daily chaos."
    },
    {
      icon: <Sparkles className="text-amber-600" size={22} strokeWidth={1.5} />,
      title: "Positive Aura",
      desc: "Cleanses the environment and creates a deeply positive energy at home."
    },
    {
      icon: <Heart className="text-amber-600" size={22} strokeWidth={1.5} />,
      title: "Spiritual Connection",
      desc: "Strengthens your inner consciousness and connection with the divine."
    },
    {
      icon: <Users className="text-amber-600" size={22} strokeWidth={1.5} />,
      title: "Family Harmony",
      desc: "Promotes unity and instills traditional values across generations."
    }
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24 my-10 md:my-20 rounded-3xl md:rounded-[2.5rem] bg-gradient-to-br from-[#FCF9F2] to-[#FDFBF7] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-[#F2EAE0]">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-amber-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] bg-orange-50/50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* Left: Text & Grid Layout */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-8 md:space-y-12 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="flex items-center space-x-3 mb-2 justify-center lg:justify-start">
                <div className="h-[1px] w-8 md:w-12 bg-amber-500/50"></div>
                <span className="text-amber-700 font-medium tracking-widest text-xs md:text-sm uppercase text-center">The Significance</span>
                <div className="h-[1px] w-8 bg-amber-500/50 lg:hidden"></div>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight md:leading-[1.15] tracking-tight text-center lg:text-left">
                Why Rituals <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-600 block sm:inline">Matter</span>
              </h2>
              
              <div className="relative pl-5 md:pl-6 border-l-2 border-amber-200 py-1 md:py-2">
                <Quote className="absolute -top-2 -left-2 md:-top-3 md:-left-3 text-amber-100 rotate-180 w-6 h-6 md:w-8 md:h-8" />
                <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed font-light text-justify sm:text-left">
                  Vedic rituals are far more than ancient traditions—they are a sacred dialogue with the divine. Every mantra sung, every diya lit, and every offering made serves to purify your space, awaken your innermost peace, and invite enduring prosperity into your modern life.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-2 md:pt-4">
              {benefits.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group p-5 md:p-6 rounded-2xl bg-white border border-gray-100 shadow-sm md:shadow-none hover:border-amber-100 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300 transform hover:-translate-y-1 flex flex-col sm:block items-center text-center sm:text-left"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-3 md:mb-5 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-xs md:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Premium Image Layout */}
          <div className="lg:col-span-5 relative h-[400px] sm:h-[450px] md:h-[500px] lg:h-[650px] w-full rounded-2xl lg:rounded-tr-[3rem] lg:rounded-bl-[3rem] lg:rounded-tl-3xl lg:rounded-br-3xl overflow-hidden mt-6 lg:mt-0 shadow-xl lg:shadow-2xl order-1 lg:order-2 bg-[#1C1714]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="absolute inset-0 group flex items-center justify-center"
            >
              <img 
                src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1200&auto=format&fit=crop" 
                alt="Divine Indian pooja setup" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-[1.03]"
                style={{ objectPosition: 'center' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://imagedelivery.net/IEMzXmjRvW0g933AN5ejrA/assetsbulletsitefiles-2f162711-3947-8060-a0c8-c3d421b0b25f-attachment8db9c8a0-5e4a-4209-9452-5c9fe131cd8bimage_1jpeg/public";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#110e0c]/90 via-[#110e0c]/20 to-transparent opacity-80 pointer-events-none"></div>
              
              {/* Overlay Float Card */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 bg-white/95 lg:bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-xl md:rounded-2xl shadow-xl lg:transform lg:translate-y-4 lg:opacity-0 transition-all duration-500 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 border border-amber-50">
                <p className="text-amber-900 text-xs sm:text-sm font-medium leading-relaxed md:leading-loose text-center">
                  "Every pooja kit is a carefully assembled step towards your spiritual journey."
                </p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}