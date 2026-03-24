import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Star, Users, Quote } from 'lucide-react';
import ProductCard from '../components/ProductCard.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import PujaVidhiCarousel from '../components/PujaVidhiCarousel.jsx';

export default function HomePage({ products, onAddToCart, onNavigate }) {
  return (
    <div className="space-y-24 pb-24">
      <section className="relative min-h-screen flex items-center bg-[#4a2f22] pt-32 md:pt-40">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full"
            style={{
              // Simple warm gradient background (static, no animation)
              backgroundImage: 'linear-gradient(120deg, #a3461e 0%, #e25a1c 42%, #f8a033 72%, #ffc14d 100%)'
            }}
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-[#3a1c13]" />
          <div className="absolute inset-0 bg-linear-to-r from-black/30 via-black/8 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-1px bg-[#FF9933]" />
                <span className="text-[#FF9933] font-bold tracking-[0.4em] uppercase text-[10px]">The Essence of Vedic Wisdom</span>
              </div>
              <h1 className="text-6xl md:text-[96px] font-bold  text-[#FF9933] mb-10 leading-[0.95] tracking-tighter pr-4 md:pr-10">
                Sacred<br />
                <span className="text-white bg-clip-text">Rituals</span>
              </h1>
              <p className="text-xl text-white/60 mb-12 leading-relaxed font-light max-w-lg">
                Elevate your spiritual practice with authentic Vedic essentials, curated for the modern seeker of peace, divinity, and ancient wisdom.
              </p>
              <div className="flex flex-wrap gap-6">
                <button
                  onClick={() => onNavigate('items')}
                  className="group relative px-10 py-5 bg-[#FF6F00] text-white font-bold rounded-full overflow-hidden transition-all hover:pr-14 hover:bg-[#FF9933] shadow-2xl shadow-orange-900/40"
                >
                  <span className="relative z-10">Explore Collection</span>
                  <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300" size={20} />
                </button>
                <button
                  onClick={() => onNavigate('pandits')}
                  className="px-10 py-5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-md"
                >
                  Book Pandit Ji
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
              className="hidden lg:block relative"
            >
              <div className="relative z-10 w-full aspect-square rounded-full border border-white/5 p-16 animate-[spin_120s_linear_infinite]">
                <div className="w-full h-full rounded-full border border-white/10 border-dashed" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[85%] h-[85%] rounded-full overflow-hidden border-12 border-white/5 shadow-2xl relative group">
                  <img
                    src="https://merkabasacred.com/cdn/shop/articles/daily-sacred-rituals.jpg?v=1644712907&width=1200"
                    alt="Sacred Rituals"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-tr from-[#FF6F00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#FF6F00]/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#FF9933]/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/20"
        >
          <span className="text-[9px] uppercase tracking-[0.4em] mb-4 font-bold">Scroll to Discover</span>
          <div className="w-px h-16 bg-linear-to-b from-white/20 to-transparent" />
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: '100% Pure & Natural', desc: 'Our items are sourced directly from sacred forests and traditional artisans.', icon: <CheckCircle2 className="text-[#FF6F00]" size={32} /> },
            { title: 'Vedic Authenticity', desc: 'Every ritual kit is curated according to ancient scriptures and traditions.', icon: <Star className="text-[#FF6F00]" size={32} /> },
            { title: 'Verified Scholars', desc: 'Our pandits are certified scholars with years of experience in Vedic rituals.', icon: <Users className="text-[#FF6F00]" size={32} /> },
          ].map((item, i) => (
            <motion.div
              key={`feature-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex flex-col items-center text-center p-8 bg-white rounded-4xl shadow-sm border border-orange-50"
            >
              <div className="mb-6 p-4 bg-orange-50 rounded-2xl">{item.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#FF6F00] font-bold tracking-widest uppercase text-sm">Our Offerings</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 mb-4">Sacred Collections</h2>
          <div className="w-24 h-1.5 bg-[#FF6F00] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { name: 'Pooja Items', desc: 'Daily ritual essentials', img: 'https://wemy.in/cdn/shop/files/IMG-20241230-WA0079.jpg?v=1755682186', link: 'items' },
            { name: 'Pooja Kits', desc: 'Complete ceremony sets', img: 'https://servdharm.com/cdn/shop/files/SampoornPoojaSamagriKit_3_2400x.png?v=1712585276', link: 'kits' },
            { name: 'Pandit Booking', desc: 'Verified Vedic scholars', img: 'https://ompoojapath.com/storage/about/about_us.jpg', link: 'pandits' },
            { name: 'Consultation', desc: 'Spiritual guidance', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800', link: 'contact' },
          ].map((cat, i) => (
            <motion.div
              key={`offering-${i}`}
              whileHover={{ y: -10 }}
              onClick={() => onNavigate(cat.link)}
              className="relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer group shadow-lg"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-2xl font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-white/70 text-sm">{cat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-white py-24 border-y border-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[#FF6F00] font-bold tracking-widest uppercase text-sm">Best Sellers</span>
              <h2 className="text-4xl font-bold text-gray-800 mt-2">Popular Essentials</h2>
            </div>
            <button onClick={() => onNavigate('items')} className="bg-orange-50 text-[#FF6F00] px-6 py-3 rounded-xl font-bold flex items-center hover:bg-orange-100 transition-all">
              View Entire Collection <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Spiritual Journey</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Three simple steps to bring divinity and peace to your home ceremonies.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-orange-100 -translate-y-1/2 z-0" />
          {[
            { step: '01', title: 'Select Service', desc: 'Choose from our wide range of pooja items, kits, or pandit services.' },
            { step: '02', title: 'Customize Ritual', desc: 'Provide details about your ceremony, date, and specific requirements.' },
            { step: '03', title: 'Experience Divinity', desc: 'Receive authentic items or welcome a scholar to perform the ritual.' },
          ].map((item, i) => (
            <div key={`step-${item.step}-${i}`} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FF6F00] text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-xl shadow-orange-200">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <PujaVidhiCarousel />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1a1a1a] rounded-[3.5rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF6F00]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="text-white">
              <Quote size={80} className="mb-8 text-[#FF6F00] opacity-50" />
              <h2 className="text-5xl font-bold mb-10 leading-tight">Trusted by <br />Thousands of <br />Devotees</h2>
              <div className="space-y-10">
                {[
                  { name: 'Amit Verma', text: "The Satyanarayan Pooja kit was so complete, we didn't have to run for anything at the last minute. Highly recommended!", rating: 5 },
                  { name: 'Priya Singh', text: 'The Pandit we booked was very knowledgeable and explained every mantra. A truly spiritual experience.', rating: 5 },
                ].map((t, i) => (
                  <div key={`testimonial-${i}`} className="bg-white/5 backdrop-blur-md p-8 rounded-4xl border border-white/10">
                    <p className="text-xl italic mb-6 leading-relaxed text-gray-300">"{t.text}"</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">{t.name}</span>
                      <div className="flex text-[#FF9933]">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={`star-${i}`} size={18} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-tr from-[#FF6F00] to-[#FF9933] rounded-[3rem] blur-2xl opacity-30 animate-pulse" />
                <img
                  src="https://images.unsplash.com/photo-1561489413-985b06da5bee?auto=format&fit=crop&q=80&w=800"
                  alt="Devotion"
                  className="relative rounded-[3rem] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

    </div>
  );
}
