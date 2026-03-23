import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function PujaVidhiCarousel() {
  const steps = [
    { 
      id: 1, 
      title: "1. Shuddhikaran", 
      desc: "The purification rituals that prepares the yajman (participant) to fully focus on the ceremony, ensuring mental and physical purity through..." 
    },
    { 
      id: 2, 
      title: "2. Swastivachan", 
      desc: "Peace mantras are recited to invoke blessings and establish a sacred atmosphere. This includes Swatyayan, Shanti Paath, Mangal Shlo..." 
    },
    { 
      id: 3, 
      title: "3. Sankalp (Sakam Or Nishkam)", 
      desc: "The yajman makes a vow or intention, explaining the purpose of doing this abhishek reciting the Hanuman Chalisa Path, which could be for..." 
    },
    { 
      id: 4, 
      title: "4. Kalash Puja And Sacred Element Worship", 
      desc: "Essential items like Kalash, Diya, Shankh, Ghanta and Dhoop-patra are worshipped to bring purity, light, sound, and sanctity to the ritual space." 
    },
    { 
      id: 5, 
      title: "5. Gauri Ganesh Puja", 
      desc: "Invoking the blessings of Goddess Gauri and Lord Ganesha to remove obstacles and ensure a smooth completion of the path, through divine grace..." 
    },
    { 
      id: 6, 
      title: "6. Main Rudrabhishek Puja", 
      desc: "Conducting the Abhishek with the sacred items and chanting Rudra mantras to purify and sanctify the space, invoking Lord Shiva's blessings." 
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else setCardsToShow(3);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Make sure current index is within bounds if screen resizes
  const totalDots = Math.max(1, steps.length - cardsToShow + 1);
  const safeIndex = Math.min(currentIndex, totalDots - 1);

  return (
    <section className="bg-[#FFF5eb] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Puja <span className="text-[#FF6F00]">Vidhi</span>
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden px-2 pb-8 pt-2">
            <motion.div 
              className="flex"
              animate={{ 
                x: `-${safeIndex * (100 / cardsToShow)}%` 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`flex-none px-4`}
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <div className="bg-white rounded-xl border border-orange-400 p-5 sm:p-6 h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                    <div>
                      <h3 className="text-[#FF6F00] text-lg font-bold mb-3">{step.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalDots }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === safeIndex 
                    ? 'bg-[#FF6F00] scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
