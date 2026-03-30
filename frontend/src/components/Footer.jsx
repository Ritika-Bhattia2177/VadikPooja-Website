import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#EC8E15] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center mb-5">
              <div className="w-8 h-8 bg-[#EC8E15] rounded-full flex items-center justify-center text-white font-bold text-lg mr-2">V</div>
              <span className="text-xl font-bold text-white tracking-tight">Vaidik<span className="text-[#FF9933]">Pooja</span></span>
            </div>
            <p className="text-white leading-relaxed mb-4">
              Your one-stop spiritual destination for authentic pooja items, complete ritual kits, and experienced pandit booking services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6F00] transition-colors">
                <Facebook size={18} color="white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6F00] transition-colors">
                <Twitter size={18} color="white" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6F00] transition-colors">
                <Instagram size={18} color="white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3 text-white">
              <li><a href="/" className="hover:text-[#FF6F00] transition-colors">Home</a></li>
              <li><a href="/items" className="hover:text-[#FF6F00] transition-colors">Pooja Items</a></li>
              <li><a href="/kits" className="hover:text-[#FF6F00] transition-colors">Pooja Kits</a></li>
              <li><a href="/pandits" className="hover:text-[#FF6F00] transition-colors">Book Pandit Ji</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white pb-2 inline-block">Customer Service</h3>
            <ul className="space-y-3 text-white">
              <li><a href="/contact" className="hover:text-[#FF6F00] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#FF6F00] transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-[#FF6F00] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#FF6F00] transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white pb-2 inline-block">Contact Info</h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start">
                <MapPin className="mr-3 text-white shrink-0" size={20} />
                <span>108, Spiritual Plaza, Varanasi, Uttar Pradesh - 221001</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 text-white shrink-0" size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-white shrink-0" size={20} />
                <span>support@vaidikpooja.com</span>
              </li>
            </ul>
          </div>
        </div>
        
  <div className="border-t border-white pt-6 text-center text-white text-sm">
          <p>© {new Date().getFullYear()} VaidikPooja. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
