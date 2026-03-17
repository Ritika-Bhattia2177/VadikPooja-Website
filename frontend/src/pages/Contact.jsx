 import { Calendar, MapPin, Users } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Get in Touch</h1>
        <p className="text-gray-500 text-lg">Have questions? We're here to help you on your spiritual journey.</p>
      </div>
      <div className="max-w-5xl mx-auto bg-white rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-orange-50">
        <div className="md:w-2/5 bg-[#1a1a1a] p-16 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6F00]/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <h2 className="text-3xl font-bold mb-10 relative z-10">Contact Information</h2>
          <div className="space-y-10 relative z-10">
            <div className="flex items-start group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-[#FF6F00] transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Our Location</h4>
                <p className="text-gray-400">108, Spiritual Plaza, Varanasi, UP - 221001</p>
              </div>
            </div>
            <div className="flex items-start group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-[#FF6F00] transition-colors">
                <Calendar size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Business Hours</h4>
                <p className="text-gray-400">Mon - Sat: 9:00 AM - 8:00 PM</p>
              </div>
            </div>
            <div className="flex items-start group">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mr-6 group-hover:bg-[#FF6F00] transition-colors">
                <Users size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Support Team</h4>
                <p className="text-gray-400">Available for guidance 24/7</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-16">
          <form className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Subject</label>
              <input type="text" placeholder="How can we help?" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none transition-all" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">Your Message</label>
              <textarea rows={5} placeholder="Write your message here..." className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#FF6F00]/10 focus:border-[#FF6F00] outline-none transition-all resize-none"></textarea>
            </div>
            <button className="w-full bg-[#FF6F00] hover:bg-[#FF9933] text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-orange-100 transform hover:scale-[1.02]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
